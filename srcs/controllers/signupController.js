// signupController.js
import { signupService } from '../services/signupService.js';
import { response, errResponse} from '../../config/response.js';
import { errStatus } from '../../config/errorStatus.js';
import { successStatus } from '../../config/successStatus.js';

export const signup = async (req, res, next) => {
  const { studentId, password } = req.body;

  
  try{
    // 회원가입 서비스 호출
    const result = await signupService(studentId, password);
    // 성공 응답 반환
    
    if (result === successStatus.JOIN_SUCCESS) {
      res.send(response(successStatus.JOIN_SUCCESS, result));
    } else if (result === "fail") {
      res.send(errResponse(errStatus.ALREADY_REGISTERED)
      );
    } else{
      res.send(errResponse(errStatus.AUTHENTICATION_FAILED));
    }
  } catch (error) {
    // 에러 발생 시 next를 사용하여 Express 에러 핸들러로 전달
    next(error);
  }
    
  
};
