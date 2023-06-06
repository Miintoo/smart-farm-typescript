import React from 'react';
import styled from '@emotion/styled';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import mediaQuery from '../../utils/breakPointUI';

export default function MyPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const userName = searchParams.get('userName');

  const handleBackButton = () => {
    navigate('/main');
  };

  return (
    <Container>
      <Title>회원 정보</Title>
      <InfoContainer>
        <BackButton src="/images/rightArrow.png" alt="뒤로가기 버튼" onClick={handleBackButton} />
        <InfoContent>
          <ProfileContainer>
            <ProfileImage src="/images/profile.jpg" alt="프로파일 이미지 입니다." />
            <ProfileName>{userName} 농부</ProfileName>
          </ProfileContainer>
          <ButtonList>
            <li>
              <Button type="button" onClick={() => navigate(`/change/password${location.search}`)}>
                비밀번호 변경
              </Button>
            </li>
            <li>
              <Button type="button" onClick={() => navigate(`/change/userinfo${location.search}`)}>
                회원정보 수정
              </Button>
            </li>
            <li>
              <Button type="button" onClick={() => navigate(`/signout${location.search}`)}>
                회원탈퇴
              </Button>
            </li>
          </ButtonList>
        </InfoContent>
      </InfoContainer>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 60vw;
  height: 75vh;
  border: 0.4rem solid #dfd2ca;

  ${mediaQuery[2]} {
    width: 75vw;
  }

  ${mediaQuery[1]} {
    width: 90vw;
  }

  ${mediaQuery[0]} {
    width: 100%;
    border: none;
  }
`;

const BackButton = styled.img`
  position: absolute;
  top: 1.5rem;
  left: 1rem;
  transform: scaleX(-1);

  cursor: pointer;

  &:hover {
    transition: all 0.2s ease-out;
    opacity: 0.6;
  }
`;

const Title = styled.h2`
  height: 7rem;
  padding-left: 2.2rem;

  background-color: #dfd2ca;
  color: #8d8c8c;

  line-height: 7rem;
  font-family: 'Jua';
  font-size: 3.3rem;

  ${mediaQuery[1]} {
    font-size: 2.6rem;
  }
`;

const InfoContainer = styled.div`
  position: relative;
  width: 90%;
  height: 80%;
  margin: 3.5rem auto 0;
  border: 0.7rem solid #dfd2ca;

  ${mediaQuery[0]} {
    border: none;
  }
`;

const InfoContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 80%;
  height: 66%;

  ${mediaQuery[2]} {
    width: 100%;
  }

  ${mediaQuery[1]} {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${mediaQuery[0]} {
    flex-direction: column;
  }
`;

const ProfileContainer = styled.div`
  ${mediaQuery[1]} {
    margin-top: 3rem;
    margin-right: 4.5rem;
  }

  ${mediaQuery[0]} {
    margin: 0;
  }
`;

const ProfileImage = styled.img`
  display: block;
  width: 12rem;
  height: 12rem;
  margin: auto;
  border-radius: 50%;

  background-color: white;

  opacity: 0.9;
`;

const ProfileName = styled.span`
  display: block;
  margin: 3rem 0 5rem 0;

  color: #9f8473;

  font-family: 'Jua';
  font-size: 3.3rem;
  text-align: center;

  ${mediaQuery[1]} {
    font-size: 2.8rem;
  }
`;

const ButtonList = styled.ul`
  display: flex;
  justify-content: space-evenly;

  ${mediaQuery[1]} {
    flex-direction: column;
  }

  ${mediaQuery[0]} {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.button`
  width: 14rem;
  height: 4.4rem;
  border: 0.3rem solid #c6a692;
  border-radius: 1.5rem;

  background-color: white;
  color: #c6a692;

  font-family: 'Jua';
  font-size: 2.1rem;
  line-height: 4rem;

  &:hover {
    transition: 0.4s ease-out;
    scale: 1.1;
  }

  ${mediaQuery[1]} {
    width: 27vw;
    margin-bottom: 2.4rem;

    font-size: 1.5rem;
  }

  ${mediaQuery[0]} {
    width: 14rem;
    margin-bottom: 1rem;
  }
`;
