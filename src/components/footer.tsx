import styled from "styled-components";
import React from "react";

const MainLogo = styled.img`
  width: 3.375rem;
`;

const FooterContainer = styled.footer`
  width: 100%;
  height: 15rem;
  margin: 0 auto;
  padding: 1.25rem 1rem;
  background: linear-gradient(rgba(0, 0, 0, 0) 17.02%, rgb(0, 0, 0) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1rem;
  position: relative;
  max-width: 47.7rem;
  bottom: 0;
  margin-top: 6.6rem;
`;

const Line = styled.hr`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
`;

const ListUl = styled.ul`
  display: flex;
  padding: 0;
  list-style: none;
  margin : 0;
`;

const Logo1 = styled.a`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-image: url(/insta.png);
  background-size: cover;
`;

const Logo2 = styled.a`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-image: url(/twitter.png);
  background-size: cover;
  margin-left: 1rem;
`;

const Ad = styled.small`
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--cmt-color-white);
  font-family: 'Pretendard', sans-serif;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <MainLogo src="/logo.png" title="로고" />
      <Line />
      <ListUl>
        <li>
          <Logo1
            href="https://instagram.com/santafive_official"
            target="_blank"
            title="Santafive 인스타그램 링크"
          />
          <Logo2
            href="https://twitter.com/santafive_S2"
            target="_blank"
            title="Santafive X(구 트위터) 링크"
          />
        </li>
      </ListUl>
      <Ad>
        광고 문의: santafive.ad@gmail.com
      <br />
        Copyright ©santafive. All rights reserved.
      </Ad>
    </FooterContainer>
  );
};

export default Footer;
