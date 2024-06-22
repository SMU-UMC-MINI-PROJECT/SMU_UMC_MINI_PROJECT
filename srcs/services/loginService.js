import { errStatus } from '../../config/errorStatus.js';
import { successStatus } from '../../config/successStatus.js';
import { Student } from '../models/signupModel.js';

export const loginService = async (studentId, password) => {
  try {
    // monogoDB model에서 학생의 아이디 조회
    const student = await Student.findOne({ studentId });

    if (!student) {
      // 저장된 학번 없는 경우
      throw { data: errStatus.INVALID_CREDENTIALS };
    }

    if (password !== student.password) {
      // 비밀번호 틀릴 경우
      throw { data: errStatus.INVALID_CREDENTIALS };
    }

    // 로그인 성공
    return successStatus.ISSUCCESS;
  } catch (error) {
    throw error;
  }
};
