import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import shortid from 'shortid';
import instance from '../../utils/auth/interceptor';
import Sidebar from '../../components/common/Sidebar';
import DeviceItem from '../../components/main/DeviceItem';
import ModalOneButton from '../../components/common/ModalOneButton';
import mediaQuery from '../../utils/breakPointUI';
import ModalAddDevice from '../../components/main/ModalAddDevice';

interface ModalState {
  errorAlert: boolean;
  addAlert: boolean;
}

interface UsersData {
  name: string;
  phone: string;
  email: string;
  deleted_at: string;
}

interface DeviceData {
  deviceId: number;
  name: string;
  status: number;
}

export default function Main(): JSX.Element {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UsersData | {}}>({});
  const [devices, setDevices] = useState<DeviceData[]>([]);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState<ModalState>({
    errorAlert: false,
    addAlert: false
  });

  const takeUser = async () => {
    try {
      const response = await instance.get('/users');
      setUsers(response.data);
    } catch (error) {
      setIsOpen((prev) => {
        return { ...prev, errorAlert: true };
      });
    }
  };

  const takeDevice = async () => {
    try {
      const { data: data } = await instance.get('/devices');
      setDevices([...devices, ...data]);
    } catch (error) {
      Error('디바이스를 불러올 수 없습니다.');
    }
  };

  useEffect(() => {
    takeUser();
    takeDevice();
  }, []);

  const handleErrorModalClick = () => {
    setIsOpen((prev) => {
      return { ...prev, errorAlert: false };
    });
    navigate('/');
  };

  const handleAddModalClick = () => {
    setIsOpen((prev) => {
      return { ...prev, addAlert: true };
    });
  };

  const hanldeAddModalClose = () => {
    setIsOpen((prev) => {
      return { ...prev, addAlert: false };
    });
  };

  const handleDeviceUpdate = (data) => {
    setDevices([...devices, data]);
  };

  const handleDeviceDelete = (deviceId) => {
    const newDeviceData = devices.filter((device) => device.deviceId !== deviceId);
    setDevices(newDeviceData);
  };

  const handleSidebarOpen = () => {
    setSideBarOpen(!sideBarOpen);
  };

  return (
    <>
      <Container className={sideBarOpen ? 'isActive' : ''}>
        <Sidebar users={users} onSidebarOpen={handleSidebarOpen} />
        <MainContent>
          {devices.map((item) => (
            <DeviceItem device={item} key={shortid.generate()} onDeleteDevice={handleDeviceDelete} />
          ))}
        </MainContent>
        <AddButton onClick={handleAddModalClick}>추가하기</AddButton>
      </Container>
      {isOpen.errorAlert && (
        <ModalOneButton title="세션이 만료되었습니다." buttonDescription="확인" onClick={handleErrorModalClick} />
      )}
      {isOpen.addAlert && <ModalAddDevice onClick={hanldeAddModalClose} onUpdateDevice={handleDeviceUpdate} />}
    </>
  );
}

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  overflow: scroll;
  overflow-x: hidden;
  width: 60vw;
  height: 75vh;
  border: 0.5rem solid #c6a692;

  &.isActive {
    overflow: hidden;
  }

  ${mediaQuery[2]} {
    width: 75vw;
  }

  ${mediaQuery[1]} {
    overflow: scroll;
    width: 90vw;
    border: none;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
`;

const AddButton = styled.button`
  position: sticky;
  top: 90%;
  right: 3rem;

  display: flex;
  align-items: center;
  height: 3.8rem;
  padding: 1.4rem 2rem;
  border: 0.1rem solid #c6a692;
  border-radius: 1.8rem;

  background-color: white;
  color: #c6a692;

  font-family: 'Jua';
  font-size: 1.4rem;

  &:hover {
    transition: 0.2s ease-out;
    scale: 1.08;
  }

  ${mediaQuery[1]} {
    position: absolute;
    right: 1rem;
    bottom: 0;
  }
`;
