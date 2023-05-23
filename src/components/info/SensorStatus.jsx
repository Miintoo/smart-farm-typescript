import React from 'react';
import styled from '@emotion/styled';
import PropsTypes from 'prop-types';
import mediaQuery from '../../utils/breakPointUI';

export default function SensorStatus({ status, sensorName }) {
  let index;
  if (status === 'good') {
    index = 0;
  } else if (status === 'normal') {
    index = 1;
  } else if (status === 'bad') {
    index = 2;
  }

  const statusList = [
    {
      imgUrl: 'images/smile.png',
      statusMessage: sensorName === '온도' || sensorName === '습도' ? `${sensorName} 좋음` : '좋음'
    },
    {
      imgUrl: 'images/normal.png',
      statusMessage: sensorName === '온도' || sensorName === '습도' ? `${sensorName} 보통` : '보통'
    },
    {
      imgUrl: 'images/Bad.png',
      statusMessage: sensorName === '온도' || sensorName === '습도' ? `${sensorName} 나쁨` : '나쁨'
    }
  ];

  return (
    <Status>
      <StatusImage alt={`${statusList[index]?.statusMessage} 이미지`} src={statusList[index]?.imgUrl} />
      <StatusMessage>{statusList[index]?.statusMessage}</StatusMessage>
    </Status>
  );
}

SensorStatus.PropsTypes = {
  sensorName: PropsTypes.string.isRequired,
  status: PropsTypes.string.isRequired
};

const Status = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 0.2rem solid #c6a692;
  border-radius: 1rem;
  width: 100%;
  height: 7rem;

  background: #ffffff;

  ${mediaQuery[3]} {
    height: 6rem;
  }

  ${mediaQuery[1]} {
    height: 5rem;
  }
`;

const StatusImage = styled.img`
  width: 4rem;
  height: 4rem;
  margin-left: 2rem;

  ${mediaQuery[1]} {
    width: 3rem;
    height: 3rem;
    margin-left: 1rem;
  }
`;

const StatusMessage = styled.p`
  margin: 0.3rem 0 0 1.8rem;

  color: #c6a692;

  font-family: 'Jua', sans-serif;
  font-size: 2.5rem;
  line-height: 2.3rem;

  ${mediaQuery[1]} {
    margin-left: 1rem;

    font-size: 1.5rem;
    line-height: 1.3rem;
  }
`;
