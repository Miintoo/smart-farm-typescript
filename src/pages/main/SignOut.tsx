import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import instance from '../../utils/auth/interceptor';
import mediaQuery from '../../utils/breakPointUI';
import ModalOneButton from '../../components/common/ModalOneButton';
import validation from '../../utils/validation';

export default function SignOut() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors }
  } = useForm({ mode: 'onBlur' });

  const handleModalButtonClose = () => {
    setIsOpen(false);
    navigate('/');
  };

  const onSubmit = async (data) => {
    try {
      await instance.put('/users', data);
      setIsOpen(true);
    } catch (error) {
      Error('회원탈퇴에 실패 했습니다.');
    }
  };

  const handleBackButton = () => {
    navigate(-1);
  };
  return (
    <>
      <Container>
        <Title>회원탈퇴</Title>
        <InfoContainer>
          <BackButton src="/images/rightArrow.png" alt="뒤로가기 버튼" onClick={handleBackButton} />
          <InfoContainerForm onSubmit={handleSubmit(onSubmit)}>
            <AlertTitle>탈퇴시 모든 회원정보가 삭제 됩니다.</AlertTitle>
            <LoginInputBox
              name="password"
              type="password"
              placeholder="password"
              aria-invalid={!isDirty ? undefined : errors.password ? 'true' : 'false'}
              {...register('password', validation.password)}
            />
            {errors.password && <AlertSmall role="alert">{errors.password.message}</AlertSmall>}
            <Button type="submit" disabled={isSubmitting}>
              회원 탈퇴
            </Button>
          </InfoContainerForm>
        </InfoContainer>
      </Container>
      {isOpen && (
        <ModalOneButton title="탈퇴 완료 됐습니다." buttonDescription="확인" onClick={handleModalButtonClose} />
      )}
    </>
  );
}

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 60vw;
  height: 75vh;
  border: 0.4rem solid #dfd2ca;

  ${mediaQuery[1]} {
    width: 90vw;
  }

  ${mediaQuery[0]} {
    width: 100%;
    border: none;
  }
`;

const BackButton = styled.img`
  position: absolute;
  top: 1.5rem;
  left: 1rem;
  transform: scaleX(-1);

  cursor: pointer;

  &:hover {
    transition: all 0.2s ease-out;
    opacity: 0.6;
  }
`;

const Title = styled.h2`
  height: 7rem;
  padding-left: 2.2rem;

  background-color: #dfd2ca;
  color: #8d8c8c;

  line-height: 7rem;
  font-family: 'Jua';
  font-size: 3.3rem;

  ${mediaQuery[1]} {
    font-size: 2.8rem;
  }
`;

const InfoContainer = styled.div`
  position: relative;
  width: 90%;
  height: 80%;
  margin: 3.5rem auto 0;
  border: 0.7rem solid #dfd2ca;

  ${mediaQuery[1]} {
    border: none;
  }
`;

const InfoContainerForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
`;

const AlertTitle = styled.span`
  display: block;

  color: #dfd2ca;

  font-family: 'Jua';
  font-size: 4rem;
  text-align: center;

  ${mediaQuery[2]} {
    font-size: 3rem;
  }

  ${mediaQuery[1]} {
    font-size: 2.2rem;
  }
`;

const LoginInputBox = styled.input`
  display: block;
  width: 60%;
  height: 4.9rem;
  padding-left: 1.2rem;
  margin: 4rem auto 0.2rem;
  border: 0.15rem solid rgba(0, 0, 0, 0.1);
  border-radius: 0.2rem;

  font-family: 'Jua';
  font-size: 2rem;

  ${mediaQuery[0]} {
    font-size: 1.4rem;
  }
`;

const Button = styled.button`
  display: block;
  width: 14rem;
  height: 4.4rem;
  margin: 5rem auto 0;
  border: 0.3rem solid #c6a692;
  border-radius: 1.5rem;

  background-color: white;
  color: #c6a692;

  font-family: 'Jua';
  font-size: 2.1rem;
  line-height: 4rem;

  &:hover {
    transition: 0.4s ease-out;
    scale: 1.1;
  }
`;

const AlertSmall = styled.small`
  display: block;
  width: 60%;
  margin: 2rem auto;

  color: red;

  font-family: 'Jua';
  font-size: 2.4rem;

  ${mediaQuery[2]} {
    font-size: 1.8rem;
  }
`;
