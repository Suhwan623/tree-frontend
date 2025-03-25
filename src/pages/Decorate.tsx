import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { customAxios } from "../api/axios";

interface DecorationItemProps {
    isSelected: boolean;
    onClick: () => void;
    children: React.ReactNode; // children 추가
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1a2e;
  color: #fff;
  min-height: 100vh;
  padding: 2rem;
  font-family: "Pretendard", sans-serif;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;

  /* 닉네임에 빨간색 적용 */
  span {
    color: #ff9e81;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const DecorationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StyledDecorationItem = styled.div<{ $isSelected: boolean }>`
  width: 100px;
  height: 100px;
  background-color: #2a2a3e;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 3px solid ${(props) => (props.$isSelected ? "#00ffcc" : "transparent")};
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #00ffcc;
  }
`;

const DecorationItem: React.FC<DecorationItemProps> = ({ isSelected, onClick, children }) => {
    return (
        <StyledDecorationItem $isSelected={isSelected} onClick={onClick}>
            {children}
        </StyledDecorationItem>
    );
};

const DecorationImage = styled.img`
  width: 80%;
  height: 80%;
  object-fit: contain;
`;

const LetterWritingCard = styled.div`
  background-color: rgba(171, 121, 84, 1);
  border: 2px solid #8b5a2b;
  border-radius: 1rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 24rem;
  position: relative;
  margin: 0.375rem;
  margin-bottom: 1rem;
  box-shadow: 0 0 0 0.1875rem #ffffff;
  display: flex;
  flex-direction: column;
`;

const LetterWritingInput = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 0.5rem;
  border: none;
  background: transparent;
  color: #fff;
  font-family: "Pretendard", sans-serif;
  font-size: 1rem;
  resize: none;
  outline: none;
`;

const Sender = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const PreviewDecorationImage = styled.img`
  width: 60px;
  height: 60px;
  position: absolute;
  top: -30px;
  right: 10px;
`;

const CharCount = styled.p`
  font-size: 0.9rem;
  color: #fff;
  align-self: flex-end;
  margin-top: 0.5rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  margin-left: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 20rem;
`;

const NextButton = styled.button`
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  max-width: 20rem;
  height: 3rem;
  border-radius: 1rem;
  color: #fff;
  background-color: #54596d;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);

  &:hover {
    background-color: #444;
  }

  &:disabled {
    background-color: #777;
    cursor: not-allowed;
  }
`;

const PrevButton = styled.button`
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  height: 3rem;
  border-radius: 1rem;
  color: #fff;
  background-color: #777;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #666;
  }
`;

const SubmitButton = styled.button`
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  height: 3rem;
  border-radius: 1rem;
  color: #fff;
  background-color: #a33b3b;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #8b2f2f;
  }
`;

interface DecorationSelectionProps {
    decorations: string[];
    selectedDecoration: string | null;
    onDecorationSelect: (decorationName: string) => void;
    onNext: () => void;
}

const DecorationSelection: React.FC<DecorationSelectionProps> = ({
    decorations,
    selectedDecoration,
    onDecorationSelect,
    onNext,
}) => {
    const getImageUrl = (imgName: string) => `https://api.ssdw.store/images/posts/${imgName}`;

    return (
        <>
            <Title>트리 장식을 골라주세요</Title>
            <DecorationGrid>
                {decorations.map((decoration) => (
                    <DecorationItem
                        key={decoration}
                        isSelected={selectedDecoration === decoration}
                        onClick={() => onDecorationSelect(decoration)}
                    >
                        <DecorationImage src={getImageUrl(decoration)} alt={decoration} />
                    </DecorationItem>
                ))}
            </DecorationGrid>
            <NextButton
                onClick={onNext}
                disabled={!selectedDecoration}
            >
                다음으로
            </NextButton>
        </>
    );
};

interface LetterWritingProps {
    selectedDecoration: string;
    letterContent: string;
    senderName: string;
    receiverNickname: string;
    onLetterChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onPrev: () => void;
    onSubmit: () => void;
}

const LetterWriting: React.FC<LetterWritingProps> = ({
    selectedDecoration,
    letterContent,
    senderName,
    receiverNickname,
    onLetterChange,
    onPrev,
    onSubmit,
}) => {
    const [isPrivate, setIsPrivate] = useState(false);
    const getImageUrl = (imgName: string) => `https://api.ssdw.store/images/posts/${imgName}`;

    return (
        <>
            <Title>
                <span>{receiverNickname}</span>님에게
            </Title>
            <Subtitle>따뜻한 메시지를 남겨주세요</Subtitle>
            <LetterWritingCard>
                <Sender>
                    From. {senderName.length > 8 ? senderName.slice(0, 8) : senderName} (최대 8자)
                </Sender>
                <LetterWritingInput
                    value={letterContent}
                    onChange={onLetterChange}
                    placeholder="따뜻한 메시지를 적어주세요..."
                />
                <PreviewDecorationImage src={getImageUrl(selectedDecoration)} alt="Decoration" />
                <CharCount>{letterContent.length} / 850</CharCount>
            </LetterWritingCard>
            <CheckboxContainer>
                <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                />
                <CheckboxLabel>트리 주인에게만 보여줄래요 (비공개)</CheckboxLabel>
            </CheckboxContainer>
            <ButtonGroup>
                <PrevButton onClick={onPrev}>이전</PrevButton>
                <SubmitButton onClick={onSubmit} disabled={!letterContent}>
                    메시지 남기기
                </SubmitButton>
            </ButtonGroup>
        </>
    );
};

const Decorate: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [decorations, setDecorations] = useState<string[]>([]);
    const [selectedDecoration, setSelectedDecoration] = useState<string | null>(null);
    const [letterContent, setLetterContent] = useState<string>("");
    const [senderName, setSenderName] = useState<string | null>(null);
    const [receiverNickname, setReceiverNickname] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [step, setStep] = useState<"select" | "write">("select");

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
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
                setSenderName(userRes.data.nickname);

                const treeRes = await customAxios.get(id ? `/api/tree/${id}` : "/api/tree/my", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const { nickname: treeNickname } = treeRes.data;
                setReceiverNickname(treeNickname || userRes.data.nickname);

                const response = await customAxios.get("/api/image?type=posts", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDecorations(response.data);
            } catch (error) {
                console.error("데이터 로드 실패:", error);
                alert("데이터를 불러오지 못했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [id, navigate]);

    const handleDecorationSelect = (decorationName: string) => {
        setSelectedDecoration(decorationName);
    };

    const handleLetterChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const content = e.target.value;
        if (content.length <= 850) {
            setLetterContent(content);
        }
    };

    const handleNextFromSelect = () => {
        setStep("write");
    };

    const handlePrevFromWrite = () => {
        setStep("select");
    };

    const handleSubmit = async () => {
        if (!selectedDecoration || !letterContent || !id || !senderName) return;

        const token = localStorage.getItem("accessToken");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            await customAxios.post(
                `/api/post/${id}`,
                {
                    content: letterContent,
                    imgName: selectedDecoration,
                    senderName: senderName,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            navigate(`/result/${id}`);
        } catch (error) {
            console.error("게시물 생성 실패:", error);
            alert("게시물 생성에 실패했습니다.");
        }
    };

    return (
        <Container>
            {isLoading ? (
                <div>로딩 중...</div>
            ) : step === "select" ? (
                <DecorationSelection
                    decorations={decorations}
                    selectedDecoration={selectedDecoration}
                    onDecorationSelect={handleDecorationSelect}
                    onNext={handleNextFromSelect}
                />
            ) : (
                <LetterWriting
                    selectedDecoration={selectedDecoration!}
                    letterContent={letterContent}
                    senderName={senderName!}
                    receiverNickname={receiverNickname!}
                    onLetterChange={handleLetterChange}
                    onPrev={handlePrevFromWrite}
                    onSubmit={handleSubmit}
                />
            )}
        </Container>
    );
};

export default Decorate;