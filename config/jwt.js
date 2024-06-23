import jwt from 'jsonwebtoken';
import { BaseError } from './baseError.js';
import { errStatus } from './errorStatus.js';
import dotenv from 'dotenv';
dotenv.config();

export const jwtMiddleware = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1] || req.query.token; //토큰 읽기
  // token does not exist
  if (!token) {
    console.log(1);
    return res.send(new BaseError(errStatus.TOKEN_VERIFICATION_FAILURE));
  }
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, verifiedToken) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(verifiedToken); //성공시 토큰 반환
    });
  });
  const onError = (error) => {
    //검증 실패
    return res.send(new BaseError(errStatus.AUTHENTICATION_FAILED));
  };
  p.then((verifiedToken) => {
    req.verifiedToken = verifiedToken;
    next();
  }).catch(onError);
};
