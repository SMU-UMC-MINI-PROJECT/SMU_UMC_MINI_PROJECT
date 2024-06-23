// srcs/controllers/withdrawController.js

import { response } from '../../config/response.js';
import { errStatus } from '../../config/errorStatus.js';
import { withdrawService } from '../services/withdrawService.js';

export const withdraw = async (req, res, next) => {
  const { studentId } = req.body;

  try {
    // withdrawService를 호출하여 계정 삭제 처리
    const result = await withdrawService(studentId);

    // 서비스 결과에 따라 적절한 응답을 보냅니다.
    if (result.isSuccess) {
      res.status(result.status).send(response(result));
    } else {
      res.status(result.status || errStatus.INTERNAL_SERVER_ERROR.status).send(response(result));
    }
  } catch (error) {
    // withdrawService에서 발생한 오류 처리
    const errorData = error.data || errStatus.INTERNAL_SERVER_ERROR;
    res.status(errorData.status).send(response(errorData));
  }
};
