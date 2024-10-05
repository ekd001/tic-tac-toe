import app from '@adonisjs/core/services/app'
import { Server, Socket } from 'socket.io'
import server from '@adonisjs/core/services/server'

app.ready(() => {
    const io = new Server(server.getNodeServer(), {
        cors: {
            origin: '*',
        },
    })
    io.on('connection', (socket) => {
        const playersList: Socket[] = []
        const waitingPlayersList: Socket[] = []
        console.log('A new connection', socket.id);

        socket.on('findMatch', () => {
            console.log('User ' + socket.id + ' is looking for a match');
            // check if thee current socker is already in the list
            const isAlreadyInList = playersList.some(player => player.id === socket.id);
            if (isAlreadyInList) {
                console.log('User ' + socket.id + ' is already in the list');
                return
                // TODO: IMPLEMENT THE LOGC
            }
            // [1,2,3,4,5,6,7,8]
            waitingPlayersList.push(socket)
            console.log("Total waiting players: " + waitingPlayersList.length);
            if (waitingPlayersList.length === 2) {
                console.log("Match found!");
                // TODO: IMPLEMENT THE MATCH
                const roomId = '22554477982666'
                const firstPlayer = waitingPlayersList.shift()
                const secondPlayer = waitingPlayersList.shift()
                firstPlayer?.join(roomId)
                secondPlayer?.join(roomId)
                const clients = io.sockets.adapter.rooms.get(roomId);
                console.log("Total clients in the room: " + roomId + ": " + clients?.size);
            }
        })
    })

    io.on('connection', (socket) => {
        
     })

})