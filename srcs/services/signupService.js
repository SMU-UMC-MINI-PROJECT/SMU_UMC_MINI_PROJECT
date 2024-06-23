import bcrypt from 'bcryptjs'; 
import puppeteer from 'puppeteer';
import { errStatus } from '../../config/errorStatus.js';
import { successStatus } from '../../config/successStatus.js';
import { Student } from '../models/signupModel.js';

const SALT_ROUNDS = 10; 

export const signupService = async (studentId, password) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    try {
        await page.goto('https://ecampus.smu.ac.kr/login.php');

        // 학번과 비밀번호 입력
        await page.type('#input-username', studentId);
        await page.type('#input-password', password);

        // 폼 제출
        await Promise.all([
            page.click('input[name="loginbutton"]'),
            page.waitForNavigation()
        ]);

        const currentUrl = page.url();
        console.log(currentUrl);

        if (currentUrl === 'https://ecampus.smu.ac.kr/') {
            // 사용자 정보 섹션 로드 완료 대기
            await page.waitForSelector('.user-info-picture');

            // 이름과 전공 추출
            const userInfo = await page.evaluate(() => {
                const nameElement = document.querySelector('.user-info-picture h4');
                const majorElement = document.querySelector('.user-info-picture .department');
                
                return {
                    name: nameElement ? nameElement.textContent.trim() : '이름 없음',
                    major: majorElement ? majorElement.textContent.trim() : '전공 없음'
                };
            });

            console.log('추출된 사용자 정보:', userInfo);

            // MongoDB에 학번이 이미 존재하는지 확인
            const existingStudent = await Student.findOne({ studentId });

            if (existingStudent) {
                // 이미 가입된 학번인 경우 처리
                console.log(`학번 ${studentId}은(는) 이미 등록되어 있습니다.`);
                await browser.close();
                return successStatus.SUCCESS;
            }

            // MongoDB에 저장하기 전에 비밀번호를 해싱
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            // MongoDB에 저장할 새 학생 데이터 생성
            const newStudent = new Student({
                studentId,
                password: hashedPassword, // 해싱된 비밀번호 저장
                name: userInfo.name,
                major: userInfo.major,
            });

            // MongoDB에 학생 데이터 저장
            await newStudent.save();

            await browser.close();

            return successStatus.SUCCESS;
        } else if (currentUrl === 'https://ecampus.smu.ac.kr/login.php?errorcode=3') {
            console.log("인증 실패");
            return errStatus.AUTHENTICATION_FAILED;
        } else {
            console.log("내부 서버 오류");
            return errStatus.INTERNAL_SERVER_ERROR;
        }

    } catch (error) {
        await browser.close();
        throw error;
    }
};
