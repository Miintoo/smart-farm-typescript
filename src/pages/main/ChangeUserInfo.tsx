import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import validation from '../../utils/validation';
import mediaQuery from '../../utils/breakPointUI';
import instance from '../../utils/auth/interceptor';

export default function ChangeUserInfo() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors }
  } = useForm({ mode: 'onBlur' });

  const getUserData = async () => {
    try {
      const { data } = await instance.get('/users');
      setName(data.name);
      setPhone(data.phone);
    } catch (error) {
      Error('사용자를 찾아올 수 없습니다.');
    }
  };

  useEffect(() => {
    getUserData();
  }, [name, phone]);

  const onSubmit = async (data) => {
    try {
      await instance.patch('/users', data);
      setName(data.name);
      setPhone(data.phone);
      reset();
    } catch (error) {
      Error('회원정보 변경이 실패 했습니다.');
    }
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Title>회원정보 수정</Title>
      <InfoContainer>
        <BackButton src="/images/rightArrow.png" alt="뒤로가기 버튼" onClick={handleBackButton} />
        <InfoContainerItem>
          <ProfileContainer>
            <ProfileImage src="/images/profile.jpg" alt="프로파일 이미지 입니다." />
            <ProfileName>{name} 농부</ProfileName>
            <ProfilePhone>{phone}</ProfilePhone>
          </ProfileContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="name">이름</Label>
            <InputBox
              id="name"
              type="text"
              aria-invalid={!isDirty ? undefined : errors.name ? 'true' : 'false'}
              {...register('name', validation.name)}
            />
            {errors.name && <AlertSmall role="alert">{errors.name.message}</AlertSmall>}
            <Label htmlFor="phone">전화번호</Label>
            <InputBox
              id="phone"
              type="text"
              aria-invalid={!isDirty ? undefined : errors.phone ? 'true' : 'false'}
              {...register('phone', validation.phone)}
            />
            {errors.phone && <AlertSmall role="alert">{errors.phone.message}</AlertSmall>}
            <Button type="submit" disabled={isSubmitting}>
              회원정보 변경
            </Button>
          </form>
        </InfoContainerItem>
      </InfoContainer>
    </Container>
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

const InfoContainerItem = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
`;

const ProfileContainer = styled.div`
  ${mediaQuery[0]} {
    margin: 0;
  }
`;

const ProfileImage = styled.img`
  display: block;
  width: 12rem;
  height: 12rem;
  margin: auto;
  border-radius: 50%;

  background-color: white;

  opacity: 0.9;

  ${mediaQuery[0]} {
    width: 10rem;
    height: 10rem;
  }
`;

const ProfileName = styled.span`
  display: block;
  margin: 1.7rem 0 1rem 0;

  color: #9f8473;

  font-family: 'Jua';
  font-size: 3.3rem;
  text-align: center;

  ${mediaQuery[1]} {
    font-size: 2.8rem;
  }

  ${mediaQuery[0]} {
    font-size: 2.3rem;
  }
`;

const ProfilePhone = styled(ProfileName)`
  margin-bottom: 2rem;

  font-size: 2.5rem;
`;

const Label = styled.label`
  display: block;
  width: 40%;
  margin: 0rem auto 1rem;

  font-family: 'Jua';
  font-size: 1.8rem;

  ${mediaQuery[2]} {
    width: 80%;
  }
`;

const InputBox = styled.input`
  display: block;
  width: 40%;
  height: 3rem;
  padding: 2rem;
  margin: 0 auto 1.2rem;
  border: 0.3rem solid #c6a692;
  border-radius: 1rem;

  font-family: 'Jua';
  font-size: 1.8rem;

  opacity: 0.4;

  ${mediaQuery[2]} {
    width: 80%;
  }
`;

const Button = styled.button`
  display: block;
  width: 14rem;
  height: 4.4rem;
  margin: 3rem auto 0;
  border: 0.3rem solid #c6a692;
  border-radius: 1.5rem;

  background-color: white;
  color: #c6a692;

  font-family: 'Jua';
  font-size: 2.1rem;
  line-height: 4rem;

  &:hover {
    transition 0.4s ease-out;
    scale: 1.1;
  }

  ${mediaQuery[1]} {
    width: 27vw;

    font-size: 1.5rem;
  }

  ${mediaQuery[0]} {
    width: 14rem;
    margin-bottom: 1rem;
  }
`;

const AlertSmall = styled.small`
  display: block;
  width: 40%;
  margin: 0 auto 1rem;

  color: red;

  font-family: 'Jua';
  font-size: 1.2rem;

  ${mediaQuery[2]} {
    width: 80%;
  }
`;
