import React from 'react';
import styled from '@emotion/styled';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import PropsTypes from 'prop-types';
import mediaQuery from '../../utils/breakPointUI';

ChartJS.register(ArcElement);
export default function SensorInfo({ sensorData, sensorName, unit, status }) {
  let gaugeColor = '#ced4da';

  if (status === 'good') {
    gaugeColor = '#60B044';
  } else if (status === 'normal') {
    gaugeColor = '#F97600';
  } else {
    gaugeColor = '#FF0000';
  }

  let maxValue = 100;
  let minValue = 0;
  if (sensorName === '온도') {
    minValue = -20;
    maxValue = 50;
  } else if (sensorName === '조도') {
    maxValue = 1500;
  }

  const sensorValue = sensorData - minValue;

  const data = {
    labels: '',
    datasets: [
      {
        label: `${sensorName}`,
        data: [sensorValue, maxValue - minValue - sensorValue],
        backgroundColor: [gaugeColor, '#ced4da'],
        borderWidth: 1
      }
    ]
  };

  const DhtProps = sensorName === '온도' || sensorName === '습도' ? { isDht: true } : {};

  // chart 가운데, 최소, 최대 text 구현
  const deviceValue = {
    id: 'deviceValue',
    beforeDatasetsDraw(chart) {
      const {
        ctx,
        chartArea: { left, right }
      } = chart;
      const chartData = chart.data;

      ctx.save();

      if (window.innerWidth <= 360) {
        ctx.font = 'bold 1rem sans-serif';
      } else if (window.innerWidth <= 500) {
        ctx.font = 'bold 1.3rem sans-serif';
      } else {
        ctx.font = 'bold 1.5rem sans-serif';
      }
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillText(
        `${chartData.datasets[0].label}`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y / 1.3
      );
      ctx.fillText(
        `${chartData.datasets[0].data[0] + minValue}${unit}`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y / 1.08
      );

      function labels(text, alignment, position) {
        ctx.font = '1rem sans-serif';
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'top';
        ctx.textAlign = alignment;
        ctx.fillText(text, position, chart.getDatasetMeta(0).data[0].y + 5);
      }

      labels(minValue, 'left', left + 2);
      labels(maxValue, 'right', right - 2);
    }
  };

  const options = {
    type: 'doughnut',
    data,
    maintainAspectRatio: false, // 크기가 조정될 때 원본 캔버스의 방향 비율 유지 x
    rotation: -90, // -90도 부터 그래프 시작
    circumference: 180, // 180도만큼 보여줌
    cutout: '55%', // 차트의 굵기 조정(값이 클수록 좁고, 작을수록 넓음)
    responsive: true, // 차트 반응형
    animation: { animateRotate: false }, // 차트가 시계방향으로 그리면서 나오는 애니메이션 제거
    plugins: {
      tooltip: {
        enabled: false // tooltip 사용 x
      }
    }
  };

  return (
    <Wrapper {...DhtProps}>
      <Doughnut data={data} options={options} plugins={[deviceValue]} />
    </Wrapper>
  );
}

SensorInfo.PropsTypes = {
  sensorName: PropsTypes.string.isRequired,
  sensorData: PropsTypes.number.isRequired,
  unit: PropsTypes.string.isRequired,
  status: PropsTypes.string.isRequired
};

const Wrapper = styled.div`
  width: ${(props) => (props.isDht ? '20rem' : '24rem')};
  height: ${(props) => (props.isDht ? '18rem' : '21rem')};

  ${mediaQuery[3]} {
    width: ${(props) => (props.isDht ? '18rem' : '21rem')};
    height: ${(props) => (props.isDht ? '15rem' : '17rem')};
  }

  ${mediaQuery[1]} {
    width: ${(props) => (props.isDht ? '15rem' : '17rem')};
    height: ${(props) => (props.isDht ? '12rem' : '14rem')};
  }

  ${mediaQuery[0]} {
    width: ${(props) => (props.isDht ? '12rem' : '14rem')};
    height: ${(props) => (props.isDht ? '10rem' : '10rem')};
  }
`;
