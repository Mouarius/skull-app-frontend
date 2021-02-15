import io from 'socket.io-client';
const URL = 'http://localhost:3001/';

const socket: SocketIOClient.Socket = io(URL);

export { socket };
