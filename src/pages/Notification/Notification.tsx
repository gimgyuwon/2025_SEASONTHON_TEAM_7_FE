import rightArrowIcon from "@/assets/Chat/rightArrowIcon.svg";

const Notification = () => {
  const item = {
    otherName: "",
    msg: "",
    time: "",
  };
  const btnTitle = "확인";

  return (
    <div className="wrapper">
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
              <div className="noti__msg body">
                {item?.msg
                  ? item.msg
                  : `${
                      item?.otherName ? item.otherName : "차한잔"
                    } 님이 차 한잔을 요청했어요.`}
              </div>
              {/* time */}
              <div className="noti_time caption1">
                {item?.time ? item.time : "지금"}
              </div>
            </div>
          </div>
          {/* right */}
          <div className="noti__right">
            <button type="button" className="noti__btn">
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
    </div>
  );
};

export default Notification;
