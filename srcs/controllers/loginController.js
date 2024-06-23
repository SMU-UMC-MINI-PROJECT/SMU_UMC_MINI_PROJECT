// loginController.js
import { loginService } from '../services/loginService.js';
import { response } from '../../config/response.js';
import { errStatus } from '../../config/errorStatus.js';
import { successStatus } from '../../config/successStatus.js';

export const login = async (req, res, next) => {
  const { studentId, password } = req.body;

  
    // 로그인 서비스 호출
    const result = await loginService(studentId, password);
    if (result !== null) { 
      res.send(response(successStatus.LOGIN_SUCCESS, result));
  } else { 
      res.send(response(errStatus.INVALID_CREDENTIALS)); 
  }
  
};
