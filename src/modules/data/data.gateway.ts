/* eslint-disable @typescript-eslint/no-unused-vars */
import { SubscribeMessage, WebSocketServer, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true, transports: ['websocket'] })
export class DataGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log("connect");
  }

  handleDisconnect(client: any) {
    console.log("disconnect");
  }

  @SubscribeMessage('join')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    // Handle received message
    this.server.emit('message', data); // Broadcast the message to all connected clients
  }
}
