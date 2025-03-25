import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../api/axios";

// Props 타입 정의
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (token: string, refreshToken: string) => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 20rem;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
`;

const ModalTitle = styled.h1`
  font-size: var(--cmt-typography-body-strong-font-size);
  line-height: var(--cmt-typography-body-strong-line-height);
  font-weight: var(--cmt-typography-body-strong-font-weight);
  font-family: "Cafe24Ssurround";
  text-align: center;
  margin: 0;
  color: #333;
`;

const ModalInput = styled.input`
  width: 100%;
  height: 3.25rem;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 1rem;
  font-family: "Cafe24Ssurround", sans-serif;
`;

const ModalButton = styled.button`
  width: 100%;
  height: 3.25rem;
  padding: 1rem 1.5rem;
  background-color: #e05e6d;
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  font-family: "Cafe24Ssurround", sans-serif;
  box-sizing: border-box;
  &:hover {
    background-color: #d04e5c;
  }
`;

const ErrorText = styled.p`
  color: #e05e6d;
  font-size: 0.875rem;
  margin: 0;
  text-align: center;
`;

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setUsername("");
      setPassword("");
      setLoginError(null);
    }
  }, [isOpen]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // 로그인 요청
      const response = await customAxios.post("/api/login", {
        username,
        password,
      });
      const { result, token, refreshToken } = response.data;

      if (result === "ok") {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", refreshToken);
        console.log("로그인 성공, 토큰 저장됨:", { token, refreshToken });
        alert("로그인 성공!");

        if (onLoginSuccess) {
          onLoginSuccess(token, refreshToken);
        }

        try {
          const treeResponse = await customAxios.get("/api/tree/my", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("트리 정보 응답:", treeResponse.data);

          const { treeInfo } = treeResponse.data;

          const hasTreeAssets =
            Array.isArray(treeInfo) &&
            treeInfo.length === 3 &&
            treeInfo.every((item: string) => typeof item === "string" && item.trim() !== "");

          if (hasTreeAssets) {
            navigate("/result");
          } else {
            navigate("/tree");
          }
        } catch (treeError) {
          console.error("트리 정보 조회 실패:", treeError);
          navigate("/tree");
        }

        onClose();
      } else {
        throw new Error("로그인 결과가 'ok'가 아님");
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setLoginError("로그인 실패. 입력값을 확인해주세요.");
        setPassword("");
      } else {
        alert("오류 발생: " + error.message);
      }
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <ModalTitle>로그인</ModalTitle>
        <form onSubmit={(e: React.FormEvent) => {
          e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
          handleLogin();
        }}>
          <ModalInput
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            disabled={isLoading}
            autoComplete="username"
          />
          <ModalInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            disabled={isLoading}
            autoComplete="current-password"
          />
          {loginError && <ErrorText>{loginError}</ErrorText>}
          <ModalButton type="submit" disabled={isLoading}>
            {isLoading ? "처리 중..." : "로그인"}
          </ModalButton>
        </form>
        <ModalButton onClick={onClose} disabled={isLoading}>
          닫기
        </ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;