import { successStatus } from '../../config/successStatus.js';
import { errStatus } from '../../config/errorStatus.js';
import { uploadImageLogic } from '../services/image.service.js';
const uploadImage = async (req, res) => {
  try {
    await uploadImageLogic(req.file);
    res.status(201).json({ message: successStatus.ISSUCCESS });
  } catch (err) {
    res.status(500).json({ message: errStatus.INTERNAL_SERVER_ERROR });
  }
};

export { uploadImage };
