// loginController.js
import { loginService } from '../services/loginService.js';
import { response } from '../../config/response.js';
import { errStatus } from '../../config/errorStatus.js';

export const login = async (req, res, next) => {
  const { studentId, password } = req.body;

  try {
    // 로그인 서비스 호출
    const result = await loginService(studentId, password);
    // 성공 응답 반환
    res.status(result.status).send(response(result));
  } catch (error) {
    // 오류 처리 및 응답 반환
    const errorData = error.data || errStatus.INTERNAL_SERVER_ERROR;
    res.status(errorData.status).send(response(errorData));
  }
};
