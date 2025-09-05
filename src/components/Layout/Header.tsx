import React from "react";
import BellIcon from "./BellIcon";
import closeIcon from "@/assets/Header/close.svg";
import backIcon from "@/assets/Header/back.svg";
import moreIcon from "@/assets/Header/more.svg";
import settingIcon from "@/assets/Header/setting.svg";

export type HeaderType =
  | "home"
  | "close"
  | "label-only"
  | "back-more"
  | "back-only"
  | "profile";

interface HeaderProps {
  type?: HeaderType;
  title?: string;
  onClose?: () => void;
  onBack?: () => void;
  onMore?: () => void;
  onSetting?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  type = "label-only",
  title = "",
  onClose,
  onBack,
  onMore,
  onSetting,
}) => {
  const renderHeaderContent = () => {
    switch (type) {
      case "home":
        return (
          <>
            <div className="header-logo">
              <h1>차한잔</h1>
            </div>
            <BellIcon />
          </>
        );

      case "close":
        return (
          <>
            <div className="header-spacer"></div>
            <button className="header-icon-btn" onClick={onClose}>
              <img src={closeIcon} alt="닫기" />
            </button>
          </>
        );

      case "label-only":
        return (
          <>
            <div className="header-left">
              <span className="label">{title}</span>
            </div>
            <BellIcon />
          </>
        );

      case "back-more":
        return (
          <>
            <button className="header-icon-btn" onClick={onBack}>
              <img src={backIcon} alt="뒤로가기" />
            </button>
            <div className="header-title">
              <span className="label">{title}</span>
            </div>
            <button className="header-icon-btn" onClick={onMore}>
              <img src={moreIcon} alt="더보기" />
            </button>
          </>
        );

      case "back-only":
        return (
          <>
            <button className="header-icon-btn" onClick={onBack}>
              <img src={backIcon} alt="뒤로가기" />
            </button>
            <div className="header-title">
              <span className="label">{title}</span>
            </div>
            <div className="header-spacer"></div>
          </>
        );

      case "profile":
        return (
          <>
            <div className="header-logo">
              <h1>프로필</h1>
            </div>
            <button className="header-icon-btn" onClick={onSetting}>
              <img src={settingIcon} alt="설정" />
            </button>
          </>
        );

      default:
        return (
          <>
            <div className="header-logo">
              <h1>차한잔</h1>
            </div>
            <BellIcon />
          </>
        );
    }
  };

  return (
    <header className="header">
      <div className="header-content">{renderHeaderContent()}</div>
    </header>
  );
};

export default Header;
