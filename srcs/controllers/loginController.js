// srcs/controllers/loginController.js
import { loginService } from '../services/loginService.js';
import { response } from '../../config/response.js';
import { errStatus } from '../../config/errorStatus.js';

export const login = async (req, res, next) => {
  const { studentId, password } = req.body;

  try {
    const result = await loginService(studentId, password);
    if (result.isSuccess) {
      res.status(result.status).send(response({ ...result, token: result.token }));
    } else {
      res.status(result.status).send(response(result));
    }
  } catch (error) {
    const errorData = error.data || errStatus.INTERNAL_SERVER_ERROR;
    res.status(errorData.status).send(response(errorData));
  }
};
