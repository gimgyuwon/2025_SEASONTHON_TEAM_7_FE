// src/pages/Chat.tsx (또는 원하는 위치)
import { useEffect, useMemo, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { createStompClient, type IncomingChatMsg } from "@/utils/stompClient";
import {
  CreateChatRoom,
  EvaluateScore,
  RetrieveMyChat,
  RetrieveSpecificChat,
} from "@/services/chat/chatService";
import type {
  ChatResponseType,
  MyChatResponseType,
  RenderMsgProps,
} from "@/interfaces/chat";

const Chat: React.FC = () => {
  const [roomId, setRoomId] = useState<number | null>(2);
  const [msg, setMsg] = useState("");
  const [createRes, setCreateRes] = useState<ChatResponseType>();
  const [messages, setMessages] = useState<RenderMsgProps[]>([]);
  const [myRooms, setMyRooms] = useState<MyChatResponseType["data"]>([]);
  const clientRef = useRef<Client | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const token = useMemo(() => localStorage.getItem("accessToken"), []);
  const socketEndpoint = "/ws-connect"; // 서버와 동일해야 함

  // 방 리스트 불러오기
  useEffect(() => {
    (async () => {
      try {
        const mine = await RetrieveMyChat();
        setMyRooms(mine?.data ?? []);
      } catch (e) {
        console.error("내 채팅방 목록 조회 실패:", e);
      }
    })();
  }, []);

  // 특정 방 입장 (히스토리 로딩 + STOMP 연결)
  useEffect(() => {
    if (!roomId || roomId <= 0) return;

    let mounted = true;

    const init = async () => {
      try {
        // 1) 과거 메시지 로딩
        const history = await RetrieveSpecificChat(roomId);
        if (!mounted) return;

        const formatted = (history?.data ?? []).map((m: any) => ({
          sender: m.senderName ?? "알수없음",
          text: m.content ?? "(빈 메시지)",
          at: m.sentAt,
        }));
        setMessages(formatted);

        // 2) STOMP 연결
        const client = createStompClient(
          socketEndpoint,
          // token,
          roomId,
          (serverMsg: IncomingChatMsg) => {
            setMessages((prev) => [
              ...prev,
              {
                sender: serverMsg.senderName,
                text: serverMsg.content,
                at: serverMsg.sentAt,
              },
            ]);
          }
        );

        clientRef.current = client;
      } catch (e) {
        console.error("방 초기화 실패:", e);
      }
    };

    init();

    return () => {
      mounted = false;
      clientRef.current?.deactivate();
      clientRef.current = null;
    };
  }, [roomId, token]);

  // 스크롤 항상 아래로
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // 방 생성 -> roomId 세팅
  const handleClickCreate = async () => {
    try {
      const created = await CreateChatRoom({ opponentId: 1 }); // 상대 ID 고정 예시
      setCreateRes(created);
      const id = created?.data?.chatRoomId;
      if (id) setRoomId(id);
    } catch (e) {
      console.error("방 생성 실패:", e);
    }
  };

  // 내 채팅방 재조회 (수동 새로고침)
  const handleRefreshRooms = async () => {
    try {
      const mine = await RetrieveMyChat();
      setMyRooms(mine?.data ?? []);
    } catch (e) {
      console.error("내 채팅방 목록 조회 실패:", e);
    }
  };

  // 방 선택 입장
  const enterRoom = (id: number) => {
    if (!id) return;
    // 기존 연결 정리
    clientRef.current?.deactivate();
    clientRef.current = null;
    setMessages([]);
    setRoomId(id);
  };

  const handleEvaluateScore = async () => {
    try {
      const res = await EvaluateScore({
        memberId: 1,
        rate: 5,
        review: "친절하고 성실한 분이었어요!",
      });
      console.log("EvaluateScore try", res);
    } catch (err: unknown) {
      console.error("evaluate manner score failed", err);
    }
  };

  const handleSendMessage = () => {
    if (!msg.trim() || !clientRef.current || !roomId) return;

    // 서버 명세에 맞춘 페이로드: content 사용
    const payload = {
      chatRoomId: roomId,
      // senderId: 20,
      content: msg,
      contentType: "TEXT",
      messageType: "CHAT",
    };

    clientRef.current.publish({
      destination: "/pub/chat.send",
      body: JSON.stringify(payload),
    });

    setMsg("");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-2">
        현재 채팅방: {roomId ?? "(미입장)"}
      </h2>

      <button type="submit" onClick={() => handleEvaluateScore()}>
        매너평가하기
      </button>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          className="px-3 py-2 rounded bg-blue-600 text-white"
          onClick={handleClickCreate}
        >
          방 생성
        </button>
        <button
          type="button"
          className="px-3 py-2 rounded bg-gray-200"
          onClick={handleRefreshRooms}
        >
          내 방 새로고침
        </button>
      </div>

      {/* 내 채팅방 목록 */}
      <div className="mb-4 border rounded p-3">
        <div className="font-semibold mb-2">내 채팅방</div>
        {myRooms.length === 0 ? (
          <div className="text-sm text-gray-500">참여중인 방이 없습니다.</div>
        ) : (
          <ul className="space-y-2">
            {myRooms.map((r) => (
              <li
                key={r.chatRoomId}
                className="flex items-center justify-between"
              >
                <div className="text-sm">
                  <div>
                    상대: {r.otherMemberName} (ID: {r.otherMemberId})
                  </div>
                  <div className="text-gray-500">
                    최근: {r.lastMessage ?? "-"} / 안읽음: {r.unreadCount}
                  </div>
                </div>
                <button
                  className="px-2 py-1 bg-green-600 text-white rounded"
                  onClick={() => enterRoom(r.chatRoomId)}
                >
                  입장
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 채팅창 */}
      <div className="h-80 overflow-y-auto border rounded p-3 mb-3 bg-white">
        {messages.map((m, idx) => (
          <div key={idx} className="mb-2">
            <div className="text-xs text-gray-500">
              {m.sender} {m.at ? `• ${new Date(m.at).toLocaleString()}` : ""}
            </div>
            <div className="px-2 py-1 rounded bg-gray-100 whitespace-pre-wrap">
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={msg}
          placeholder="보낼 메시지를 입력하세요"
          onChange={(e) => setMsg(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          className="px-3 py-2 rounded bg-indigo-600 text-white"
          onClick={handleSendMessage}
          disabled={!roomId}
          title={!roomId ? "방에 먼저 입장하세요" : ""}
        >
          보내기
        </button>
      </div>

      {createRes && (
        <p className="text-xs text-gray-500 mt-2">
          새 방 생성됨: #{createRes.data.chatRoomId}
        </p>
      )}
    </div>
  );
};

export default Chat;
