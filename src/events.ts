import { EventEmitter } from 'events';

const serverEmitter = new EventEmitter();
const clientEmitter = new EventEmitter();

export { serverEmitter, clientEmitter };
