import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { customAxios } from "../api/axios";

// Props 타입 정의
interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 스타일드 컴포넌트 정의
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

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [signupError, setSignupError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setUsername("");
      setPassword("");
      setNickname("");
      setSignupError(null);
    }
  }, [isOpen]);

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const response = await customAxios.post("/api/signup", {
        username,
        password,
        nickname,
      });
      console.log("회원가입 성공:", response.data);
      alert("회원가입 성공!");
      onClose();
    } catch (error: any) {
      if (error.response?.status === 400) {
        setSignupError("회원가입 실패. 입력값을 확인해주세요.");
        setPassword("");
      } else {
        alert("오류 발생: " + error.message);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <ModalTitle>회원가입</ModalTitle>
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
        <ModalInput
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNickname(e.target.value)
          }
          disabled={isLoading}
        />
        {signupError && <ErrorText>{signupError}</ErrorText>}
        <ModalButton onClick={handleSignup} disabled={isLoading}>
          {isLoading ? "처리 중..." : "회원가입"}
        </ModalButton>
        <ModalButton onClick={onClose} disabled={isLoading}>
          닫기
        </ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SignupModal;