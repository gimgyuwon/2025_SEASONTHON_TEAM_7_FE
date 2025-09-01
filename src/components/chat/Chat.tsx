import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { createStompClient, subscribe } from "@/utils/stompClient";

export const ChatRoom: React.FC = () => {
  const [roomId, setRoomId] = useState("1");
  const [senderId, setSenderId] = useState("123");
  const [content, setContent] = useState("");
  const [lines, setLines] = useState<string[]>([]);
  const clientRef = useRef<Client | null>(null);
  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const client = createStompClient("/api/ws-connect", token);
    clientRef.current = client;

    client.onConnect = () => {
      unsubRef.current?.();
      unsubRef.current = subscribe(
        client,
        `/sub/chat-room/${roomId}`,
        (frame) => {
          try {
            const payload = JSON.parse(frame.body);
            const line = `${payload?.data?.senderName ?? "?"}: ${
              payload?.data?.content ?? ""
            }`;
            setLines((prev) => [...prev, line]);
          } catch {
            setLines((prev) => [...prev, frame.body]);
          }
        }
      );
      setLines((prev) => [...prev, `방 ${roomId}에 연결됨`]);
    };

    client.onStompError = (f) => {
      setLines((prev) => [...prev, `STOMP ERROR: ${f.headers["message"]}`]);
    };

    client.activate();

    return () => {
      unsubRef.current?.();
      client.deactivate();
    };
  }, [roomId]);

  const send = () => {
    const client = clientRef.current;
    if (!client || !client.connected) return;
    client.publish({
      destination: "/pub/chat.send",
      body: JSON.stringify({
        chatRoomId: roomId,
        senderId,
        content,
        messageType: "CHAT",
        contentType: "TEXT",
      }),
    });
    setContent("");
  };

  return (
    <div className="max-w-md mx-auto space-y-3">
      <div className="flex gap-2">
        <input
          className="border p-2 rounded flex-1"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <input
          className="border p-2 rounded w-32"
          value={senderId}
          onChange={(e) => setSenderId(e.target.value)}
        />
      </div>

      <div className="border rounded h-56 overflow-auto p-2 text-sm bg-white">
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="border p-2 rounded flex-1"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="px-3 py-2 rounded bg-black text-white"
          onClick={send}
        >
          보내기
        </button>
      </div>
    </div>
  );
};
