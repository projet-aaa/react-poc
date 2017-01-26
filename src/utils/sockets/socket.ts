import { Action } from '../index'
import { handleActions } from "redux-actions";

export const States = {
    CONNECTING: "CONNECTING",
    CONNECTED: "CONNECTED",
    DISCONNECTED: "DISCONNECTED"
}

// -- USER CODE ACTIONS
export const SOCKET_CONNECT = "SOCKET_CONNECT"
export const SOCKET_DISCONNECT = "SOCKET_DISCONNECT"
export const SOCKET_SEND = "SOCKET_SEND"

// -- SOCKET CODE ACTIONS
const SOCKET_CONNECTION = "SOCKET_CONNECTION"
const SOCKET_CONNECTING = "SOCKET_CONNECTING"
const SOCKET_DISCONNECTION = "SOCKET_DISCONNECTION"

// -- ALL ACTION CREATOR DEFINITION
interface SocketConnectAction {
    url: string
    channel: string
}
interface SocketConnectionAction { 
    id: number
    url: string
    channel: string
}
interface SocketDisconnectAction { 
    id: number
}
interface SocketSendAction {
    id: number
    msg: any
}

function socketConnect(url: string, channel: string): Action<SocketConnectAction> {
    return {
        type: SOCKET_CONNECT,
        payload: {
            url, channel
        }
    }
}
function socketDisconnect(id: number): Action<SocketDisconnectAction> {
    return {
        type: SOCKET_DISCONNECT,
        payload: { id }
    }
}

function socketConnected(url: string, channel: string, id: number): Action<SocketConnectionAction> {
    return {
        type: SOCKET_CONNECTION,
        payload: {
            url, channel, id
        }
    }
}
function socketConnecting(url: string, channel: string, id: number): Action<SocketConnectionAction> {
    return {
        type: SOCKET_CONNECTING,
        payload: {
            url, channel, id
        }
    }
}
function socketSend(id: number, msg): Action<SocketSendAction> {
    return {
        type: SOCKET_SEND,
        payload: { id, msg }
    }
}

// -- REDUCER
export const reducer = handleActions({
    [SOCKET_CONNECTION]: function(state, action: Action<SocketConnectionAction>) {
        let res = Object.assign({}, state)
        res[action.payload.id].state = States.CONNECTED
        return res
    },
    [SOCKET_DISCONNECTION]: function(state, action: Action<SocketDisconnectAction>) {
        let res = Object.assign({}, state)
        res[action.payload.id].state = States.DISCONNECTED
        return res
    },
    [SOCKET_CONNECTING]: function(state, action: Action<SocketConnectionAction>) {
        return Object.assign({ 
            [action.payload.id]: { 
                state: States.CONNECTING, 
                url: action.payload.url,
                channel: action.payload.channel,
                id: action.payload.id
            }}, state)
    }
}, {})

// -- MIDDLEWARE
export function socketMiddleware(actionCreators: any){ 
    var sockets = {};

    var nextId = 0

    const onOpen = (store, url, channel, id) => evt => {
        store.dispatch(socketConnected(url, channel, id));
    }
    const onClose = (store, id) => evt => {
        store.dispatch(socketDisconnect(id));
    }

    const onMessage = (store, channel: string, id: number) => evt => {
        store.dispatch(actionCreators[channel](id, JSON.parse(evt.data)));
    }

    return store => next => action => {
        let load = action.payload

        switch(action.type) {
            case SOCKET_CONNECT:
                if(sockets[load.id] != null) {
                    sockets[load.id].close();
                }
                store.dispatch(socketConnecting(load.url, load.channel, load.id));

                let socket = new WebSocket(action.url)
                sockets[load.id] = socket;
                socket.onmessage = onMessage(store, load.channel, nextId);
                socket.onclose = onClose(store, nextId);
                socket.onopen = onOpen(store, load.url, load.channel, nextId);

                nextId++
                break;
            case SOCKET_DISCONNECT:
                if(sockets[load.id] != null) {
                    sockets[load.id].close();
                }
                sockets[load.id] = null;
                break;

            //Send the 'SEND_MESSAGE' action down the websocket to the server
            case SOCKET_SEND:
                sockets[load.id].send(JSON.stringify(action));
                break;
        }
        return next(action);
    }
};