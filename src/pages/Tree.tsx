import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../api/axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #1a1a2e;
  color: #fff;
  padding: 2rem;
`;

const TabMenu = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TabButton = styled.button<{ $active?: boolean }>`
  padding: 1rem 2rem;
  border: none;
  border-radius: 1rem;
  background-color: ${(props) => (props.$active ? "#e05e6d" : "#444")};
  color: #fff;
  cursor: pointer;
  font-family: "Cafe24Ssurround", sans-serif;
  font-size: 1rem;
  font-weight: 700;

  &:hover {
    background-color: ${(props) => (props.$active ? "#d04e5c" : "#666")};
  }
`;

const Options = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const OptionButton = styled.button<{ selected?: boolean }>`
  width: 80px;
  height: 80px;
  border: 2px solid ${(props) => (props.selected ? "#e05e6d" : "#ccc")};
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: #e05e6d;
  }
`;

const Preview = styled.div`
  width: 300px;
  height: 340px;
  background-color: #2c2c3e;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 2rem;
  border-radius: 2rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  position: absolute;
`;

const BackImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  border-radius: 2rem;
`;

const PointImage = styled.img`
  max-width: 50px;
  max-height: 50px;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -100%);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  font-family: "Cafe24Ssurround", sans-serif;

  &.complete {
    background-color: #e05e6d;
    color: #fff;

    &:hover {
      background-color: #d04e5c;
    }
  }

  &.cancel {
    background-color: #666;
    color: #fff;

    &:hover {
      background-color: #444;
    }
  }
`;

const Tree: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"tree" | "background" | "point">("tree");
  const [selectedTree, setSelectedTree] = useState<string | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [treeOptions, setTreeOptions] = useState<string[]>([]);
  const [backgroundOptions, setBackgroundOptions] = useState<string[]>([]);
  const [pointOptions, setPointOptions] = useState<string[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const navigate = useNavigate();

  interface TypeToPath {
    tree: string;
    background: string;
    point: string;
  }

  const typeToPath: TypeToPath = {
    tree: "trees",
    background: "backs",
    point: "points",
  };

  const getImageUrl = (imgName: string, type: keyof TypeToPath) =>
    `https://api.ssdw.store/images/${typeToPath[type]}/${imgName}`;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchImages = async () => {
      try {
        const [treesRes, backsRes, pointsRes] = await Promise.all([
          customAxios.get("/api/image?type=trees", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          customAxios.get("/api/image?type=backs", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          customAxios.get("/api/image?type=points", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setTreeOptions(treesRes.data);
        setBackgroundOptions(backsRes.data);
        setPointOptions(pointsRes.data);
        console.log("Fetched Options:", { trees: treesRes.data, backs: backsRes.data, points: pointsRes.data });
      } catch (error) {
        console.error("이미지 목록 불러오기 실패:", error);
      }
    };

    const fetchUserConfig = async () => {
      try {
        const res = await customAxios.get("/api/tree/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { treeInfo } = res.data;
        console.log("User Config:", res.data);
        setSelectedBackground(treeInfo && treeInfo[0] ? treeInfo[0] : null); // 배경
        setSelectedTree(treeInfo && treeInfo[1] ? treeInfo[1] : null); // 트리
        setSelectedPoint(treeInfo && treeInfo[2] ? treeInfo[2] : null); // 포인트
      } catch (error) {
        console.error("사용자 설정 불러오기 실패:", error);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const res = await customAxios.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.message === "ok") {
          setNickname(res.data.nickname);
        } else {
          console.error("닉네임 가져오기 실패:", res.data.message);
        }
      } catch (error) {
        console.error("사용자 정보 불러오기 실패:", error);
      }
    };

    fetchImages();
    fetchUserConfig();
    fetchUserInfo();
  }, [navigate]);

  const fetchAssetId = async (imgName: string, type: string) => {
    try {
      const response = await customAxios.get(`/api/admin/asset?imgName=${imgName}&type=${type}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = response.data;
      if (data.error) {
        throw new Error(data.message);
      }
      return data.id as number;
    } catch (error) {
      console.error(`Asset ID 조회 실패 (${imgName}, ${type}):`);
      return null;
    }
  };

  const saveSelection = async () => {
    if (!accessToken) {
      alert("로그인이 필요합니다!");
      navigate("/login");
      return;
    }
    if (!selectedTree || !selectedBackground || !selectedPoint) {
      alert("모든 항목을 선택해주세요!");
      return;
    }

    const [backgroundId, treeId, pointId] = await Promise.all([
      fetchAssetId(selectedBackground, "backs"),
      fetchAssetId(selectedTree, "trees"),
      fetchAssetId(selectedPoint, "points"),
    ]);

    if (!backgroundId || !treeId || !pointId) {
      alert("유효한 에셋 ID를 찾을 수 없습니다!");
      return;
    }

    console.log("Sending data:", { background: backgroundId, tree: treeId, treePoint: pointId });
    await customAxios.post(
      "/api/tree",
      {
        background: backgroundId,
        tree: treeId,
        treePoint: pointId,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    console.log("설정 저장 성공");
    navigate("/result", {
      state: {
        background: selectedBackground,
        tree: selectedTree,
        point: selectedPoint,
        nickname,
      },
    });
  };

  return (
    <Container>
      <TabMenu>
        <TabButton $active={activeTab === "tree"} onClick={() => setActiveTab("tree")}>
          트리
        </TabButton>
        <TabButton $active={activeTab === "background"} onClick={() => setActiveTab("background")}>
          배경
        </TabButton>
        <TabButton $active={activeTab === "point"} onClick={() => setActiveTab("point")}>
          포인트
        </TabButton>
      </TabMenu>
      <Preview>
        {selectedBackground && (
          <BackImage
            src={getImageUrl(selectedBackground, "background")}
            alt="Background"
            style={{ zIndex: 1 }}
            onError={() => console.error("Background 이미지 로딩 실패")}
          />
        )}
        {selectedTree && (
          <PreviewImage
            src={getImageUrl(selectedTree, "tree")}
            alt="Tree"
            style={{ zIndex: 2 }}
            onError={() => console.error("Tree 이미지 로딩 실패")}
          />
        )}
        {selectedPoint && (
          <PointImage
            src={getImageUrl(selectedPoint, "point")}
            alt="Point"
            style={{ zIndex: 3 }}
            onError={() => console.error("Point 이미지 로딩 실패")}
          />
        )}
      </Preview>
      <Options>
        {activeTab === "tree" &&
          treeOptions.map((imgName) => (
            <OptionButton
              key={imgName}
              selected={selectedTree === imgName}
              onClick={() => setSelectedTree(imgName)}
            >
              <img src={getImageUrl(imgName, "tree")} alt={imgName} />
            </OptionButton>
          ))}
        {activeTab === "background" &&
          backgroundOptions.map((imgName) => (
            <OptionButton
              key={imgName}
              selected={selectedBackground === imgName}
              onClick={() => setSelectedBackground(imgName)}
            >
              <img src={getImageUrl(imgName, "background")} alt={imgName} />
            </OptionButton>
          ))}
        {activeTab === "point" &&
          pointOptions.map((imgName) => (
            <OptionButton
              key={imgName}
              selected={selectedPoint === imgName}
              onClick={() => setSelectedPoint(imgName)}
            >
              <img src={getImageUrl(imgName, "point")} alt={imgName} />
            </OptionButton>
          ))}
      </Options>
      <ButtonGroup>
        <ActionButton className="cancel" onClick={() => {
          setSelectedTree(null);
          setSelectedBackground(null);
          setSelectedPoint(null);
        }}>
          취소
        </ActionButton>
        <ActionButton className="complete" onClick={saveSelection}>
          완료
        </ActionButton>
      </ButtonGroup>
    </Container>
  );
};

export default Tree;