import React from "react";
import styled from "styled-components";
import { FaCog, FaTree, FaHome, FaEnvelope, FaQrcode, FaUsers, FaQuestionCircle, FaHeadset, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  nickname?: string | null | undefined;
}

const StyledSidebar = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 17.5rem;
  height: 100%;
  z-index: 10;
  padding: 0 1rem;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  background: #1a2526;
  display: flex;
  flex-direction: column;
  overflow: auto;
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(100%)")};
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SidebarTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  color: #fff;
`;

const NicknameSpan = styled.span`
  color: #00ffcc;
  margin-right: 0.1875rem;
`;

const CloseSidebarButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
`;

const SidebarList = styled.ol`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarItem = styled.li`
  list-style: none;
  width: 100%;
`;

const SidebarButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.375rem 0.5rem;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
`;

const SidebarIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  margin-right: 0.5rem;
`;

const SidebarText = styled.span`
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
`;

const AdItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
  margin: 0.5rem 0.37rem;
  color: #9095a9;
`;

const NewTag = styled.span`
  background: #ff4d4f;
  color: #fff;
  font-size: 0.75rem;
  padding: 0.1rem 0.5rem;
  border-radius: 10px;
  margin-left: 0.5rem;
`;

const SidebarDivider = styled.div`
  margin: 1rem 0.5rem;
  border: 0.5px solid #3b4052;
`;

const SidebarSocial = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const SocialItem = styled.li`
  list-style: none;
`;

const InstagramIcon = styled.a`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background-image: url(/insta.png);
  background-size: cover;
  margin-left: 0.3rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const TwitterIcon = styled.a`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background-image: url(/twitter.png);
  background-size: cover;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const SidebarFooter = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0.5rem 0.75rem;
  opacity: 0.5;
`;

const SidebarModal: React.FC<SidebarProps> = ({ isOpen, onClose, nickname }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/");

    onClose();
  };

  return (
    <StyledSidebar $isOpen={isOpen}>
      <SidebarHeader>
        <SidebarTitle>
          {nickname ? (
            <>
              <NicknameSpan>{nickname}</NicknameSpan>님
            </>
          ) : (
            ""
          )}
        </SidebarTitle>
        <CloseSidebarButton onClick={onClose}>
          <FaTimes />
        </CloseSidebarButton>
      </SidebarHeader>
      <SidebarList>
        <SidebarItem>
          <SidebarButton>
            <SidebarIcon>
              <FaCog />
            </SidebarIcon>
            <SidebarText>계정 설정</SidebarText>
          </SidebarButton>
        </SidebarItem>
        <SidebarItem>
          <SidebarButton>
            <SidebarIcon>
              <FaTree />
            </SidebarIcon>
            <SidebarText>내 트리 보기</SidebarText>
          </SidebarButton>
        </SidebarItem>
        <SidebarItem>
          <SidebarButton>
            <SidebarIcon>
              <FaHome />
            </SidebarIcon>
            <SidebarText>지난 트리 보관함</SidebarText>
          </SidebarButton>
        </SidebarItem>
        <SidebarItem>
          <SidebarButton>
            <SidebarIcon>
              <FaEnvelope />
            </SidebarIcon>
            <SidebarText>내가 작성한 메시지</SidebarText>
          </SidebarButton>
        </SidebarItem>
        <SidebarItem>
          <SidebarButton>
            <SidebarIcon>
              <FaQrcode />
            </SidebarIcon>
            <SidebarText>
              내 트리 QR코드
              <NewTag>new</NewTag>
            </SidebarText>
          </SidebarButton>
        </SidebarItem>
      </SidebarList>
      <SidebarDivider />
      <SidebarList>
        <SidebarItem>
          <SidebarButton>
            <SidebarIcon>
              <FaUsers />
            </SidebarIcon>
            <SidebarText>산타파이브 팀 소개</SidebarText>
          </SidebarButton>
        </SidebarItem>
        <SidebarItem>
          <SidebarButton>
            <SidebarIcon>
              <FaQuestionCircle />
            </SidebarIcon>
            <SidebarText>자주 묻는 질문</SidebarText>
          </SidebarButton>
        </SidebarItem>
        <SidebarItem>
          <SidebarButton>
            <SidebarIcon>
              <FaHeadset />
            </SidebarIcon>
            <SidebarText>
              문의하기
              <NewTag>new</NewTag>
            </SidebarText>
          </SidebarButton>
        </SidebarItem>
      </SidebarList>
      <SidebarDivider />
      <SidebarList>
        <SidebarItem>
          <SidebarButton onClick={handleLogout}>
            <SidebarText>로그아웃</SidebarText>
          </SidebarButton>
          <SidebarDivider />
        </SidebarItem>
      </SidebarList>
      <SidebarSocial>
        <SocialItem>
          <InstagramIcon
            href="https://instagram.com/santafive_official"
            target="_blank"
            title="Santafive 인스타그램 링크"
            aria-label="Santafive 인스타그램 링크"
          />
        </SocialItem>
        <SocialItem>
          <TwitterIcon
            href="https://twitter.com/santafive_S2"
            target="_blank"
            title="Santafive X(구 트위터) 링크"
            aria-label="Santafive X(구 트위터) 링크"
          />
        </SocialItem>
      </SidebarSocial>
      <AdItem>
        <a href="mailto:santafive.ad@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>
          광고문의: santafive.ad@gmail.com
        </a>
      </AdItem>
      <SidebarFooter></SidebarFooter>
    </StyledSidebar>
  );
};

export default SidebarModal;