// hash라는 건 단방향 암호화를 얘기한다.
// hash: 칼질하다. / 해시(고기와 감자를 잘게 다져 섞어 요리하여 )
// 유일값으로 변경된다.
// a => a1
// 언제 쓸까?
//  -
// 개인정보 저장할 때

import crypto from "crypto";
// 암호화에 대한 내장 모듈

const hashAlgorithm = crypto.createHash("sha256");
// hash 암호화 객체를 만든다. sha256은 hash 종류 중 하나
const hashing = hashAlgorithm.update("비밀번호를 입력하세요.");
const hashedString = hashing.digest("hex");
console.log(hashedString);

const hashAlgorithm2 = crypto.createHash("sha256");
// hash 암호화 객체를 만든다. sha256은 hash 종류 중 하나
const hashing2 = hashAlgorithm2.update("비밀번호를 입력하세요.");
const hashedString2 = hashing2.digest("hex");
console.log(hashedString2);
// sha256 => 256 bits => 32 bytes
// FF
// 2 ** 256 요즘은 컴퓨터가 빨라서 이걸 다 넣어두고 찾는 방법도 있다.
// 레인보우 테이블

const hashAlgorith3 = crypto.createHash("sha512");
const hashing3 = hashAlgorith3.update("a");
const hashedString3 = hashing3.digest("hex");
console.log(hashedString3);
// 종류 : MD5, SHA-1, SHA-2(SHA-256), SHA-512

const salt = "dklasdjksad";
const hashAlgorithm4 = crypto.createHash("sha512");
const hashing4 = hashAlgorithm4.update("a" + salt);
const hashedString4 = hashing4.digest("hex");
console.log(hashedString4);

// salt, 소금, 암호화에 있어서 의미 없는, 필요 없는 등의 문자열을 넣는다.
// - 해커가 쉽게 암호를 추측할 수 없게 만든다.
// - 각 솔트가 다 다르게 넣는게 일반적이다.

// 키 스트레칭 : 해시화를 반복한다.
// pbkdf2, bcrypto, scrypto
// bcrypt : 가장 기본적인 키 스트레칭 암호화 함수
// pbkdf2 : 가장 많이 사용되는 암호화 함수
// scrypt : 요즘 뜨는 함수

const salt2 = (await crypto.randomBytes(64)).toString("base64");

const pbkdf2 = crypto.pbkdf2sync(
  "비밀번호를 입력", // 암호할 데이터
  salt, // 소금
  1000, // 반복 횟수
  64, // 암호화에 필요한 bytes 길이
  "sha512" // 암호화 알고리즘
  //   (
  //     err,
  //     key // 콜백 함수, pbkdf2 메서드가 언제 끝날지 모른다.
  //   ) => console.log(key.toString("hex"))
);
console.log(key.toString("hex")); //16진수로 바꾸기
// 비동기가 아니라 동기로 실행
// 비동기와 동기 경우에 맞게 나눠서 쓸 수 있다.
// 예 :) 저장만 할 경우, 굳이 저장이 끝날때를 기다릴 필요는 없다. 물론 예외는 있겠지만,
// 대체로 다른 작업도 수행시키는 편이 좋다.
// 다른 예 :) 로그인할 때 확인, 이경우 값을 받아 확인해야 하므로 동기처리가 낫다.

// Hash는 생각보다 중요한 개념이다.
// HashMap
