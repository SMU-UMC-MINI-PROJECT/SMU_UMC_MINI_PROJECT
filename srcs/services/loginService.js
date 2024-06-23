import { errStatus } from '../../config/errorStatus.js';
import { successStatus } from '../../config/successStatus.js';
import { Student } from '../models/signupModel.js';
import { comparePassword } from '../../config/bycrypt.js'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();

export const loginService = async (studentId, password) => {
  try {
    console.log('로그인 서비스 시작');
    const student = await Student.findOne({ studentId });

    if (!student) {
      console.log('학생 정보 없음');
      return null;
    }

    const isMatch = await comparePassword(password, student.password);
    if (!isMatch) {
      console.log('비밀번호 불일치');
      return null;
    }
    let token = jwt.sign({
      user_id : studentId
    },process.env.JWT_SECRET,{
      expiresIn: "1h",
    });

    console.log('로그인 성공');
    return { 'user_id' : studentId, "jwt" : token};
  } catch (error) {
    console.error('로그인 서비스 에러:', error);
    throw error;
  }
};
