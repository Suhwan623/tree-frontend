// components/Result.tsx
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { FaShareAlt, FaBars, FaUsers } from "react-icons/fa";
import { customAxios } from "../api/axios";
import SidebarModal from "../components/SidebarModal";

interface BackImageProps {
  src: string;
}

interface Post {
  id: number;
  imgName: string;
  nickname?: string;
  senderName?: string;
  content?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  position: relative;
  background-position: center center;
  background-size: cover;
  background-repeat: repeat-x;
  overflow: hidden;
  font-family: "Pretendard", sans-serif;
  min-height: 100vh;
`;

const NicknameSpan = styled.span`
  color: #00ffcc;
  margin-right: 0.1875rem;
`;

const Message = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 37.5rem;
  margin-bottom: 1rem;
  z-index: 2;
`;

const Menu = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 11;
  &:hover {
    color: #00ffcc;
  }
`;

const TreeContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 24rem;
  height: 400px;
  padding-top: 34px;
  overflow-x: auto;
  white-space: nowrap;
  scroll-snap-type: x mandatory;
  margin: 0 auto;
  z-index: 2;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const TreeSlider = styled.div`
  display: inline-flex;
  height: 100%;
  z-index: 2;
`;

const TreeWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  z-index: 2;
`;

const TreeImage = styled.img`
  width: 100%;
  height: 100%;
  scroll-snap-align: center;
  flex-shrink: 0;
`;

const BackImage = styled.div<BackImageProps>`
  position: absolute;
  width: 100%;
  height: 100vh;
  background: url(${(props) => props.src}) center/contain repeat-x;
  z-index: 0;
`;

const PointImage = styled.img`
  width: 50px;
  height: 50px;
  position: absolute;
  top: -34px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
`;

const Decoration = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 4;
`;

const DecorationImage = styled.img`
  width: 3.75rem;
  height: 3.75rem;
  object-fit: contain;
`;

const SenderName = styled.span`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #fff;
  font-weight: 600;
  margin-top: 0.2rem;
  font-family: "Pretendard", sans-serif;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContent = styled.div`
  background: transparent;
  border-radius: 1rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 24rem;
  position: relative;
  animation: slideUp 0.5s ease-out forwards;

  @keyframes slideUp {
    from {
      transform: translateY(100vh);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const LetterWritingCard = styled.div`
  background-color: rgba(171, 121, 84, 1);
  border: 2px solid #8b5a2b;
  border-radius: 1rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 24rem;
  position: relative;
  margin: 0.375rem 1rem 1rem 0.375rem !important;
  box-shadow: 0 0 0 0.1875rem #ffffff;
  display: flex;
  flex-direction: column;
`;

const LetterContent = styled.p`
  width: 100%;
  min-height: 200px;
  padding: 0.5rem;
  color: #fff;
  font-family: "Pretendard", sans-serif;
  font-size: 1rem;
  white-space: pre-wrap;
  margin-top: 0;
`;

const Sender = styled.h2`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  color: #fff;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
`;

const PreviewDecorationImage = styled.img`
  width: 60px;
  height: 60px;
  position: absolute;
  top: -30px;
  right: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: "Cafe24Ssurround", sans-serif;
  font-size: 1rem;
  margin: 1rem 0;
  z-index: 2;
`;

const PageButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 2;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 23.5rem;
`;

const ActionButton = styled.button`
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  height: 3.5rem;
  border-radius: 1rem;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  background-color: #54596d;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #444;
  }
`;

const ShareIcon = styled(FaShareAlt)`
  margin-right: 0.5rem;
`;

const UserButton = styled.button`
  padding: 0.8rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: #fff;
  display: flex;
  align-items: center;
`;

const Result: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [background, setBackground] = useState<string | null>(null);
  const [tree, setTree] = useState<string | null>(null);
  const [point, setPoint] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [treeOwnerId, setTreeOwnerId] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isTreeOwner, setIsTreeOwner] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const treeContainerRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 9;

  const getImageUrl = (imgName: string, type: string) =>
    `http://localhost:8070/images/${type}/${imgName}`;

  const getDecorationPosition = (index: number) => {
    const positions = [
      { x: 130, y: 60 },
      { x: 200, y: 60 },
      { x: 70, y: 150 },
      { x: 160, y: 150 },
      { x: 240, y: 150 },
      { x: 40, y: 230 },
      { x: 130, y: 230 },
      { x: 210, y: 230 },
      { x: 280, y: 230 },
    ];
    return positions[index % positions.length];
  };

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const userRes = await customAxios.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (userRes.data.message !== "ok") {
          navigate("/login");
          return;
        }
        setCurrentUserId(userRes.data.id);
        setNickname(userRes.data.nickname);

        const treeRes = await customAxios.get(
          id ? `/api/tree/${id}` : "/api/tree/my",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { treeInfo, posts: fetchedPosts, nickname: treeNickname } = treeRes.data;

        const hasTreeAssets =
          Array.isArray(treeInfo) &&
          treeInfo.length === 3 &&
          treeInfo.every((item) => typeof item === "string" && item.trim() !== "");
        if (!hasTreeAssets && !id) {
          navigate("/tree");
          return;
        }

        if (treeInfo?.length === 3) {
          setBackground(treeInfo[0] || null);
          setTree(treeInfo[1] || null);
          setPoint(treeInfo[2] || null);
        }
        const normalizedPosts = fetchedPosts.map((post: Post) => ({
          ...post,
          nickname: post.nickname ?? post.senderName,
        }));
        setPosts(normalizedPosts || []);
        setNickname(treeNickname || userRes.data.nickname);
        setTreeOwnerId(id || userRes.data.id);

        const treeOwnerNickname = id ? treeNickname : userRes.data.nickname;
        setIsTreeOwner(userRes.data.nickname === treeOwnerNickname);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        navigate(id ? "/tree" : "/login");
      }
    };

    loadData();
  }, [id, navigate]);

  useEffect(() => {
    const calculatedTotalPages = Math.ceil(posts.length / itemsPerPage);
    setTotalPages(Math.max(calculatedTotalPages, 1));

    if (currentPage > calculatedTotalPages) {
      setCurrentPage(calculatedTotalPages);
    }
  }, [posts, currentPage, itemsPerPage]);

  const handleShare = () => {
    alert("트리 공유 기능이 준비 중입니다!");
  };

  const handleDecorate = () => {
    navigate(`/decorate/${id}`);
  };

  const handlePrev = () => {
    if (treeContainerRef.current) {
      treeContainerRef.current.scrollBy({
        left: -treeContainerRef.current.clientWidth,
        behavior: "smooth",
      });
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleNext = () => {
    if (treeContainerRef.current) {
      treeContainerRef.current.scrollBy({
        left: treeContainerRef.current.clientWidth,
        behavior: "smooth",
      });
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    }
  };

  const handleDecorationClick = (post: Post) => {
    if (!isTreeOwner) {
      alert("이 편지는 트리 소유자만 볼 수 있습니다.");
    } else if (post.content) {
      setSelectedPost(post);
    } else {
      alert("편지 내용을 볼 수 없습니다.");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isMyTree = currentUserId && treeOwnerId ? currentUserId === treeOwnerId : !treeOwnerId;

  const postsForPage = (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return posts.slice(startIndex, endIndex);
  };

  return (
    <Container>
      {background && <BackImage src={getImageUrl(background, "backs")} />}
      <Message>
        {nickname ? (
          <>
            <NicknameSpan>{nickname}</NicknameSpan>님의 트리
            <Menu onClick={toggleMenu}>
              <FaBars />
            </Menu>
          </>
        ) : (
          <>
            트리가 도착했어요!
            <Menu onClick={toggleMenu}>
              <FaBars />
            </Menu>
          </>
        )}
      </Message>
      <SidebarModal isOpen={isMenuOpen} onClose={toggleMenu} nickname={nickname} />
      <TreeContainer ref={treeContainerRef}>
        {tree && (
          <TreeSlider>
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              const pagePosts = postsForPage(page);
              return (
                <TreeWrapper key={index}>
                  <TreeImage src={getImageUrl(tree, "trees")} alt="Tree" />
                  {point && (
                    <PointImage
                      src={getImageUrl(point, "points")}
                      alt="Point"
                    />
                  )}
                  {pagePosts.map((post, postIndex) => {
                    const position = getDecorationPosition(postIndex);
                    return (
                      <Decoration
                        key={post.id}
                        x={position.x}
                        y={position.y}
                        onClick={() => handleDecorationClick(post)}
                      >
                        <DecorationImage
                          src={getImageUrl(post.imgName, "posts")}
                          alt={post.imgName}
                        />
                        <SenderName>{post.nickname}</SenderName>
                      </Decoration>
                    );
                  })}
                </TreeWrapper>
              );
            })}
          </TreeSlider>
        )}
      </TreeContainer>
      <Pagination>
        <PageButton onClick={handlePrev}>{"<"}</PageButton>
        <span>{`${currentPage} / ${totalPages}`}</span>
        <PageButton onClick={handleNext}>{">"}</PageButton>
      </Pagination>
      <ButtonGroup>
        {isMyTree ? (
          <ActionButton onClick={handleShare}>
            <ShareIcon /> 내 트리 공유하기
          </ActionButton>
        ) : (
          <ActionButton onClick={handleDecorate}>
            트리 꾸며주기
          </ActionButton>
        )}
        <UserButton>
          <FaUsers size={24} />
        </UserButton>
      </ButtonGroup>

      {selectedPost && (
        <Modal onClick={() => setSelectedPost(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedPost(null)}>×</CloseButton>
            <LetterWritingCard>
              <Sender>From. {selectedPost.nickname}</Sender>
              <LetterContent>{selectedPost.content}</LetterContent>
              <PreviewDecorationImage
                src={getImageUrl(selectedPost.imgName, "posts")}
                alt="Decoration"
              />
            </LetterWritingCard>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Result;