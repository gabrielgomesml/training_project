import { nanoid } from 'nanoid';
import { connection, server as WebSocketServer } from 'websocket';
import { serverEmitter, clientEmitter } from './events';

const EVENTS = {
    connection: 'connection',
    CLIENT: {
        CREATE_ROOM: 'CREATE_ROOM',
        SEND_ROOM_MESSAGE: 'SEND_ROOM_MESSAGE',
        JOIN_ROOM: 'JOIN_ROOM',
    },
    SERVER: {
        ROOMS: 'ROOMS',
        JOINED_ROOM: 'JOINED_ROOM',
        ROOM_MESSAGE: 'ROOM_MESSAGE',
        SEND_CLIENT_ID: 'SEND_CLIENT_ID',
    },
};

let users: any = {};
const rooms: any = {};
// const rooms: Record<string, { name: string; users: connection[] }> = {};

interface EventMsg {
    eventType: string;
    event: string;
    payload: any;
}

const broadcastMsg = (roomId: string, message: string) => {
    rooms[roomId].users.forEach((userId: string) => {
        users[userId].send(message);
    });
};

function removeItem<T>(arr: Array<T>, value: T): Array<T> {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

// Função para lidar com as requisições, adicionar o socket ao objeto de usuários e encerrar as conexões.
const handleRequest = (wsConnection: connection) => {
    const userId = nanoid();

    wsConnection.send(
        JSON.stringify({
            eventType: 'connectionEvent',
            event: EVENTS.connection,
            payload: { userId },
        }),
    );

    wsConnection.send(
        JSON.stringify({
            eventType: 'serverEvent',
            event: EVENTS.SERVER.ROOMS,
            payload: { roomsData: rooms },
        }),
    );

    // Observar se chegou uma nova mensagem, parsear o json, disparar o evento de acordo com as informações que chegaram.
    wsConnection.on('message', message => {
        if (message.type === 'utf8') {
            const msg: EventMsg = JSON.parse(message.utf8Data);
            if (msg.eventType === 'serverEvent') {
                serverEmitter.emit(msg.event, msg.payload);
            } else if (msg.eventType === 'clientEvent') {
                clientEmitter.emit(msg.event, msg.payload);
            }
        } else {
            console.log('Invalid message');
        }
    });

    wsConnection.on('close', () => {
        console.log(`Connection closed with user: ${userId}!`);
        clientEmitter.removeListener(EVENTS.CLIENT.SEND_ROOM_MESSAGE, () => {
            delete users[userId];
        });
    });

    users = { ...users, [userId]: wsConnection };

    clientEmitter.addListener(
        `${EVENTS.CLIENT.SEND_ROOM_MESSAGE}/${userId}`,
        payload => {
            const { message, username, roomId } = payload;
            const date = new Date();

            broadcastMsg(
                roomId,
                JSON.stringify({
                    eventType: 'serverEvent',
                    event: `${EVENTS.SERVER.ROOM_MESSAGE}/${roomId}`,
                    payload: {
                        message,
                        username,
                        time: `${date.getHours()}:${date.getMinutes()}`,
                    },
                }),
            );
        },
    );

    clientEmitter.addListener(
        `${EVENTS.CLIENT.CREATE_ROOM}/${userId}`,
        payload => {
            const { roomName, currentRoomKey } = payload;

            if (currentRoomKey && currentRoomKey !== '') {
                removeItem(rooms[currentRoomKey].users, userId);
            }

            const roomId = nanoid();
            rooms[roomId] = {
                name: roomName,
                users: [userId],
            };

            wsConnection.send(
                JSON.stringify({
                    eventType: 'serverEvent',
                    event: EVENTS.SERVER.ROOMS,
                    payload: { roomsData: rooms },
                }),
            );

            wsConnection.send(
                JSON.stringify({
                    eventType: 'serverEvent',
                    event: `${EVENTS.SERVER.JOINED_ROOM}/${userId}`,
                    payload: { roomKey: roomId },
                }),
            );
        },
    );

    clientEmitter.addListener(
        `${`${EVENTS.CLIENT.JOIN_ROOM}/${userId}`}`,
        payload => {
            const { userKey, roomKey, currentRoomKey } = payload;

            if (currentRoomKey && currentRoomKey !== '') {
                removeItem(rooms[currentRoomKey].users, userId);
            }

            rooms[roomKey] = {
                name: rooms[roomKey].name,
                users: rooms[roomKey].users.concat([userKey]),
            };
        },
    );
};

function socket({ io }: { io: WebSocketServer }) {
    io.on('request', request => {
        // Aceitar, estabelecer a conexão e mandar para a função handleRequest a conexão com o socket.
        console.log(`New request from ${request.origin}`);
        handleRequest(request.accept(null, request.origin));
    });
}

export default socket;
