import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import PropsTypes from 'prop-types';
import mediaQuery from '../../utils/breakPointUI';

export default function SensorMenu({ deviceId, deviceName }) {
  const linkList = ['dht', 'soil', 'lux'];
  const customLink = linkList.map((path) => `/${path}?deviceName=${deviceName}&deviceId=${deviceId}`);

  return (
    <NavWrapper>
      <UL>
        <Li>
          <NavLink to={customLink[0]}>온습도</NavLink>
        </Li>
        <Li>
          <NavLink to={customLink[1]}>토양수분</NavLink>
        </Li>
        <Li>
          <NavLink to={customLink[2]}>조도</NavLink>
        </Li>
      </UL>
    </NavWrapper>
  );
}

SensorMenu.PropsTypes = {
  deviceName: PropsTypes.string.isRequired,
  deviceId: PropsTypes.number.isRequired
};

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 12vh;
  margin: 0 auto;

  ${mediaQuery[1]} {
    height: 11vh;
  }
`;

const UL = styled.ul`
  display: flex;
  gap: 7vw;

  ${mediaQuery[3]} {
    gap: 6vw;
  }

  ${mediaQuery[1]} {
    gap: 11vw;
  }
`;

const Li = styled.li`
  > a {
    padding: 1rem 2rem 0.8rem;

    color: #c6a692;

    font-family: 'Jua', sans-serif;
    font-size: 2.6rem;
    line-height: 2.6rem;
    text-decoration: none;

    &.active {
      border-radius: 1.5rem;

      background: #c6a692;
      color: #ffffff;
    }
  }

  ${mediaQuery[1]} {
    > a {
      padding: 0.5rem 1rem 0.4rem;

      font-size: 1.7rem;
      line-height: 1.7rem;

      &.active {
        border-radius: 1rem;
      }
    }
  }
`;
