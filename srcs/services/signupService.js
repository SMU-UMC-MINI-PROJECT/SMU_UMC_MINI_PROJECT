import puppeteer from 'puppeteer';
import { hashPassword } from '../../config/bycrypt.js'
import { errStatus } from '../../config/errorStatus.js';
import { successStatus } from '../../config/successStatus.js';
import { Student } from '../models/signupModel.js';
import { BaseError } from '../../config/baseError.js'


export const signupService = async (studentId, password) => {
  const existingStudent = await Student.findOne({ studentId });

  if (existingStudent) {
    // 이미 가입한 경우
    return "fail";
  }
  
  const browser = await puppeteer.launch({ headless: false});

  const page = await browser.newPage();

  // e-campus 크롤링
  try {
    await page.goto('https://ecampus.smu.ac.kr/login/index.php');

    await page.type('#input-username', studentId);
    await page.type('#input-password', password);
    await page.click('input[type="submit"]');

    await page.waitForNavigation();

    const currentUrl = page.url();
    
    if (currentUrl === 'https://ecampus.smu.ac.kr/') {
      // 본인인증 성공하면 이름 학번 크롤링해서 가져오기
      const userInfo = await page.evaluate(() => {
        let name = document.querySelector('.user-info-picture h4').innerText;
        let major = document.querySelector(
          '.user-info-picture p.department'
        ).innerText;
        return { name, major };
      });
      

      password = await hashPassword(password);
      // MongoDB에 학번, 비밀번호, 이름, 전공 저장
      const newStudent = new Student({
        studentId,
        password,
        name: userInfo.name,
        major: userInfo.major,
      });

      await newStudent.save();

      
      return successStatus.JOIN_SUCCESS;
    } else if (
      currentUrl === 'https://ecampus.smu.ac.kr/login.php?errorcode=3'
    ) {
      
      // 학생 정보 없을 경우
      return null;
    }
  } catch (error) {
    throw new BaseError(errStatus.INTERNAL_SERVER_ERROR);
  } finally {
    await browser.close();
  }
};
