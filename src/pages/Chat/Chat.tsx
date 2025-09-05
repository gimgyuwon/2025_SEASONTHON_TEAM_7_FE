import type { ItemType } from "@/interfaces/chat";
import ChatItem from "./_components/ChatItem";

const Chat = () => {
  const items: ItemType[] = Array(4).fill({
    img: "",
    name: "",
    recentMsg: "",
    recentTime: "3분 전",
  });

  return (
    <div className="wrapper">
      {/* chatroom */}
      {items.map((item, idx) => (
        <ChatItem
          key={idx}
          item={item}
          bgColor={idx % 2 === 0 ? "even" : "odd"}
        />
      ))}
    </div>
  );
};

export default Chat;
