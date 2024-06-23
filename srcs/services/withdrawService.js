// srcs/services/withdrawService.js

import { errStatus } from '../../config/errorStatus.js';
import { successStatus } from '../../config/successStatus.js';
import { Student } from '../models/signupModel.js';

export const withdrawService = async (studentId) => {
  try {
    // 학번을 기반으로 학생을 찾습니다.
    const student = await Student.findOne({ studentId });

    // 학생이 존재하지 않는 경우
    if (!student) {
      return errStatus.NOT_FOUND; // 적절한 오류 상태 반환
    }

    // MongoDB에서 학생을 삭제합니다.
    await Student.deleteOne({ studentId });

    return successStatus.ISSUCCESS; // 성공 상태 반환
  } catch (error) {
    // 오류 처리
    console.error('withdrawService에서 오류 발생:', error);
    throw errStatus.INTERNAL_SERVER_ERROR; // 내부 서버 오류 상태 반환
  }
};
