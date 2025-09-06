import type { GetMyNotificationType } from "@/interfaces/notification";
import { notificationApi } from "../axiosInstance";

// GET: Get my notification
export const GetMyNotification = async (): Promise<GetMyNotificationType> => {
  const { data } = await notificationApi.get("/me");

  return data;
};
