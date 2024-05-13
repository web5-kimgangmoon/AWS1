// 비대칭키 양방향 암호화
// 키가 2개가 필요하다.
// - 언제 써봤을까?
// - AWS EC2 접근 시 사용했었다.
// - pem(mac), ppk(putty)
// pem 키를 만들어보자.
// - openssl : 라이브러리, 일종의 프로그램
// openssl genrsa -out privatekey.pem
// genras => rsa를 generate, 생성하다.
// -out => 파일로 내보내달라.
// openssl rsa -in ./pem/privatekey.pem -out ./pem/publickey.pem -pubout
import crypto from "crypto";
import fs from "fs";
import path from "path";
// import Buffer from "safe-Buffer";
import { fileURLToPath } from "url";

const __dirname = import.meta.dirname;
const __filename = import.meta.filename;

// import key from "../pem/privatekey.pem"; // 이건 못받아온다.
const publickey = fs.readFileSync(path.join(__dirname, "../pem/publickey.pem"));
const privatekey = fs.readFileSync(
  path.join(__dirname, "../pem/privatekey.pem")
);

console.log(publickey);
console.log(privatekey);

const encryptPublicRSA = (text) => {
  const buf = Buffer.from(text);
  const encrypted = crypto.publicEncrypt(publickey, buf);
  return encrypted.toString("hex");
};
const encryptPrivateRSA = (text) => {
  const buf = Buffer.from(text);
  const encrypted = crypto.privateEncrypt(privatekey, buf);
  return encrypted.toString("hex");
};

// console.log(encryptPublicRSA("입력해봅시다."));
// console.log(encryptPrivateRSA("입력해봅시다."));

const decryptPublicRSA = (crypted) => {
  const buf = Buffer.from(crypted, "hex");
  const decrypted = crypto.publicDecrypt(publickey, buf);
  return decrypted.toString("utf-8");
};
const decryptPrivateRSA = (crypted) => {
  const buf = Buffer.from(crypted, "hex");
  const decrypted = crypto.privateDecrypt(privatekey, buf);
  return decrypted.toString("utf-8");
};
// console.log(decryptPrivateRSA(encryptPrivateRSA("입력해봅시다.")));
// console.log(decryptPublicRSA(encryptPrivateRSA("입력해봅시다.")));

// let encryptedPublic = encryptPublicRSA("안녕하세요.");
// let decryptedPrivate = decryptPrivateRSA(encryptedPublic);
// console.log("encryptedPublic : ", decryptedPrivate);

// let encryptedPrivate = encryptPrivateRSA("안녕하세요2");
// let decryptedPublic = decryptPublicRSA(encryptedPrivate);
// console.log("encryptedPrivate : ", decryptedPublic);

console.log(decryptPrivateRSA(encryptPublicRSA("안녕하세요")));
// publickey로 암호화 => privatekey로 복호화(가능)
// privatekey로 암호화 => publickey로 복호화(가능)
// privatekey로 암호화 => privatekey로 복호화(불가능)
// publickey로 암호화 => publickey로 복호화(불가능)

// 비대칭키로 두 키를 써서 암호화와 복호화를 사용이 가능하다.
// 주로 서버에서 클라이언트로 보낼때는 공개키로 암호화하고, 개인의 컴퓨터에서 개인키로 복호화하게 한다.
// 비대칭키의 장점은 처음에는 대칭키보다 많은 키를 쓰지만, 그후에는 오히려 더 적은 키를 사용한다.
// 비대칭키는 2n개(각 사용자마다 하나의 개인키, 사용자가 늘때마다 늘어나는 공개키) 가 필요, 대칭키는 n(n-1)/2개가 필요

// ssl에서 개인키는 철저하게 각 server나 국제기관에서 관리하고 넘겨주는 것은 식별가능한 정보로서
// 넘겨주는 것은 공개키, 결코 개인키는 식별가능한 상태로나 그대로 넘겨주지 않는다.

// 결과적으로 브라우저와 국제기관, 서버는 서버의 server의 공개키를 알고 있는 상태지만,
// 국제기관의 공개키와 개인키는 국제기관 외엔 아무도 모르는 상태,
// 브라우저가 만든 대칭키는 국제기관은 모른채 서버와 브라우저가 서로 알고 있다.
// 서버가 만든 비대칭키의 개인키는 오직 서버만이 알고 있다.

// 비대칭키를 이용해 이로써 서로 정보은닉에 성공하면서도 이론적으론 안전한 통신이 가능했다.

// 프론트에선 암호화가 불가능하다.
