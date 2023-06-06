const validation = {
  email: {
    required: '이메일은 필수 입력입니다.',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: '이메일 형식에 맞지 않습니다.'
    }
  },
  password: {
    required: '비밀번호는 필수 입력입니다.',
    minLength: {
      value: 8,
      message: '8자리 이상 비밀번호를 사용하세요.'
    }
  },
  name: {
    required: '이름은 필수 입력입니다.',
    pattern: {
      value: /^[가-힣]{2,4}$/,
      message: '이름 형식에 맞지 않습니다.'
    }
  },
  phone: {
    required: '전화번호는 필수 입력입니다.',
    pattern: {
      value: /^\d{3}-\d{3,4}-\d{4}$/,
      message: '전화번호 형식에 맞지 않습니다.'
    }
  },
  deviceName: {
    required: '디바이스 이름은 필수 입력입니다.',
    maxLength: {
      value: 5,
      message: '글자수는 5개가 최대입니다.'
    }
  },
  id: {
    required: '시리얼 넘버는 필수 입력입니다.',
    maxLength: {
      value: 2,
      message: '시리얼 번호는 100미만 값을 입력 해주세요.'
    }
  }
};

export default validation;
