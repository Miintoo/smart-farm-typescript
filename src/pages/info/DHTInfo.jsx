import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import instance from '../../utils/auth/interceptor';
import SensorInfoTemplate from '../../components/info/SensorInfoTemplate';

export default function DHTInfo() {
  const [temp, setTemp] = useState(0);
  const [humid, setHumid] = useState(0);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const deviceId = searchParams.get('deviceId');
  const deviceName = searchParams.get('deviceName');

  const infoContent = {
    good: ['15~20도', '75~85%'],
    normal: ['10~14도, 21~25도', '65~74%, 86~95%']
  };

  const status = [];
  if (temp >= 15 && temp <= 20) {
    status[0] = 'good';
  } else if (temp >= 10 && temp <= 14) {
    status[0] = 'normal';
  } else if (temp >= 21 && temp <= 25) {
    status[0] = 'normal';
  } else {
    status[0] = 'bad';
  }

  if (humid >= 75 && humid <= 85) {
    status[1] = 'good';
  } else if (humid >= 65 && humid <= 74) {
    status[1] = 'normal';
  } else if (humid >= 86 && humid <= 95) {
    status[1] = 'normal';
  } else {
    status[1] = 'bad';
  }

  useEffect(() => {
    // 일정 주기로 데이터 받아오기
    const intervalData = setInterval(async () => {
      try {
        const response = await instance.get('/devices/dht', {
          params: {
            deviceId
          }
        });
        const { searchData } = response.data.data;

        setTemp(searchData[0].temperature);
        setHumid(searchData[0].humidity);
      } catch (error) {
        Error('온습도 값을 받아오지 못했습니다.');
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
        const response = await instance.get('/devices/dht', {
          params: {
            deviceId
          }
        });
        const { searchData } = response.data.data;
        setTemp(searchData[0].temperature);
        setHumid(searchData[0].humidity);
      } catch (error) {
        Error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SensorInfoTemplate
      deviceName={deviceName}
      deviceId={deviceId}
      isDht="true"
      sensorName="온습도"
      unit={['º', '%']}
      sensorData={[temp, humid]}
      infoContent={infoContent}
      status={status}
      loading={loading}
    />
  );
}
