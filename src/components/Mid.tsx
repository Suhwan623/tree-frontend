import styled from "styled-components";
import React, { useState } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignUpModal";

// 공통 버튼 스타일 정의
const Button = styled.button`
  width: 100%;
  height: 3.25rem;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background-color: #e05e6d;
  color: rgb(255, 255, 255);
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: #d04e5c;
  }
`;

const ListContainer = styled.ul`
  font-size: var(--cmt-typography-body-strong-font-size);
  line-height: var(--cmt-typography-body-strong-line-height);
  font-weight: var(--cmt-typography-body-strong-font-weight);
  margin: 0 auto;
  padding: 0.5rem 2.5rem;
  max-width: 35rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  text-align: center;
  box-sizing: border-box;
`;

const ListItem = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ButtonText = styled.span`
  line-height: var(--cmt-typography-body-strong-line-height);
  font-size: 1rem;
  font-weight: 700;
  font-family: "Cafe24Ssurround", sans-serif;
`;

const LandingMid: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleSignupClick = () => {
    setIsSignupModalOpen(true);
  };

  return (
    <>
      <ListContainer>
        <ListItem>
          <Button onClick={handleSignupClick}>
            <ButtonText>회원가입</ButtonText>
          </Button>
        </ListItem>
        <ListItem>
          <Button onClick={handleLoginClick}>
            <ButtonText>로그인</ButtonText>
          </Button>
        </ListItem>
      </ListContainer>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </>
  );
};

export default LandingMid;