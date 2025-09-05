import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { createStompClient } from "@/utils/stompClient";
import {
  CreateChatRoom,
  RetrieveMyChat,
  RetrieveSpecificChat,
} from "@/services/chat/chatService";
import type { ChatResponseType } from "@/interfaces/chat";

interface ChatMessage {
  senderId: string;
  message: string;
}

const Chat: React.FC = () => {
  const roomId = 1;
  const [senderId, setSenderId] = useState("");
  const clientRef = useRef<Client | null>(null);
  const socket_url = "/ws-connect";
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<
    { senderId: string; message: string }[]
  >([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const init = async () => {
      const chatHistory = await RetrieveSpecificChat(1);
      if (chatHistory && chatHistory.data) {
        const formatted = chatHistory.data.map((m: any) => ({
          senderId: m.senderName,
          message: m.content ?? "(빈 메시지)",
        }));
        setMessages(formatted);
      }

      const client = createStompClient(
        socket_url,
        token,
        roomId,
        (serverMsg) => {
          const newMsg: ChatMessage = {
            senderId: serverMsg.data.senderName,
            message: serverMsg.data.content ?? "(빈 메시지)",
          };
          setMessages((prev) => [...prev, newMsg]);
        }
      );

      clientRef.current = client;
    };

    init();

    return () => {
      clientRef.current?.deactivate();
    };
  }, [roomId]);

  const handleClickCreate = async (): Promise<ChatResponseType | null> => {
    try {
      const create = await CreateChatRoom({ opponentId: 1 });
      console.log("방 생성 완료", create);
      return create;
    } catch (err: unknown) {
      console.error("등록 실패:", err);
      return null;
    }
  };

  const handleMyChat = async (): Promise<ChatResponseType | null> => {
    try {
      const chat = await RetrieveMyChat();
      console.log("chat info", chat);
      return chat;
    } catch (err: unknown) {
      console.error("등록 실패", err);
      return null;
    }
  };

  const handleSendMessage = () => {
    if (!msg.trim() || !clientRef.current) return;

    const payload = {
      chatRoomId: roomId.toString(),
      senderId,
      message: msg,
    };

    console.log("Publishing payload:", payload);

    clientRef.current.publish({
      destination: "/pub/chat.send",
      body: JSON.stringify(payload),
    });

    setMsg("");
  };

  return (
    <div className="wrapper">
      <h2>현재 채팅방 번호: {roomId}</h2>
      <button
        type="button"
        className="btn-primary"
        onClick={() => handleClickCreate()}
      >
        방 생성
      </button>
      <input
        value={senderId}
        onChange={(e) => setSenderId(e.target.value)}
        placeholder="보낼 id를 입력하세요"
      />
      <input
        type="text"
        value={msg}
        placeholder="보낼 메시지를 입력하세요"
        onChange={(e) => setMsg(e.target.value)}
      />
      <button className="btn-secondary" onClick={handleSendMessage}>
        보내기
      </button>
      <div>
        {messages.map((m, idx) => (
          <div key={idx}>
            <div>
              <div>보낸 사람 id: {m.senderId}</div>
              <div>메세지: {m.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
