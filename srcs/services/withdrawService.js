// srcs/services/withdrawService.js

import { errStatus } from '../../config/errorStatus.js';
import { successStatus } from '../../config/successStatus.js';
import { Student } from '../models/signupModel.js';

export const withdrawService = async (studentId) => {
  try {
    // 학번을 기반으로 MongoDB에서 학생 정보를 찾습니다.
    const student = await Student.findOne({ studentId });

    // 만약 학생이 존재하지 않으면
    if (!student) {
      return errStatus.NOT_FOUND; // 사용자가 없음을 나타내는 적절한 오류 상태 반환
    }

    // MongoDB에서 해당 학번의 학생 정보를 삭제합니다.
    await Student.deleteOne({ studentId });

    // 성공적으로 삭제되었음을 나타내는 성공 상태 반환
    return successStatus.ISSUCCESS;
  } catch (error) {
    // 오류 발생 시 콘솔에 기록하고, 내부 서버 오류 상태를 반환합니다.
    console.error('withdrawService에서 오류 발생:', error);
    throw errStatus.INTERNAL_SERVER_ERROR;
  }
};