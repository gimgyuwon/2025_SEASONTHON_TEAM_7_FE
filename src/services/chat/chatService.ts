import type {
  ChatRequestType,
  ChatResponseType,
  EvaluateRequestType,
  EvaluateResponseType,
  MessageResponseType,
  MyChatResponseType,
} from "@/interfaces/chat";
import { apiV1, chatApi } from "../axiosInstance";

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
): Promise<MessageResponseType> => {
  const { data } = await chatApi.get(`/${chatRoomId}/messages`);

  return data;
};

// GET: retrieve my chat room mesage
export const RetrieveMyChat = async (): Promise<MyChatResponseType> => {
  const { data } = await chatApi.get("/me");

  return data;
};

// POST: Evaluate manner score
export const EvaluateScore = async (
  body: EvaluateRequestType
): Promise<EvaluateResponseType> => {
  const { data } = await apiV1.post("/manners", body);

  return data;
};
