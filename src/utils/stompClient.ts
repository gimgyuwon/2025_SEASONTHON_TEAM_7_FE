// src/utils/stompClient.ts
import { Client, StompHeaders, type IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export interface IncomingChatMsg {
  senderName: string;
  content: string;
  sentAt?: string;
}

const buildAuthHeaders = (rawToken?: string | null): StompHeaders => {
  if (!rawToken) return {}; // 빈 객체는 OK (index signature 충족)
  const v = rawToken.startsWith("Bearer ") ? rawToken : `Bearer ${rawToken}`;
  return { Authorization: v }; // 항상 string
};

export const createStompClient = (
  endpoint: string,
  roomId: number,
  onMessage: (msg: {
    senderName: string;
    content: string;
    sentAt?: string;
  }) => void
) => {
  const client = new Client({
    webSocketFactory: () => new SockJS(import.meta.env.VITE_API_URL + endpoint),
    reconnectDelay: 3000,
    debug: () => {},
    // 재연결 포함: 연결 직전에 최신 토큰을 세션에서 읽어 주입
    beforeConnect: () => {
      const token = sessionStorage.getItem("accessToken");
      client.connectHeaders = buildAuthHeaders(token);
      console.log(
        "CONNECT Authorization:",
        client.connectHeaders.Authorization
      );
    },
  });

  client.onConnect = () => {
    client.subscribe(`/sub/chat-room/${roomId}`, (message: IMessage) => {
      try {
        const payload = JSON.parse(message.body);
        const data = payload?.data ?? payload;
        onMessage({
          senderName: data?.senderName ?? "알수없음",
          content: data?.content ?? "(빈 메시지)",
          sentAt: data?.sentAt,
        });
        console.log("try 성공");
      } catch (e) {
        console.error("메시지 파싱 실패:", e, message.body);
      }
    });
  };

  client.onStompError = (frame) => {
    console.error("STOMP error", frame);
  };

  client.activate();
  return client;
};
