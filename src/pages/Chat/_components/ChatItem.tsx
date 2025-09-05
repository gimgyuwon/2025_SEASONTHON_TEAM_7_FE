import type { ItemType } from "@/interfaces/chat";

const ChatItem = ({ bgColor, item }: { bgColor: string; item: ItemType }) => {
  return (
    <div className={`chat ${bgColor}`}>
      <div className="chat__item">
        <div className="chat__left">
          {/* profile */}
          <div
            style={
              item?.img ? { backgroundImage: `url(${item.img})` } : undefined
            }
            role="img"
            aria-label="profile"
            className="chat__profile"
          />
          {/* user info */}
          <div className="chat__info">
            {/* user name */}
            <div className="chat__name label">
              {item?.recentMsg ? item.recentMsg : "차한잔"}
            </div>
            {/* recent message */}
            <div className="chat__msg body">
              {item?.recentMsg ? item.recentMsg : "대화를 시작해보세요"}
            </div>
          </div>
        </div>
        {/* time */}
        <div className="chat__time caption1">
          {item?.recentTime ? item.recentTime : ""}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
