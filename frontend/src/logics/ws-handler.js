export const SOCKET_URL = `ws://localhost:8000/ws/socket-server/`;
let SOCKET = undefined;

export function getWebSocket() {
    function sendMessage(msg) {
        SOCKET.send(msg)
    }
    return { SOCKET, sendMessage }
}

export function useWS(url, options) {
    /*
    * options: {
        onOpen: (event) => {},
        onMessage: (event) => {},
        onClose: (event) => {},
        onError: (event) => {},
    }
    */
    SOCKET = new WebSocket(url);
    /*
    function (event) {
        // ask the server to generate a user id and register
    }
    */
    SOCKET.addEventListener('open', options.onOpen);

    SOCKET.addEventListener('message', options.onMessage)
    // function (event) {
    //     // handle the message
    // }

    SOCKET.addEventListener('close', options.onClose);
    //function (event) {
    // handle the close
    // }

    SOCKET.addEventListener('error', options.onError);
}
