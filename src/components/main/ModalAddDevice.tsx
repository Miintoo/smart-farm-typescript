import React from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import PropsTypes from 'prop-types';
import validation from '../../utils/validation';
import instance from '../../utils/auth/interceptor';
import mediaQuery from '../../utils/breakPointUI';

export default function ModalAddDevice({ onClick, onUpdateDevice }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors }
  } = useForm({ mode: 'onBlur' });

  const onSubmit = async (value) => {
    try {
      const {
        data: { data }
      } = await instance.post('/devices', value);
      onClick();
      onUpdateDevice(data);
    } catch (error) {
      Error('제품이 정상적으로 등록되지 않았습니다.');
    }
  };

  return (
    <>
      <Container>
        <CancelButton src="/images/cancel.png" alt="지우기버튼" onClick={onClick} />
        <ContentContainer>
          <Title>추가 제품의 정보를 입력해주세요!</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <DeviceInput
              type="text"
              placeholder="디바이스 이름"
              name="name"
              aria-invalid={!isDirty ? undefined : errors.name ? 'true' : 'false'}
              {...register('name', validation.deviceName)}
            />
            {errors.name && <AlertSmall>{errors.name.message}</AlertSmall>}

            <DeviceInput
              type="text"
              placeholder="시리얼 번호"
              name="deviceId"
              aria-invalid={!isDirty ? undefined : errors.deviceId ? 'true' : 'false'}
              {...register('deviceId', validation.id)}
            />
            {errors.deviceId && <AlertSmall>{errors.deviceId.message}</AlertSmall>}

            <ButtonTitle type="submit" disabled={isSubmitting}>
              입력
            </ButtonTitle>
          </Form>
        </ContentContainer>
      </Container>
      <ModalBackdrop />
    </>
  );
}

ModalAddDevice.propTypes = {
  onClick: PropsTypes.func.isRequired,
  onUpdateDevice: PropsTypes.func.isRequired
};

const Container = styled.div`
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 30vw;
  height: 40vh;
  padding: 0rem 2rem;
  border: 1rem solid #c6a692;
  border-radius: 1rem;

  background-color: white;

  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

  ${mediaQuery[2]} {
    width: 52vw;
  }

  ${mediaQuery[1]} {
    width: 28rem;
  }

  ${mediaQuery[0]} {
    width: 90vw;
  }
`;

const CancelButton = styled.img`
  position: absolute;
  top: 0.3rem;
  right: 0.6rem;

  width: 2rem;
  height: 3rem;

  cursor: pointer;

  &:hover {
    transition: 0.2s ease-out;
    opacity: 0.4;
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
  padding-bottom: 3rem;
  margin: 2rem auto;

  color: #c6a692;

  text-align: center;
  font-size: 2.6rem;
  font-family: 'Jua';

  ${mediaQuery[1]} {
    font-size: 2rem;
  }
`;

const Form = styled.form`
  margin-top: 2rem;
`;

const DeviceInput = styled.input`
  display: block;
  width: 80%;
  height: 3rem;
  padding: 2rem;
  margin: 0 auto 1.2rem;
  border: 0.3rem solid #c6a692;
  border-radius: 1rem;

  font-family: 'Jua';
  font-size: 1.8rem;

  opacity: 0.4;
`;

const ButtonTitle = styled.button`
  display: block;
  width: 10rem;
  padding-top: 0.4rem;
  margin: 3.5rem auto 0;
  border: 0.3rem solid #c6a692;
  border-radius: 3rem;

  background-color: white;
  color: #c6a692;

  font-size: 2rem;
  font-family: 'Jua';
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

const AlertSmall = styled.small`
  display: block;
  width: 80%;
  margin: 0 auto 1rem;

  color: red;

  font-family: 'Jua';
  font-size: 1.2rem;
`;
