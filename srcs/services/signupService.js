import puppeteer from 'puppeteer';
import { hashPassword } from '../../config/bycrypt.js';
import { errStatus } from '../../config/errorStatus.js';
import { successStatus } from '../../config/successStatus.js';
import { Student } from '../models/signupModel.js';
import { BaseError } from '../../config/baseError.js';

export const signupService = async (studentId, password) => {
  let browser;
  
  try {
    const existingStudent = await Student.findOne({ studentId });

    if (existingStudent) {
      // 이미 가입한 경우
      return "fail";
    }

    let launchOptions = {};
    
    // headless: false로 Chromium을 GUI 모드로 실행할 경우
    if (process.env.NODE_ENV === 'ubuntu') {
      launchOptions = {
        executablePath: '/usr/bin/google-chrome',
        headless: true,
        protocolTimeout : 60000,
        args: [
          '--no-sandbox', // 보안 기능 비활성화 (필요한 경우)
          '--disable-setuid-sandbox'
        ]
      };
    } else {
      launchOptions = {
        headless: true, // 기본적으로 headless 모드
      };
    }
    
    browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    // e-campus 크롤링
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
        let major = document.querySelector('.user-info-picture p.department').innerText;
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
    } else if (currentUrl === 'https://ecampus.smu.ac.kr/login.php?errorcode=3') {
      // 학생 정보 없을 경우
      return null;
    }
  } catch (error) {
    console.error('Error occurred during signup:', error);
    throw new BaseError(errStatus.INTERNAL_SERVER_ERROR);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
