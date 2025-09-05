import type { MyChatBaseType } from "@/interfaces/chat";
import ChatItem from "./_components/ChatItem";
import { useEffect, useState } from "react";
import { RetrieveMyChat } from "@/services/chat/chatService";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const [myRooms, setMyRooms] = useState<MyChatBaseType[]>([]);

  console.log(myRooms);

  // Retrieve my chat room
  useEffect(() => {
    (async () => {
      try {
        const res = await RetrieveMyChat();
        setMyRooms(res.data);
      } catch (e) {
        console.error("내 채팅방 목록 조회 실패:", e);
      }
    })();
  }, []);

  const handleClickRoom = (chatRoomId: number) => {
    navigate(`${chatRoomId}`);
  };

  return (
    <div className="wrapper">
      {/* chatroom */}
      {myRooms.map((item, idx) => (
        <ChatItem
          key={idx}
          item={item}
          bgColor={idx % 2 === 0 ? "even" : "odd"}
          onClick={() => handleClickRoom(item.chatRoomId)}
        />
      ))}
    </div>
  );
};

export default Chat;
