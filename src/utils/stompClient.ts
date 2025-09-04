import { Client, type IMessage, type StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const createStompClient = (endpoint: string, token?: string | null) => {
  const client = new Client({
    webSocketFactory: () => new SockJS(import.meta.env.VITE_API_URL + endpoint),
    connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    reconnectDelay: 3000,
    debug: () => {},
  });

  // on connect
  client.onConnect = (frame) => {
    console.log("STOMP connected", frame);
  };
  client.activate();
  console.log("createStompClient 실행되었어요");

  return client;
};

export const subscribe = (
  client: Client,
  destination: string,
  onMessage: (msg: IMessage) => void
) => {
  const sub: StompSubscription = client.subscribe(destination, onMessage);

  return () => sub.unsubscribe();
};
