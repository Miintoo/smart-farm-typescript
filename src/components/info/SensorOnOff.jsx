import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropsTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import mediaQuery from '../../utils/breakPointUI';
import instance from '../../utils/auth/interceptor';

export default function SensorOnOff({ actuatorType, actuatorStatus, setActuator }) {
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const deviceId = searchParams.get('deviceId');
  const onOffStatus = [
    {
      imgUrl: 'images/Off.png',
      onOffMessage: `${actuatorType} 꺼짐`
    },
    {
      imgUrl: 'images/On.png',
      onOffMessage: `${actuatorType} 켜짐`
    }
  ];

  const sensor = actuatorType === '펌프' ? 'solid' : 'lux';

  const handleActuator = async () => {
    try {
      setLoading(true);
      const response = await instance.post(`/devices/${sensor}`, null, {
        params: {
          deviceId,
          active: Number(!actuatorStatus)
        }
      });

      if (sensor === 'solid') {
        const { pump } = response.data.data;
        setActuator(pump);
      } else {
        const { led } = response.data.data;
        setActuator(led);
      }
    } catch (error) {
      Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {loading ? (
        <Status>
          <BeatLoader className="loadingStatus" color="#c6a692" size="0.7rem" loading={loading} />
        </Status>
      ) : (
        <Status onClick={handleActuator}>
          <StatusImage
            alt={`${onOffStatus[actuatorStatus]?.onOffMessage} 이미지`}
            src={onOffStatus[actuatorStatus]?.imgUrl}
          />
          <StatusMessage isActive={actuatorStatus}>{onOffStatus[actuatorStatus]?.onOffMessage}</StatusMessage>
        </Status>
      )}
    </Container>
  );
}

SensorOnOff.PropsTypes = {
  actuatorType: PropsTypes.string.isRequired,
  actuatorStatus: PropsTypes.number.isRequired,
  setActuator: PropsTypes.func.isRequired
};

const Container = styled.div`
  width: 100%;
`;

const Status = styled.button`
  position: relative;

  display: flex;
  align-items: center;
  border: 0.2rem solid #c6a692;
  border-radius: 1rem;
  box-sizing: border-box;
  width: 100%;
  height: 7rem;

  background: #ffffff;

  cursor: pointer;

  > .loadingStatus {
    margin: 0 auto;
    ${mediaQuery[1]} {
      margin-left: 1rem;
    }
  }

  ${mediaQuery[3]} {
    height: 6rem;
  }

  ${mediaQuery[1]} {
    height: 5rem;
  }
`;

const StatusImage = styled.img`
  width: 4.4rem;
  height: 4rem;
  margin-left: 2rem;

  ${mediaQuery[1]} {
    width: 3.3rem;
    height: 3rem;
    margin-left: 0.3rem;
  }
`;

const StatusMessage = styled.p`
  margin: 0.2rem 0 0 1.8rem;

  color: ${(props) => (props.isActive ? '#c6a692' : '#A9A8A8')};

  font-family: 'Jua', sans-serif;
  font-size: 2.5rem;
  line-height: 2.3rem;

  ${mediaQuery[1]} {
    margin: 0.2rem 0 0 0.5rem;

    font-size: 1.5rem;
    line-height: 1.3rem;
  }
`;
