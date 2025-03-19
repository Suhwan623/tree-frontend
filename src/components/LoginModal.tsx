import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // 추가
import { customAxios } from "../api/axios";

// Props 타입 정의
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (token: string, refreshToken: string) => void; // 토큰 전달 (선택적)
}

// 스타일드 컴포넌트 정의 (변경 없음)
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

// 컴포넌트 정의
const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // 추가

  // 모달이 열릴 때 입력값 초기화
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
      const response = await customAxios.post("/api/login", {
        username,
        password,
      });
      const { result, token, refreshToken } = response.data;

      if (result === "ok") {
        localStorage.setItem("accessToken", token); // 액세스 토큰 저장
        localStorage.setItem("refreshToken", refreshToken); // 리프레시 토큰 저장
        console.log("로그인 성공, 토큰 저장됨:", { token, refreshToken });
        alert("로그인 성공!");
        
        if (onLoginSuccess) {
          onLoginSuccess(token, refreshToken); // 상위 컴포넌트로 토큰 전달
        }
        onClose();
        navigate("/tree"); // 추가: Tree 페이지로 이동
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
        <ModalInput
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          disabled={isLoading}
        />
        <ModalInput
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          disabled={isLoading}
        />
        {loginError && <ErrorText>{loginError}</ErrorText>}
        <ModalButton onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "처리 중..." : "로그인"}
        </ModalButton>
        <ModalButton onClick={onClose} disabled={isLoading}>
          닫기
        </ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;