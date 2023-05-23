/* eslint-disable no-shadow */
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import mediaQuery from '../../utils/breakPointUI';
import validation from '../../utils/validation';
import loginSuccess from '../../utils/auth/loginSuccess';

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors }
  } = useForm({ mode: 'onBlur' });

  // 로그인시 처리 로직
  const onSubmit = async (value) => {
    try {
      const {
        data: { auth }
      } = await axios.post('/login', value);
      loginSuccess(auth);
      navigate('/main');
    } catch (error) {
      Error('axios 로그인 실패');
    }
  };

  return (
    <LoginBox>
      <LoginTitle>로그인</LoginTitle>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <LoginInputBox
          name="email"
          placeholder="email"
          aria-invalid={!isDirty ? undefined : errors.email ? 'true' : 'false'}
          {...register('email', validation.email)}
        />
        {errors.email && <AlertSmall>{errors.email.message}</AlertSmall>}
        <LoginInputBox
          name="password"
          type="password"
          placeholder="password"
          aria-invalid={!isDirty ? undefined : errors.password ? 'true' : 'false'}
          {...register('password', validation.password)}
        />
        {errors.password && <AlertSmall role="alert">{errors.password.message}</AlertSmall>}
        <LoginButton type="submit" disabled={isSubmitting}>
          로그인
        </LoginButton>
      </LoginForm>
      <InfoButtonContainer>
        <InfoButtonItem
          onClick={() => {
            navigate('/register');
          }}
        >
          회원가입
        </InfoButtonItem>
        <InfoButtonItem>아이디찾기</InfoButtonItem>
        <InfoButtonItem>비밀번호찾기</InfoButtonItem>
      </InfoButtonContainer>
    </LoginBox>
  );
}

// css 부분
const LoginBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 69rem;
  height: 60vh;
  border: 0.6rem solid #c6a692;

  transform: translate(-50%, -50%);

  ${mediaQuery[2]} {
    width: 60rem;
    height: 48rem;
  }

  ${mediaQuery[1]} {
    width: 80vw;
    height: 46rem;
  }

  ${mediaQuery[0]} {
    border: none;
  }
`;

const LoginTitle = styled.h2`
  height: 7rem;
  margin-top: 10.5rem;
  margin-bottom: 2rem;

  color: #c6a692;

  font-family: 'Jua';
  font-size: 6rem;
  text-align: center;

  ${mediaQuery[2]} {
    margin-top: 9rem;
  }

  ${mediaQuery[1]} {
    margin-top: 8.8rem;
    margin-bottom: 0rem;

    font-size: 4rem;
  }
`;

const LoginForm = styled.form`
  width: 53%;
  margin: 0 auto 1.6rem;

  ${mediaQuery[1]} {
    width: 80%;
  }

  ${mediaQuery[0]} {
    width: 100%;
  }
`;

const LoginInputBox = styled.input`
  width: 100%;
  height: 4.9rem;
  padding-left: 1.2rem;
  margin: 0.5rem 0 0.2rem 0;
  border: 0.15rem solid rgba(0, 0, 0, 0.1);
  border-radius: 0.2rem;

  font-family: 'Jua';
  font-size: 2rem;

  ${mediaQuery[0]} {
    font-size: 1.4rem;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 4.8rem;
  margin-top: 2rem;
  border: 0.3rem solid #c6a692;
  border-radius: 0.9rem;

  background-color: white;
  color: #c6a692;

  font-family: 'Jua';
  font-size: 2.6rem;
  font-weight: 200;
`;

const InfoButtonContainer = styled.ul`
  display: flex;
  justify-content: space-evenly;
  width: 45%;
  margin: auto;

  font-size: 0.8rem;
  font-weight: bold;

  opacity: 0.3;

  ${mediaQuery[1]} {
    width: 80%;
  }

  ${mediaQuery[0]} {
    width: 100%;
  }
`;

const InfoButtonItem = styled.li`
  margin-top: 1.2rem;

  font-family: 'Jua';
  font-size: 1.4rem;

  cursor: pointer;

  &:hover {
    transition: 0.2s ease-out;
    color: #c6a692;
  }
`;

const AlertSmall = styled.small`
  font-family: 'Jua';
  color: red;
`;
