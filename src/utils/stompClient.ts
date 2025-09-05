import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const createStompClient = (
  endpoint: string,
  token: string | null,
  roomId: number,
  onMessage: (message: any) => void
) => {
  const client = new Client({
    webSocketFactory: () => new SockJS(import.meta.env.VITE_API_URL + endpoint),
    connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    reconnectDelay: 3000,
    debug: () => {},
  });

  // on connect
  client.onConnect = (frame) => {
    console.log("STOMP connected", frame);
    client.subscribe(`/sub/chat-room/${roomId}`, (message) => {
      console.log("서버에서 온 raw 메시지:", message);
      const msg = JSON.parse((message as any)._body);
      console.log("이게 msg", msg);
      console.log(msg.data.senderName + ": " + msg.data.content);
      onMessage({
        senderId: msg.data.senderName,
        message: msg.data.content,
      });
    });
  };

  client.onStompError = (frame) => {
    console.error("STOMP error", frame);
  };

  client.activate();
  console.log("createStompClient 실행되었어요");

  return client;
};
