

// import { handleActions } from "redux-actions";

// import { Action } from '../index'

// export const States = {
//     CONNECTING: "CONNECTING",
//     CONNECTED: "CONNECTED",
//     DISCONNECTED: "DISCONNECTED"
// }

// // -- USER CODE ACTIONS
// export const SOCKET_CONNECT = "SOCKET_CONNECT"
// export const SOCKET_DISCONNECT = "SOCKET_DISCONNECT"
// export const SOCKET_SEND = "SOCKET_SEND"

// // -- SOCKET CODE ACTIONS
// const SOCKET_CONNECTION = "SOCKET_CONNECTION"
// const SOCKET_CONNECTING = "SOCKET_CONNECTING"
// const SOCKET_DISCONNECTION = "SOCKET_DISCONNECTION"

// // -- ALL ACTION CREATOR DEFINITION
// interface SocketComm1Action {
//     url: string
// }
// interface SocketComm2Action {

// }
// interface SocketSendAction {
//     channel: string
//     msg: any
// }

// function socketConnect(url: string): Action<SocketComm1Action> {
//     return {
//         type: SOCKET_CONNECT,
//         payload: { url }
//     }
// }
// function socketDisconnect(): Action<SocketComm2Action> {
//     return {
//         type: SOCKET_DISCONNECT,
//         payload: { }
//     }
// }

// function socketConnected(): Action<SocketComm2Action> {
//     return {
//         type: SOCKET_CONNECTION,
//         payload: { }
//     }
// }
// function socketConnecting(url: string): Action<SocketComm1Action> {
//     return {
//         type: SOCKET_CONNECTING,
//         payload: { url }
//     }
// }
// function socketSend(channel: string, msg): Action<SocketSendAction> {
//     return {
//         type: SOCKET_SEND,
//         payload: { msg, channel }
//     }
// }

// // -- REDUCER
// export const reducer = handleActions({
//     [SOCKET_CONNECTION]: function(state, action: Action<SocketComm2Action>) {
//         let res = Object.assign({}, state)
//         res.state = States.CONNECTED
//         return res
//     },
//     [SOCKET_DISCONNECTION]: function(state, action: Action<SocketComm2Action>) {
//         let res = Object.assign({}, state)
//         res.state = States.DISCONNECTED
//         return res
//     },
//     [SOCKET_CONNECTING]: function(state, action: Action<SocketComm1Action>) {
//         let res = Object.assign({}, state)
//         res.state = States.CONNECTING
//         res.url = action.payload.url
//         return res
//     }
// }, {
//     state: States.DISCONNECTED,
//     url: null
// })

// // -- MIDDLEWARE
// export function socketMiddleware(url: string, actionCreators: any){ 
//     var socket = null;

//     var nextId = 0

//     const onOpen = (store) => evt => {
//         store.dispatch(socketConnected());
//     }
//     const onClose = (store,) => evt => {
//         store.dispatch(socketDisconnect());
//     }

//     const onMessage = (store, channel: string, id: number) => evt => {
//         store.dispatch(actionCreators[channel](id, JSON.parse(evt.data)));
//     }

//     return store => next => action => {
//         let load = action.payload

//         switch(action.type) {
//             case SOCKET_CONNECT:
//                 if(socket != null) {
//                     socket.close();
//                 }
//                 store.dispatch(socketConnecting(load.url));

//                 socket = new WebSocket(load.url)
//                 socket.onmessage = onMessage(store, load.channel, nextId);
//                 socket.onclose = onClose(store, nextId);
//                 socket.onopen = onOpen(store, load.url, load.channel, nextId);

//                 nextId++
//                 break;
//             case SOCKET_DISCONNECT:
//                 if(sockets[load.id] != null) {
//                     sockets[load.id].close();
//                 }
//                 sockets[load.id] = null;
//                 break;

//             //Send the 'SEND_MESSAGE' action down the websocket to the server
//             case SOCKET_SEND:
//                 sockets[load.id].send(JSON.stringify(action));
//                 break;
//         }
//         return next(action);
//     }
// };