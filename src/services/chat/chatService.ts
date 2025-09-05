import type { ChatRequestType, ChatResponseType } from "@/interfaces/chat";
import { chatApi } from "../axiosInstance";

// POST: create chat room
export const CreateChatRoom = async (
  body: ChatRequestType
): Promise<ChatResponseType> => {
  const { data } = await chatApi.post("", body);

  return data;
};

// GET: retrieve specific chat room message
export const RetrieveSpecificChat = async (
  chatRoomId: number
): Promise<ChatResponseType> => {
  const { data } = await chatApi.get(`/${chatRoomId}/messages`);

  return data;
};

// GET: retrieve my chat room mesage
export const RetrieveMyChat = async (): Promise<ChatResponseType> => {
  const { data } = await chatApi.get("/me");

  return data;
};
