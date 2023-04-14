/* import { w3cwebsocket as W3CWebSocket } from 'websocket';

const URL = 'ws://localhost:8000/ws/room/000';

class WebSocketInstance {
  constructor() {
    this.socketRef = new W3CWebSocket(URL);
  }

  connect() {
    this.socketRef.onopen = () => {
      console.log('WebSocket connected');
    };
  }

  disconnect() {
    this.socketRef.close();
  }

  addCallbacks(setMessage) {
    this.socketRef.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessage(message);
    };

    this.socketRef.onerror = (e) => {
      console.log(e.message);
    };

    this.socketRef.onclose = () => {
      console.log('WebSocket closed');
    }
  }
}

export default WebSocketInstance; */