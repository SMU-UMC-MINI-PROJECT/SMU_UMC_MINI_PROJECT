import { successStatus } from '../../config/successStatus.js';
import { errStatus } from '../../config/errorStatus.js';
import { uploadImageLogic } from '../services/image.service.js';
const uploadImage = async (req, res) => {
  try {
    console.log('파일 정보:', req); // 디버깅 로그 추가
    await uploadImageLogic(req.file);
    res.status(201).json({ message: successStatus.ISSUCCESS });
  } catch (err) {
    console.error('업로드 이미지 오류:', err); // 에러 로그 추가
    res.status(500).json({ message: errStatus.INTERNAL_SERVER_ERROR });
  }
};

export { uploadImage };
