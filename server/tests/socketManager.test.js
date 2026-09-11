jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

jest.mock('../src/models/user.model', () => ({
  findById: jest.fn(),
}));

const jwt = require('jsonwebtoken');
const User = require('../src/models/user.model');
const socketManager = require('../socketManager');

const createIo = () => ({
  use: jest.fn(),
  on: jest.fn(),
});

const createSocket = (token = 'token') => {
  const events = new Map();
  const broadcastEmit = jest.fn();

  return {
    handshake: { auth: { token } },
    emit: jest.fn(),
    on: jest.fn((event, handler) => events.set(event, handler)),
    broadcast: {
      to: jest.fn(() => ({ emit: broadcastEmit })),
    },
    events,
    broadcastEmit,
  };
};

const connectSocket = async (userId) => {
  const io = createIo();
  socketManager(io);
  const authMiddleware = io.use.mock.calls[0][0];
  const connectionHandler = io.on.mock.calls[0][1];
  const socket = createSocket();

  jwt.verify.mockReturnValue({ userId });
  User.findById.mockResolvedValue({
    _id: { toString: () => userId },
    username: `user-${userId}`,
  });

  await authMiddleware(socket, jest.fn());
  connectionHandler(socket);
  return socket;
};

describe('Socket message rate limiting', () => {
  let now;

  beforeEach(() => {
    now = 100000;
    jest.spyOn(Date, 'now').mockImplementation(() => now);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('allows five messages and blocks the sixth', async () => {
    const socket = await connectSocket('user-1');
    const sendMessage = socket.events.get('chat message');

    for (let index = 0; index < 5; index += 1) {
      sendMessage('room', `message-${index}`);
    }
    sendMessage('room', 'blocked');

    expect(socket.broadcastEmit).toHaveBeenCalledTimes(5);
    expect(socket.emit).toHaveBeenCalledWith('rate limit', {
      message: 'Too many messages. Please wait.',
      retryAfterMs: 10000,
    });
  });

  test('allows a user to send again after the window expires', async () => {
    const socket = await connectSocket('user-2');
    const sendMessage = socket.events.get('chat message');

    for (let index = 0; index < 5; index += 1) {
      sendMessage('room', `message-${index}`);
    }
    now += 10000;
    sendMessage('room', 'allowed-again');

    expect(socket.broadcastEmit).toHaveBeenCalledTimes(6);
    expect(socket.emit).not.toHaveBeenCalled();
  });

  test('gives different users independent limits', async () => {
    const firstSocket = await connectSocket('user-3');
    const secondSocket = await connectSocket('user-4');
    const firstSend = firstSocket.events.get('chat message');
    const secondSend = secondSocket.events.get('chat message');

    for (let index = 0; index < 5; index += 1) {
      firstSend('room', `message-${index}`);
    }
    secondSend('room', 'allowed');

    expect(firstSocket.emit).not.toHaveBeenCalled();
    expect(secondSocket.broadcastEmit).toHaveBeenCalledTimes(1);
  });

  test('shares a limit across sockets for the same user', async () => {
    const firstSocket = await connectSocket('user-5');
    const secondSocket = await connectSocket('user-5');
    const firstSend = firstSocket.events.get('chat message');
    const secondSend = secondSocket.events.get('chat message');

    for (let index = 0; index < 4; index += 1) {
      firstSend('room', `message-${index}`);
    }
    secondSend('room', 'message-4');
    secondSend('room', 'blocked');

    expect(firstSocket.broadcastEmit).toHaveBeenCalledTimes(4);
    expect(secondSocket.broadcastEmit).toHaveBeenCalledTimes(1);
    expect(secondSocket.emit).toHaveBeenCalledWith('rate limit', {
      message: 'Too many messages. Please wait.',
      retryAfterMs: 10000,
    });
  });
});
