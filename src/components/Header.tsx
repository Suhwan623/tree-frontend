import styled from "styled-components";
import React from "react";

const Title = styled.h1`
  font-family: 'Cafe24Ssurround', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: rgb(255, 255, 255);

  @media (min-width: 37.5rem) {
    font-size: 2rem;
    line-height: 2.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.25rem;
  }
`;

const Title2 = styled.h2`
 font-size: var(--cmt-typography-body-strong-font-size);
  font-weight: var(--cmt-typography-body-strong-font-weight);
  line-height: 2rem;
  font-family: 'Maplestory', sans-serif;
  color: #FFFFFF80 ;
  margin: 0;
`;

const HeaderContainer = styled.main`
    width: 100%;
    max-width: 37.5rem;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    align-items: center;
    margin: 0px auto;
    padding-top: 1rem;
    max-height: 89.5rem;
`;

const TreeContainer = styled.div`
  position: relative;
  margin-top: 1.2rem;
`;

const Photo1 = styled.img`
  width: 7.25rem;
`;

const Photo2 = styled.img`
    width: 5rem;
    animation: 1sease-in-out 0s infinite alternate none running animation-17vw6ex;
    position: absolute;
    top: -1rem;
    left: calc(50% - 2.5rem);
`;
const Header: React.FC = () => {
  return(
    <HeaderContainer>
      <Title>내 트리를 꾸며줘!</Title>
      <Title2>트리를 꾸미고 따뜻한 마음을 나눠요💝</Title2>
      <TreeContainer>
      <Photo1 src="/tree-teaser.png" alt="트리 이미지" />
      <Photo2 src="/tree-peak-twinkle.png" alt="트리 장식 이미지"/>
      </TreeContainer>
    </HeaderContainer>
  );
};

export default Header;
