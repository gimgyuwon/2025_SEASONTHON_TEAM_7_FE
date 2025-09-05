import type { RenderMsgProps } from "@/interfaces/chat";
import { RetrieveSpecificChat } from "@/services/chat/chatService";
import { useLayout } from "@/services/hooks/useLayout";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import sendIcon from "@/assets/Chat/sendIcon.svg";
import { createStompClient, type IncomingChatMsg } from "@/utils";
import type { Client } from "@stomp/stompjs";

const ChatRoom = () => {
  const { setLayoutConfig } = useLayout();
  const instruction = "채팅종료까지 남은 시간";
  const clientRef = useRef<Client | null>(null);
  const [msg, setMsg] = useState("");
  const { chatRoomId } = useParams<{ chatRoomId: string }>();
  const [messages, setMessages] = useState<RenderMsgProps[]>([]);
  const myName = "T1";
  const socketEndpoint = "/ws-connect";

  // initial header & bottom setting
  useEffect(() => {
    setLayoutConfig({
      type: "back-more",
      showHeader: true,
      title: "차한잔",
      showBottomBar: false,
    });
  }, [setLayoutConfig]);

  const init = async () => {
    if (!chatRoomId) return;
    try {
      // 1. load past message
      const res = await RetrieveSpecificChat(Number(chatRoomId));
      const formatted = (res.data ?? []).map((m: any) => ({
        sender: m.senderName,
        text: m.content,
        at: m.sentAt,
      }));
      setMessages(formatted);

      // 2. connect STOMP
      const client = createStompClient(
        socketEndpoint,
        Number(chatRoomId),
        (serverMsg: IncomingChatMsg) => {
          setMessages((prev) => {
            if (
              prev.some(
                (m) => m.at === serverMsg.sentAt && m.text === serverMsg.content
              )
            ) {
              return prev;
            }
            return [
              ...prev,
              {
                sender: serverMsg.senderName,
                text: serverMsg.content,
                at: serverMsg.sentAt,
              },
            ];
          });
        }
      );

      clientRef.current = client;
    } catch (err: unknown) {
      console.error("failed to initialize room", err);
    }
  };

  // start initial setting
  useEffect(() => {
    init();
  }, [chatRoomId]);

  // handle click send btn
  const handleSendMessage = () => {
    if (!msg.trim() || !clientRef.current || !chatRoomId) return;

    const payload = {
      chatRoomId: chatRoomId,
      content: msg,
      contentType: "TEXT",
      messageType: "CHAT",
    };

    clientRef.current.publish({
      destination: "/pub/chat.send",
      body: JSON.stringify(payload),
    });

    setMsg("");
  };

  return (
    <div className="wrapper">
      <div className="chatRoom">
        {/* instruction */}
        <div className="chatRoom__instruction caption1">{instruction}</div>
        {/* chatting */}
        <div className="chatRoom__list">
          {messages.map((chat, idx) => {
            const isMyMsg = chat.sender === myName;
            return (
              <div
                key={idx}
                className={`chatRoom__bubble ${isMyMsg ? "my" : "your"}`}
              >
                <div className={`chatRoom__name label`}>{chat.sender}</div>
                <div
                  className={isMyMsg ? "chatRoom__myMsg" : "chatRoom__yourMsg"}
                >
                  <div
                    className={
                      isMyMsg
                        ? "chatRoom__myContent body"
                        : "chatRoom__yourContent body"
                    }
                  >
                    {chat.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* input */}
        <div className="chatRoom__inputBox">
          <textarea
            rows={3}
            className="chatRoom__input body"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="보낼 메시지를 입력하세요"
          />
          <button>
            <img src={sendIcon} alt="sendIcon" onClick={handleSendMessage} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
