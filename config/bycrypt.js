import bcrypt from 'bcrypt';

// 비밀번호 암호화 함수
export const hashPassword = async (password) => {
  const saltRounds = 10; 
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// 비밀번호 검증 함수
export const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};