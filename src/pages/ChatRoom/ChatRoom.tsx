import type { MessageBaseType } from "@/interfaces/chat";
import { RetrieveSpecificChat } from "@/services/chat/chatService";
import { useLayout } from "@/services/hooks/useLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ChatRoom = () => {
  const { setLayoutConfig } = useLayout();
  const instruction = "채팅종료까지 남은 시간";
  const { chatRoomId } = useParams<{ chatRoomId: string }>();
  const [history, setHistory] = useState<MessageBaseType[]>([]);

  console.log(chatRoomId);

  const init = async () => {
    if (!chatRoomId) return;
    try {
      // load past message
      const res = await RetrieveSpecificChat(Number(chatRoomId));
      setHistory(res.data);
      console.log("loaded messages", res.data);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  useEffect(() => {
    init();
  }, [chatRoomId]);

  useEffect(() => {
    setLayoutConfig({
      type: "back-more",
      showHeader: true,
      title: "차한잔",
      showBottomBar: false,
    });
  }, [setLayoutConfig]);

  return (
    <div className="wrapper">
      <div className="chat">
        <div className="chat__instruction caption1">{instruction}</div>
      </div>
    </div>
  );
};

export default ChatRoom;
