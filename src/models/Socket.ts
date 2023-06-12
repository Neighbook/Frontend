export interface MessageEventData {
  roomId: string;
  senderId: string;
  receiverId: string;
  isRoomMessage: boolean;
  content: string;
  date: Date;
}

export interface ConnectionEventData {
  senderId: string;
  receiverId: string;
}

export interface RoomCreatedEventData {
  senderId: string;
  receiverId: string;
  roomId: string;
}

export interface ServerToClientEvents {
  hello: () => void;
  roomJoined: (event: RoomCreatedEventData) => void;
  messageReceived: (event: MessageEventData) => void;
}

export interface ClientToServerEvents {
  connectToSomeone: (event: ConnectionEventData) => void;
  messageSended: (event: MessageEventData) => void;
}

export interface InterServerEvents {
  ping: () => void;
}
