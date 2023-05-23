import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import PropsTypes from 'prop-types';
import mediaQuery from '../../utils/breakPointUI';

export default function ModalOneButton({ title, buttonDescription, onClick, infoContent }) {
  const [isDht, setIsDht] = useState(false);

  useEffect(() => {
    if (title === '온습도') {
      setIsDht(true);
    }
  }, []);

  return (
    <>
      <Container>
        <ContentContainer>
          <Title>{title}</Title>
          {infoContent && (
            <StatusStandard>
              [ 상태 기준 ]
              {isDht ? (
                <Status>
                  <img alt="좋음상태" src="images/smile.png" />
                  <p>좋음 : </p>
                  <p>{infoContent.good[0]}</p>
                  <p>/</p>
                  <p>{infoContent.good[1]}</p>
                </Status>
              ) : (
                <Status>
                  <img alt="좋음상태" src="images/smile.png" />
                  <p>좋음 : </p>
                  <p>{infoContent.good[0]}</p>
                </Status>
              )}
              {isDht ? (
                <Status>
                  <img alt="보통상태" src="images/normal.png" />
                  <p>보통 : </p>
                  <p>{infoContent.normal[0]}</p>
                  <p>/</p>
                  <p>{infoContent.normal[1]}</p>
                </Status>
              ) : (
                <Status>
                  <img alt="보통상태" src="images/normal.png" />
                  <p>보통 : </p>
                  <p>{infoContent.normal[0]}</p>
                </Status>
              )}
              <Status>
                <img alt="나쁨상태" src="images/Bad.png" />
                <p>나쁨 : </p>
                <p>위 기준에 해당하지 않는 경우</p>
              </Status>
            </StatusStandard>
          )}

          <ButtonTitle onClick={onClick}>{buttonDescription}</ButtonTitle>
        </ContentContainer>
      </Container>
      <ModalBackdrop />
    </>
  );
}

ModalOneButton.propTypes = {
  title: PropsTypes.string.isRequired,
  buttonDescription: PropsTypes.string.isRequired,
  onClick: PropsTypes.func.isRequired,
  infoContent: PropsTypes.objectOf(PropsTypes.arrayOf(PropsTypes.string)).isRequired
};

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 50rem;
  height: 40vh;

  padding: 4rem 2rem;

  z-index: 3;

  border: 1rem solid #c6a692;
  border-radius: 1rem;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

  background-color: white;

  ${mediaQuery[1]} {
    width: 30rem;
    height: 28rem;
  }
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
`;

const Title = styled.h2`
  width: 80%;
  margin: 1rem auto 0;
  text-align: center;
  font-size: 2.6rem;
  font-family: 'Jua';
  color: #c6a692;

  ${mediaQuery[1]} {
    font-size: 1.8rem;
  }
`;

const StatusStandard = styled.div`
  width: 77%;
  margin: 2.5rem auto 3rem;

  color: #c6a692;

  font-size: 1.7rem;
  font-family: 'Jua';

  > :first-child {
    margin-top: 2.5rem;
  }

  ${mediaQuery[1]} {
    width: 100%;
    margin-left: 2rem;

    font-size: 1.5rem;
  }
`;

const Status = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 2rem 0 0 0;

  font-size: 1.5rem;

  > img {
    width: 2.5rem;
    height: 2.5rem;
    margin-top: -0.6rem;

    ${mediaQuery[1]} {
      width: 1.2rem;
      height: 1.2rem;
      margin-top: -0.2rem;
    }
  }
  > p {
    margin-left: 0.8rem;
  }
  > p:first-of-type {
    margin-left: 1rem;
  }

  ${mediaQuery[1]} {
    font-size: 1rem;
  }
`;

const ButtonTitle = styled.button`
  display: block;
  width: 10rem;
  margin: 3rem auto 0;
  padding-top: 0.4rem;

  border: 0.3rem solid #c6a692;
  border-radius: 3rem;

  font-size: 2rem;
  font-family: 'Jua';
  color: #c6a692;

  background-color: white;

  ${mediaQuery[1]} {
    width: 8rem;

    font-size: 1.5rem;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;
