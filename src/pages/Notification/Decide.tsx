import { useLayout } from "@/services/hooks/useLayout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeChatStatus, CreateChatRoom } from "@/services/chat/chatService";
import { getSpecificMember } from "@/services/home/memberService";
import type { ProfileProps } from "@/interfaces/user";

const Decide = () => {
  const { setLayoutConfig } = useLayout();
  const navigate = useNavigate();
  const [user, setUser] = useState<ProfileProps>();
  const [opponentId, setOppentId] = useState<number>();

  const { refId } = useParams<{ refId: string }>();
  const coffeeChatId = Number(refId);

  const handleGetSpecificMember = async () => {
    try {
      const res = await getSpecificMember(coffeeChatId);
      setUser(res);
      setOppentId(res.memberId);
      console.log("get getSpecificMember", res);
    } catch (err: unknown) {
      console.error("get handleGetSpecificMember failed", err);
    }
  };

  useEffect(() => {
    handleGetSpecificMember();
  }, []);

  useEffect(() => {
    setLayoutConfig({
      type: "close",
      showHeader: true,
      showBottomBar: false,
      onClose: () => navigate(-1),
    });
  }, [setLayoutConfig, navigate]);

  const handleClickCreate = async (opponentId: number) => {
    try {
      const res = await CreateChatRoom({ opponentId: opponentId });
      console.log("CreateChatRoom", res);
    } catch (e) {
      console.error("방 생성 실패:", e);
    }
  };

  const handleClickBtn = async (coffeeChatId: number, accept: boolean) => {
    const isAccept = accept == true;
    try {
      const res = await ChangeChatStatus({
        coffeeChatId,
        status: isAccept ? "ACCEPTED" : "DECLINED",
      });
      if (isAccept && opponentId) {
        handleClickCreate(opponentId);
      }
      console.log("handleClickBtn", res);
      navigate("/chat");
    } catch (err: unknown) {
      console.error("err", err);
    }
  };

  if (!user) return null;

  console.log("user", user);

  return (
    <div className="chat-request-container">
      {/* 프로필 카드 */}
      <div className="chat-request-profile-card">
        <div className="chat-request-user-profile">
          <div className="chat-request-profile-image">
            {user.profileImageUrl ? (
              <img src={user.profileImageUrl} alt={`${user.nickname} 프로필`} />
            ) : (
              <div className="chat-request-profile-placeholder">
                <span>{user.nickname.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="chat-request-user-info">
            <span className="chat-request-user-nickname">
              {user.nickname}
              <span className="chat-request-user-nickname-suffix">님</span>
              <span className="chat-request-user-age">{user.age}</span>
            </span>
            {!user.mannerScore ? (
              <span className="tea-score">첫 대화 대기중</span>
            ) : (
              <span className="tea-score">
                찻잔지수
                <span className="tea-score-number">{user.mannerScore}잔</span>
              </span>
            )}
            <div className="chat-request-user-interests">
              {user.interests.map((tag, index) => (
                <span key={index} className="chat-request-hashtag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 자기소개 */}
      <div className="chat-request-introduction-section">
        <h3 className="chat-request-section-title">자기소개</h3>
        <p className="chat-request-introduction-text">
          {user.introduction ? user.introduction : "-"}
        </p>
      </div>

      {/* 채팅 신청 버튼 */}

      <div className="chat-request-button-section">
        <button
          className="btn btn-secondary chat-request-btn"
          onClick={() => handleClickBtn(coffeeChatId, false)}
        >
          다음에 한 잔 해요
        </button>
        <button
          className="btn btn-primary chat-request-btn"
          onClick={() => handleClickBtn(coffeeChatId, true)}
        >
          {user.nickname} 님과 차 한잔 하기
        </button>
      </div>
    </div>
  );
};

export default Decide;
