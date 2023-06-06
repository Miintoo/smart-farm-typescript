import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import mediaQuery from '../../utils/breakPointUI';
import validation from '../../utils/validation';
import ModalOneButton from '../../components/common/ModalOneButton';

interface IFormInput {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    getValues
  } = useForm<IFormInput>({ mode: 'onBlur' });

  const onSubmit = async (data) => {
    const { passwordConfirm, ...filterData } = data;
    try {
      await axios.post('/register', filterData);
      setIsOpen(true);
    } catch (error) {
      throw Error('회원가입이 실패 했습니다.');
    }
  };

  const handleClick = () => {
    setIsOpen(false);
    navigate('/');
  };

  return (
    <>
      <RegisterBox>
        <RegisterTitle>환영합니다!</RegisterTitle>
        <RegisterForm onSubmit={handleSubmit(onSubmit)}>
          <InputLabel htmlFor="email">이메일</InputLabel>
          <InputEmailBox
            id="email"
            aria-invalid={!isDirty ? undefined : errors.email ? 'true' : 'false'}
            {...register('email', validation.email)}
          />
          {errors.email && <AlertSmall>{errors.email.message}</AlertSmall>}

          <InputLabel htmlFor="password">비밀번호</InputLabel>
          <InputBox
            id="password"
            type="password"
            aria-invalid={!isDirty ? undefined : errors.password ? 'true' : 'false'}
            {...register('password', validation.password)}
          />
          {errors.password && <AlertSmall role="alert">{errors.password.message}</AlertSmall>}

          <InputLabel htmlFor="passwordConfirm">비밀번호 확인</InputLabel>
          <InputBox
            id="passwordConfirm"
            type="password"
            {...register('passwordConfirm', {
              required: '비밀번호는 필수 입력입니다.',
              minLength: {
                value: 8,
                message: '8자리 이상 비밀번호를 사용하세요.'
              },
              validate: {
                check: (value) => {
                  const { password } = getValues();
                  return password === value || '비밀번호가 일치하지 않습니다.';
                }
              }
            })}
          />
          {errors.passwordConfirm && <AlertSmall role="alert">{errors.passwordConfirm.message}</AlertSmall>}
          <NamePhoneBox>
            <NameBox>
              <InputNameLabel htmlFor="name">이름</InputNameLabel>
              <InputNameBox id="name" type="text" {...register('name', validation.name)} />
              {errors.name && <AlertSmall role="alert">{errors.name.message}</AlertSmall>}
            </NameBox>
            <PhoneBox>
              <InputPhoneLabel htmlFor="phone">전화번호</InputPhoneLabel>
              <InputBox id="phone" type="text" {...register('phone', validation.phone)} />
              {errors.phone && <AlertSmall role="alert">{errors.phone.message}</AlertSmall>}
            </PhoneBox>
          </NamePhoneBox>
          <InputButton type="submit" disabled={isSubmitting}>
            가입하기
          </InputButton>
        </RegisterForm>
      </RegisterBox>
      {isOpen && <ModalOneButton title="회원가입이 완료 되었습니다!" buttonDescription="확인" onClick={handleClick} />}
    </>
  );
}

const RegisterBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 52vw;
  padding: 7rem 0;
  border: 0.6rem solid #c6a692;
  margin: auto;

  transform: translate(-50%, -50%);

  ${mediaQuery[1]} {
    width: 78vw;
  }

  ${mediaQuery[0]} {
    border: none;
  }
`;

const RegisterTitle = styled.h2`
  margin-top: 4rem;

  font-family: 'Jua';
  font-size: 4.4rem;
  font-weight: 400;
  text-align: center;

  color: #c6a692;
`;

const RegisterForm = styled.form`
  width: 70%;
  margin: 6rem auto;

  font-family: 'Jua';

  ${mediaQuery[1]} {
    width: 80%;
  }

  ${mediaQuery[0]} {
    width: 100%;
  }
`;

const NamePhoneBox = styled.div`
  display: flex;
  align-items: center;
`;

const NameBox = styled.div`
  width: 50%;
`;

const PhoneBox = styled.div`
  width: 50%;
`;

const InputLabel = styled.label`
  display: block;

  color: #6c5d53;

  font-size: 2rem;

  ${mediaQuery[1]} {
    font-size: 1.4rem;
  }
`;

const InputNameLabel = styled(InputLabel)`
  width: 50%;
`;
const InputPhoneLabel = styled(InputLabel)`
  width: 50%;
`;

const InputBox = styled.input`
  width: 100%;
  height: 2.8rem;
  padding-left: 0.2rem;
  margin: 0.4rem 0 0.6rem 0;
  border: 0.2rem solid rgba(0, 0, 0, 0.2);
  border-radius: 0.2rem;

  font-size: 1.4rem;
`;

const InputEmailBox = styled(InputBox)`
  width: 60%;
`;

const InputNameBox = styled(InputBox)`
  width: 70%;
`;

const InputButton = styled.button`
  width: 100%;
  height: 4rem;
  margin-top: 2.4rem;
  border: 0.4rem solid #c6a692;
  border-radius: 3rem;

  background-color: white;
  color: #c6a692;

  font-family: 'Jua';
  font-size: 1.9rem;
`;

const AlertSmall = styled.small`
  display: block;
  margin-bottom: 1rem;

  color: red;

  font-family: 'Jua';
  font-size: 1.2rem;
`;
