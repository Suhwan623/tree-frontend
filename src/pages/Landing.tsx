import React from 'react';
import styled from 'styled-components';
import Footer from '../components/footer';
import Header from '../components/Header';
import Mid from '../components/Mid';

const LandingContainer = styled.div`
  background-image: url('/background-teaser.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; 
  width: 794px;
  height: 810px;
  margin: 0 auto;
`;

const Landing: React.FC = () => {
  return (
    <LandingContainer>
      <Header />
      <Mid />
      <Footer />
    </LandingContainer>
  );
};

export default Landing;
