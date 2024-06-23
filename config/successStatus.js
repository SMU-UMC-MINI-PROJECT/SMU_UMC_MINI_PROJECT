import { StatusCodes } from "http-status-codes";

export const successStatus = {
    // success
    ISSUCCESS: { status: StatusCodes.OK, "isSuccess": true, "code": "2000", "message": "success!" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": "TOKEN200", "message":"JWT 토큰 검증 성공" },
    JOIN_SUCCESS: {"isSuccess" : true, "code" :"MEMBER200", "message": "회원가입 성공입니다."},
    LOGIN_SUCCESS: {"isSuccess": true, "code" :"MEMBER2001", "message": "로그인 성공"}

}