import type { ReponseBaseType, TimeStamp } from "./common";

export type GetNotificationBaseType = {
  id: number;
  receiverId: number;
  receiverName: string;
  type: string;
  message: string;
  status: "UNREAD" | "READ";
  createdAt: TimeStamp;
  readAt: TimeStamp;
};

export type GetMyNotificationType = ReponseBaseType & {
  data: GetNotificationBaseType[];
};
