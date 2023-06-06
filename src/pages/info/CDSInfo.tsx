import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SensorInfoTemplate from '../../components/info/SensorInfoTemplate';
import instance from '../../utils/auth/interceptor';

export default function CDSInfo() {
  const [cds, setCDS] = useState(0);
  const [actuator, setActuator] = useState(0); // 0: 꺼짐, 1: 켜짐
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const deviceId = searchParams.get('deviceId');
  const deviceName = searchParams.get('deviceName');

  const infoContent = {
    good: ['1000lux 이상'],
    normal: ['500~999lux']
  };

  const status = [];
  if (cds >= 1000) {
    status[0] = 'good';
  } else if (cds >= 500 && cds <= 999) {
    status[0] = 'normal';
  } else {
    status[0] = 'bad';
  }

  useEffect(() => {
    // 일정 주기로 데이터 받아오기
    const intervalData = setInterval(async () => {
      try {
        const response = await instance.get('/devices/lux', {
          params: {
            deviceId
          }
        });

        const { deviceStatus, searchData } = response.data.data;

        setCDS(searchData[0].lux);
        setActuator(deviceStatus.led);
      } catch (error) {
        Error('조도 값을 받아오지 못했습니다.');
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
        const response = await instance.get('/devices/lux', {
          params: {
            deviceId
          }
        });
        const { deviceStatus, searchData } = response.data.data;

        setCDS(searchData[0].lux);
        setActuator(deviceStatus.led);
      } catch (error) {
        Error('조도 값을 받아오지 못했습니다.');
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
      sensorName="조도"
      unit="lux"
      sensorData={cds}
      infoContent={infoContent}
      actuatorStatus={actuator}
      actuatorType="led"
      status={status}
      setActuator={setActuator}
      isDht="false"
      loading={loading}
    />
  );
}
