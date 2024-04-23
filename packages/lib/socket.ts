import { RecordValue } from '@repo/types/general';
import { io, Socket } from 'socket.io-client';

export class SocketClient {
  private io: Socket;

  constructor(baseURL: string) {
    this.io = io(baseURL, {
      closeOnBeforeunload: false, // Prevent close when there is `beforeunload` event
    });
  }

  // Register a new handler for the given event
  listen(event: string, callback: (...args: any) => void) {
    console.log({ socketReceiveEvent: event });
    this.io.on(event, callback);
  }

  // Register sender for the given event
  send(event: string, data: any) {
    console.log({ socketSendEvent: event, data });
    this.io.emit(event, data);
  }

  // Removes the previously registered listener for the given event
  removeListener(event: string, callback: (...args: any) => void) {
    this.io.off(event, callback);
  }

  // Removes all registered listeners for the given event
  removeAllListeners(event: string) {
    this.io.removeAllListeners(event);
  }
}
