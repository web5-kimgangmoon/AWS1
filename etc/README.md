# 문서를 어떻게 작성했는가 ?

HTML 브라우저가 아닌 문서의 구조를 markup이라 불렸다.

# 웹

논문을 쉽게 공유하기 위해, 제작하기 위해
인터넷 기반으로 문서를 공유하는 시스템

# 인터넷

네트워크 기반으로 글로벌하게 데이터를 주고받는 시스템

# 네트워크

컴퓨터 두대이상이 데이터를 주고받는 시스템

# html

# padding

마진보단패딩을 쓰자

# NodeJs

NodeJs 설치
NodeJS 뭔지는 아는가 ?

## 브라우저

문서를 읽기위한 응용 프로그램 또는 응용 소프트웨어

## Javascript

웹페이지에서 돌아가기 위해서

### 컴퓨터를 조작하게 만들기 위해

nodejs
컴퓨터 조작이란 무엇인가?

연산

<!-- -데이터 저장
-데이터 처리
-데이터 출력 -->

-파일 저장 -파일 처리 -파일 출력

네트워크 <--
파일처리
목적성이 다른 코드 작성
브라우저가 아닌 컴퓨터 조작(연산)

## 런타임

프로그램을 실행시키는 도구

## 프로그램

코드 덩어리

## 프로세스

메모리 ram에 올라가있는 프로그램
프로그램을 실행했을때 프로세스가 됨
프로그램 코드덩어리, 실행했을 때 메모리

## NodeJs 설치

### 목적

파일을 조작하기 위해

### 설치 방법

ubuntu에 설치한다,

unix -> 리눅스

### 리눅스 명령어

cd 디렉터리 이동
pwd 현재의 디렉터리
ls 파일의 목록
ls -al 모든 파일 출력, 파일을 길게 출력
vi 텍스트 파일 작성
w 쓰기
q 나가기
! 강제
리눅스 디렉토리 구조

cd / 최상위 디렉터리
cd ~ 사용자 홈 디렉터리

ls -al

mnt 가상머신 설치 마운트 되어있음 c드라이브로 이동가능
home 디렉토리 여러개의 계정이 들어있다.(cd ~)

## NodeJs 설치방법 2가지방법

-nodejs - 1년 2번씩 6개월 주기 - 마이너, 메이저 - LTS , 최신버전 - 12버전 - 20버전
-NVM

## MAC

```sh
$ brew install nvm
```

## Linux

```
cd ~
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash (bash는 실행시켜라)
```

.nvm이 생겼는가

```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # this loads nvm
[ -s "$NVM_DIR\bash_completion" ] && \. "$NVM_DIR/bash_completion" # this loads nvm bash_completion
```

```sh
nvm --version # 제대로 설치되면 나온다.
```

cli 환경에선 버전을 확인하기 힘들기 떄문에 명령어를 통해 확인해 준다.
에러가 없으면 대체로 응답이 없다.
에러가 나거나, 명령어를 읽지 못하면 경고메시지를 출력

```sh
source .bashrc # 수정된 스크립트 파일 내용을 바로 적용
```

# mac

```sh
export NVM_DIR="$HOME/NVM"
[ -s "/usr/local/opt/nvm/nvm.sh"] &&. "usr/local/opt/nvm/nvm.sh" # This loads nvm
[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm"] &&. "/usr/local/opt/nvm/etc/bash_completion.d/nvm"

export NVM_DIR=-/nvm
source $(brew --prefix nvm)/nvm.sh
```
