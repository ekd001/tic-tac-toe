import app from '@adonisjs/core/services/app'
import { Server, Socket } from 'socket.io'
import server from '@adonisjs/core/services/server'
import { RcFileParser } from '@adonisjs/core/app'

//a type list for the game table sublist = [room_id, firstPlayer_id, secondPlayer_id]
type SubList = [string, string, string];

app.ready(() => {

    const playersList: string[] = []
    const waitingPlayersList: Socket[] = []
    const gameTable: SubList[] = [];

    const io = new Server(server.getNodeServer(), {
        cors: {
            origin: '*',
        },
    })
    io.on('connection', (socket) => {

        console.log('A new connection', socket.id);


        setInterval(() => {createMatch(waitingPlayersList,playersList,gameTable); console.log("Game table : ", gameTable);}, 2000);

        socket.on('findMatch', () => {
            console.log('User ' + socket.id + ' is looking for a match');

            // check if thee current socker_id is already in the list
            let isAlreadyInList: boolean = false;
            if(playersList.includes(socket.id)){
                isAlreadyInList = true;
            }

            if (isAlreadyInList) {
                console.log('User ' + socket.id + ' is already in the list');
                return
                // TODO: IMPLEMENT THE LOGC
            }
            // [1,2,3,4,5,6,7,8]
            //check if the current socket is already in the waiting list
            const isAlreadyInWaitingList = waitingPlayersList.some(player => player.id === socket.id);
            if(!isAlreadyInWaitingList){
              waitingPlayersList.push(socket);
            }

            /*console.log("Total waiting players: " + waitingPlayersList.length);
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
            }*/
        })
    })

    io.on('connection', (socket) => {

     })

})

const createMatch = (waitingPlayers:Socket[], playersList:string[], gameTable:SubList[]) => {
  let p1Id : string | undefined;
  let p2Id : string | undefined;

  console.log("length first: "+waitingPlayers.length);
  console.log("lenght players first :"+playersList.length );

  //remove the two first players from the waiting list
  if(waitingPlayers.length > 1){
    const firstPlayer = waitingPlayers.shift();
    const secondPlayer = waitingPlayers.shift();

    //create a room a add the two players
    let roomId:number = 0;
    if (gameTable.length > 0) {
      roomId = Number(gameTable[gameTable.length - 1][0]) + 1;
    } else {
      console.log("gameTable is empty.");
    }
    firstPlayer?.join(roomId.toString());
    secondPlayer?.join(roomId.toString());

    //add the players to the playersList
    p1Id = firstPlayer?.id;
    p2Id = secondPlayer?.id;
    if(p1Id != undefined && p2Id != undefined){
      playersList.push(p1Id);
      playersList.push(p2Id);
      //add the roomId to the room table
      gameTable.push([roomId.toString(), p1Id, p2Id]);
    }


  }
  console.log("length waiting players: "+waitingPlayers.length);
  console.log("lenght players :"+playersList.length );
}
