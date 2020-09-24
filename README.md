# e
농협정보시스템 신입사원 교육 내 프로젝트

## 필요한 설치 모듈
* npm install mysql --save
* npm install mysql2 --save
* npm install ejs --save
* npm install truffle --save
* npm install express-session --save
* npm install express-mysql-session --save
* npm install sequelize --save
* npm install -g sequelize-cli
* npm install moment --save
* npm install moment-timezone
* npm install body-parser
* npm install ejs-lint


## solidity function/code usage (작성된 것만 고려해주면 됨)
* **contract Timecap(string company)**
    : 회사 측에서 발행하는 컨트랙트.
    + **string company** :  회사 이름

* **function newCap(string empNumber, uint hireDate, uint openDate, int money, string[] answers)**
    : 사원번호 별 새로운 캡슐 생성. 이미 같은 사원번호로 생성된 캡슐이 있는 경우 error return. 

    + **string empNumber**: 사원번호
    + **uint hireDate**: 입사일. javascript의 date 객체와는 다르므로 parsing 후 전달 필요.
    + **uint openDate**: 캡슐을 열어볼 수 있는 날짜. hireDate와 동일 type.
    + **int money**: 편지와 함께 보관할 돈의 금액. 단위는 wei.
    + **string[] answers**: 사용자가 작성한 문답의 답변들.

* **function openCap (string empNumber)**
    : 캡슐을 열때 사용하는 함수.
    + **string empNumber**: 사원번호