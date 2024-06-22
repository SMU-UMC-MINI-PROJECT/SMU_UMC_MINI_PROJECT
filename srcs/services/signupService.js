import puppeteer from 'puppeteer';
import { errStatus } from '../../config/errorStatus.js';
import { successStatus } from '../../config/successStatus.js';
import { Student } from '../models/signupModel.js';

export const signupService = async (studentId, password) => {

  const existingStudent = await Student.findOne({ studentId });

    if (existingStudent) {
        // 이미 가입한 경우
        throw { data: errStatus.ALREADY_REGISTERED };
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // e-campus 크롤링
    try {
        await page.goto('https://ecampus.smu.ac.kr/login.php');

        await page.type('#input-username', studentId);
        await page.type('#input-password', password);
        await page.click('input[name="loginbutton"]');

        await page.waitForNavigation();

        const currentUrl = page.url();

        await browser.close();
        
        if (currentUrl === 'https://ecampus.smu.ac.kr/') {

            // 본인인증 성공하면 이름 학번 크롤링해서 가져오기
            const userInfo = await page.evaluate(() => {
                let name = document.querySelector('.user-info-picture h4').innerText;
                let major = document.querySelector('.user-info-picture p.department').innerText;
                return { name, major };
            });

            // MongoDB에 학번, 비밀번호, 이름, 전공 저장
            const newStudent = new Student({
                studentId,
                password,
                name: userInfo.name,
                major: userInfo.major
            });

            await newStudent.save();

            return successStatus.JOIN_SUCCESS;
        } else if (currentUrl === 'https://ecampus.smu.ac.kr/login.php?errorcode=3') {
            // 학생 정보 없을 경우
            throw { data: errStatus.AUTHENTICATION_FAILED };
        } else {
            throw { data: errStatus.INTERNAL_SERVER_ERROR };
        }
    } catch (error) {
        await browser.close();
        throw error;
    }
};
