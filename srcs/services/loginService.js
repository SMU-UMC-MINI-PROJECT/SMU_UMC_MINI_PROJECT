import { errStatus } from '../../config/errorStatus.js';
import { successStatus } from '../../config/successStatus.js';
import { Student } from '../models/signupModel.js';

export const loginService = async (studentId, password) => {
  try {
    console.log('로그인 서비스 시작');
    const student = await Student.findOne({ studentId });
    console.log('학생 정보 조회 결과:', student);

    if (!student) {
      console.log('학생 정보 없음');
      throw { data: errStatus.INVALID_CREDENTIALS };
    }

    if (password !== student.password) {
      console.log('비밀번호 불일치');
      throw { data: errStatus.INVALID_CREDENTIALS };
    }

    console.log('로그인 성공');
    return successStatus.ISSUCCESS;
  } catch (error) {
    console.error('로그인 서비스 에러:', error);
    throw error;
  }
};
