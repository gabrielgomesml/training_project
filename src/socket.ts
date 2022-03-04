import { nanoid } from 'nanoid';
import { Server, Socket } from 'socket.io';

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

const rooms: Record<string, { name: string }> = {};

function socket({ io }: { io: Server }) {
    console.log('Sockets enabled');

    io.on(EVENTS.connection, (socketIo: Socket) => {
        console.log(`User connected ${socketIo.id}`);

        socketIo.emit(EVENTS.SERVER.ROOMS, rooms);

        socketIo.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
            console.log(roomName);
            const roomId = nanoid();

            rooms[roomId] = {
                name: roomName,
            };

            socketIo.join(roomId);
            socketIo.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);
            socketIo.emit(EVENTS.SERVER.ROOMS, rooms);
            socketIo.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
        });

        socketIo.on(
            EVENTS.CLIENT.SEND_ROOM_MESSAGE,
            ({ roomId, message, username }) => {
                const date = new Date();

                socketIo.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
                    message,
                    username,
                    time: `${date.getHours()}:${date.getMinutes()}`,
                });
            },
        );

        socketIo.on(EVENTS.CLIENT.JOIN_ROOM, (roomId: string) => {
            socketIo.join(roomId);
            socketIo.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
        });
    });
}

export default socket;
