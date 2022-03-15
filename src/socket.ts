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
    },
};

let users: any = {};

interface EventMsg {
    eventType: string;
    event: string;
    payload: any;
}

// Função para lidar com as requisições, adicionar o socket ao objeto de usuários e encerrar as conexões.
const handleRequest = (wsConnection: connection) => {
    const userId = nanoid();

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
        delete users[userId];
    });

    users = { ...users, [userId]: wsConnection };

    clientEmitter.addListener(EVENTS.CLIENT.SEND_ROOM_MESSAGE, payload => {
        const { message, username } = payload;
        const date = new Date();
        console.log(
            `Entrou no send room message e payload tem isso: ${payload}`,
        );

        wsConnection.send(
            JSON.stringify({
                eventType: 'serverEvent',
                event: EVENTS.SERVER.ROOM_MESSAGE,
                payload: {
                    message,
                    username,
                    time: `${date.getHours()}:${date.getMinutes()}`,
                },
            }),
        );
    });
};

function socket({ io }: { io: WebSocketServer }) {
    io.on('request', request => {
        // Aceitar, estabelecer a conexão e mandar para a função handleRequest a conexão com o socket.
        console.log(`New request from ${request.origin}`);
        handleRequest(request.accept(null, request.origin));
    });
}

export default socket;
