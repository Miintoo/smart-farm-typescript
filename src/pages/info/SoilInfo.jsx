import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SensorInfoTemplate from '../../components/info/SensorInfoTemplate';
import instance from '../../utils/auth/interceptor';

export default function SoilInfo() {
  const [solid, setSolid] = useState(0);
  const [actuator, setActuator] = useState(0); // 0: 꺼짐, 1: 켜짐
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const deviceId = searchParams.get('deviceId');
  const deviceName = searchParams.get('deviceName');

  const infoContent = {
    good: ['51% 이상'],
    normal: ['25% ~ 50%']
  };

  const status = [];
  if (solid >= 51) {
    status[0] = 'good';
  } else if (solid >= 25 && solid <= 50) {
    status[0] = 'normal';
  } else {
    status[0] = 'bad';
  }

  useEffect(() => {
    // 일정 주기로 데이터 받아오기
    const intervalData = setInterval(async () => {
      try {
        const response = await instance.get('/devices/solid', {
          params: {
            deviceId
          }
        });

        const { deviceStatus, searchData } = response.data.data;
        setSolid(searchData[0].solid);
        setActuator(deviceStatus.pump);
      } catch (error) {
        Error('토양수분 값을 받아오지 못했습니다.');
      }
    }, 5000);

    // 인터벌 삭제
    return () => {
      clearInterval(intervalData);
    };
  }, []);

  useEffect(() => {
    // 최초 데이터 받아오기
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await instance.get('/devices/solid', {
          params: {
            deviceId
          }
        });
        const { deviceStatus, searchData } = response.data.data;
        setSolid(searchData[0].solid);
        setActuator(deviceStatus.pump);
      } catch (error) {
        Error('토양수분 값을 받아오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SensorInfoTemplate
      deviceId={deviceId}
      deviceName={deviceName}
      isDht="false"
      sensorName="토양수분"
      unit="%"
      sensorData={solid}
      infoContent={infoContent}
      actuatorStatus={actuator}
      actuatorType="펌프"
      status={status}
      setActuator={setActuator}
      loading={loading}
    />
  );
}
