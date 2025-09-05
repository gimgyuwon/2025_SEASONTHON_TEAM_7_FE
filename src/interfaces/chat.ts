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
  data: ChatBaseType[];
};
