export type TimeStamp = string;

export type ChatBaseType = {
  chatRoomId: number;
  member1Id: number;
  member1Name: string;
  member2Id: number;
  member2Name: string;
  createdAt: TimeStamp;
};

export type ChatRequestType = {
  opponentId: number;
};

export type ChatResponseType = {
  success: boolean;
  message: string;
  data: ChatBaseType;
};

export type MessageBaseType = {
  messageId: number;
  chatRoomId: number;
  senderId: number;
  senderName: string;
  content: string;
  messageType: string;
  contentType: string;
  createdAt: TimeStamp;
};

export type MessageResponseType = {
  success: true;
  message: string;
  data: MessageBaseType[];
};

export type MyChatBaseType = {
  chatRoomId: number;
  otherMemberId: number;
  otherMemberName: string;
  lastMessage: string;
  lastMessageAt: TimeStamp;
  unreadCount: number;
};

export type MyChatResponseType = {
  success: true;
  message: string;
  data: MyChatBaseType[];
};
