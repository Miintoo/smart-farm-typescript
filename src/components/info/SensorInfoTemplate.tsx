import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import PropsTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';
import instance from '../../utils/auth/interceptor';
import Sidebar from '../common/Sidebar';
import ModalOneButton from '../common/ModalOneButton';
import SensorMenu from './SensorMenu';
import SensorStatus from './SensorStatus';
import SensorOnOff from './SensorOnOff';
import SensorInfo from './SensorInfo';
import mediaQuery from '../../utils/breakPointUI';

export default function SensorInfoTemplate({
  deviceName,
  deviceId,
  isDht,
  actuatorType,
  actuatorStatus,
  setActuator,
  sensorName,
  sensorData,
  unit,
  infoContent,
  status,
  loading
}) {
  const navigate = useNavigate();
  const [users, setUsers] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    const takeUser = async () => {
      try {
        const usersData = await instance.get('/users');
        setUsers(usersData.data);
      } catch (error) {
        setIsOpen(true);
      }
    };

    takeUser();
  }, []);

  const handleModalClick = () => {
    setIsOpen(false);
    navigate('/');
  };

  return (
    <>
      <Container>
        <Sidebar users={users} />
        <ContentWrapper>
          <SensorMenu deviceId={deviceId} deviceName={deviceName} />
          <DeviceInfoWrapper>
            <DeviceName>디바이스: {deviceName}</DeviceName>
            {loading ? (
              <LoadingSpinner>
                <ClipLoader className="loadingStatus" color="#c6a692" size="3rem" loading={loading} margin="auto" />
              </LoadingSpinner>
            ) : (
              <>
                <SensorStatusWrapper>
                  {isDht === 'true' ? (
                    <>
                      <SensorStatus status={status[0]} sensorName="온도" />
                      <SensorStatus status={status[1]} sensorName="습도" />
                    </>
                  ) : (
                    <>
                      <SensorStatus status={status[0]} sensorName={sensorName} />
                      <SensorOnOff
                        actuatorType={actuatorType}
                        actuatorStatus={actuatorStatus}
                        setActuator={setActuator}
                      />
                    </>
                  )}
                </SensorStatusWrapper>
                <SensorInfoWrapper>
                  <InfoModal>
                    <span>{sensorName} 정보</span>
                    <InfoImage
                      alt={`${sensorName} 정보`}
                      src="/images/question.png"
                      onClick={() => setInfoOpen(!infoOpen)}
                    />
                  </InfoModal>
                  <GraphWrapper>
                    {isDht === 'true' ? (
                      <>
                        <SensorInfo sensorData={sensorData[0]} sensorName="온도" unit={unit[0]} status={status[0]} />
                        <SensorInfo sensorData={sensorData[1]} sensorName="습도" unit={unit[1]} status={status[1]} />
                      </>
                    ) : (
                      <SensorInfo sensorData={sensorData} sensorName={sensorName} unit={unit} status={status[0]} />
                    )}
                  </GraphWrapper>
                </SensorInfoWrapper>
              </>
            )}
          </DeviceInfoWrapper>
        </ContentWrapper>
      </Container>
      {isOpen && (
        <ModalOneButton title="인가된 사용자가 아닙니다." buttonDescription="확인" onClick={handleModalClick} />
      )}
      {infoOpen && (
        <ModalOneButton
          title={sensorName}
          buttonDescription="확인"
          onClick={() => setInfoOpen(!infoOpen)}
          infoContent={infoContent}
        />
      )}
    </>
  );
}

SensorInfoTemplate.PropsTypes = {
  deviceName: PropsTypes.string.isRequired,
  deviceId: PropsTypes.number.isRequired,
  isDht: PropsTypes.bool.isRequired,
  actuatorType: PropsTypes.string,
  actuatorStatus: PropsTypes.number,
  setActuator: PropsTypes.func,
  sensorName: PropsTypes.string.isRequired,
  sensorData: PropsTypes.number.isRequired,
  unit: PropsTypes.oneOfType([PropsTypes.string, PropsTypes.arrayOf(PropsTypes.string)]).isRequired,
  infoContent: PropsTypes.objectOf(PropsTypes.arrayOf(PropsTypes.string)).isRequired,
  status: PropsTypes.arrayOf(PropsTypes.string).isRequired,
  loading: PropsTypes.bool.isRequired
};

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  width: 60vw;
  height: 75vh;
  border: 0.5rem solid #c6a692;

  ${mediaQuery[3]} {
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

const ContentWrapper = styled.div`
  position: relative;

  flex: 1;
  width: 100%;
`;

const DeviceInfoWrapper = styled.div`
  position: relative;

  width: 90%;
  height: 60rem;
  max-height: calc(63vh - 3rem);
  border-radius: 1rem;
  margin: 0 auto;

  background: #f0e7e2;

  ${mediaQuery[3]} {
    height: 53rem;
  }

  ${mediaQuery[1]} {
    height: 60rem;
  }
`;

const DeviceName = styled.p`
  position: absolute;

  margin: 2rem 0 0 2.6rem;

  color: #c6a692;

  font-family: 'Jua', sans-serif;
  font-size: 2rem;
  line-height: 1.8rem;

  ${mediaQuery[1]} {
    margin: 1.5rem 0 0 2.6rem;

    font-size: 1.3rem;
    line-height: 1.8rem;
  }
`;

const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SensorStatusWrapper = styled.div`
  position: absolute;

  display: flex;
  width: calc(100% - 4.8rem);
  margin: 5.6rem 2.4rem;
  gap: 1.6rem;

  ${mediaQuery[1]} {
    flex-direction: column;
    margin: 4.5rem 2.4rem;
    gap: 0.5rem;
  }
`;

const SensorInfoWrapper = styled.div`
  position: absolute;

  width: calc(100% - 4.8rem);
  height: 53rem;
  max-height: calc(100% - 16rem);
  border: 0.2rem solid #c6a692;
  border-radius: 1rem;
  margin: 14rem 0 0 2.4rem;

  background: #ffffff;

  ${mediaQuery[3]} {
    height: 38rem;
    margin: 12.5rem 0 0 2.4rem;
  }

  ${mediaQuery[1]} {
    height: 50rem;
    max-height: calc(63vh - 20.5rem);
    margin-top: 15.6rem;
  }
`;

const InfoModal = styled.div`
  position: absolute;
  right: 5rem;

  margin-top: 1.5rem;

  color: #c6a692;

  > span {
    font-family: 'Jua', sans-serif;
    font-size: 1.5rem;
    line-height: 2.5rem;

    ${mediaQuery[1]} {
      font-size: 1.3rem;
      line-height: 1.3rem;
    }
  }
`;

const InfoImage = styled.img`
  position: absolute;

  width: 1.9rem;
  height: 1.8rem;
  margin: 0.2rem 0 0 1rem;
  border: none;

  background: #fff;

  cursor: pointer;

  ${mediaQuery[1]} {
    width: 1.7rem;
    height: 1.6rem;
    margin: -0.25rem 0 0 1.1rem;
  }
`;

const GraphWrapper = styled.div`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: space-around;
  width: calc(100% - 4.8rem);
  height: 80%;
  margin: 3.5rem 0 0 2.4rem;

  ${mediaQuery[1]} {
    flex-direction: column;
    justify-content: space-evenly;
  }
`;
