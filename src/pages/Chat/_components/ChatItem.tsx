import type { MyChatBaseType } from "@/interfaces/chat";
import formatTime from "../_utils/formatTime";

const ChatItem = ({
  bgColor,
  item,
  onClick,
}: {
  bgColor: string;
  item: MyChatBaseType;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div className={`chat ${bgColor}`} onClick={onClick}>
      <div className="chat__item">
        <div className="chat__left">
          {/* profile */}
          <div
            // style={
            //   item?.img ? { backgroundImage: `url(${item.img})` } : undefined
            // }
            role="img"
            aria-label="profile"
            className="chat__profile"
          />
          {/* user info */}
          <div className="chat__info">
            {/* user name */}
            <div className="chat__name label">
              {item?.otherMemberName ? item.otherMemberName : "차한잔"}
            </div>
            {/* recent message */}
            <div className="chat__msg body">
              {item?.lastMessage ? item.lastMessage : "대화를 시작해보세요"}
            </div>
          </div>
        </div>
        {/* time */}
        <div className="chat__time caption1">
          {item?.lastMessageAt ? formatTime(item.lastMessageAt) : ""}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
