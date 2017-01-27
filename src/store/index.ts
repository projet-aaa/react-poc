import { createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'

import createSocketIoMiddleware from 'redux-socket.io'
import * as io from 'socket.io-client'

const storeFactory = (reducer, url) => {
    let socket = io.connect(url)
    return createStore(
        reducer,
        applyMiddleware(
            thunk,
            createSocketIoMiddleware(socket, 'server/')//,
            //createLogger()
        )
    )
}

export default storeFactory