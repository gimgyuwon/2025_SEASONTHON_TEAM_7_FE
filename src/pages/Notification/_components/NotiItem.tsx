import type { GetNotificationBaseType } from "@/interfaces/notification";
import rightArrowIcon from "@/assets/Chat/rightArrowIcon.svg";
import formatTime from "@/pages/Chat/_utils/formatTime";
import { useNavigate } from "react-router-dom";

type NotiItemProps = {
  item: GetNotificationBaseType;
};

const NotiItem = ({ item }: NotiItemProps) => {
  const btnTitle = "확인";
  const navigate = useNavigate();

  const handleClickBtn = async (referencedId: number) => {
    navigate(`decide/${referencedId}`, { state: { referencedId } });
  };

  return (
    <div className="noti">
      <div className="noti__item">
        {/* left */}
        <div className="noti__left">
          {/* profile */}
          <div
            // style={
            //   item?.img ? { backgroundImage: `url(${item.img})` } : undefined
            // }
            role="img"
            aria-label="profile"
            className="noti__profile"
          />
          {/* noti info */}
          <div className="noti__info">
            {/* recent message */}
            <div className="noti__message body">
              {item?.message
                ? item.message
                : `${
                    item?.receiverName ? item.receiverName : "차한잔"
                  } 님이 차 한잔을 요청했어요.`}
            </div>
            {/* createdAt */}
            <div className="noti_createdAt caption1">
              {item?.createdAt ? formatTime(item.createdAt) : "지금"}
            </div>
          </div>
        </div>
        {/* right */}
        <div className="noti__right">
          <button
            type="button"
            className="noti__btn"
            onClick={() => handleClickBtn(item.referencedId)}
          >
            {btnTitle}
            <img
              className="noti__img"
              src={rightArrowIcon}
              alt="rightArrowIcon"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotiItem;
