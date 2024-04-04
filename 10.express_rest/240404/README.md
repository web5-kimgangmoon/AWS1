# multer

- file upload를 시도했을 때 backend(express) 받아줄 수 있게 도와주는 라이브러리

# use, post, get 등등 핸들러들

// 함수의 구조 분해 할당
// 이러니까 express에 next가 필요하구나. next 덕분에 각종 미들웨어들을 몇 개고 끼워넣을 수 있다.

function b(s) {
console.log("안녕하세요");
}
function c(s) {
console.log("반갑습니다");
}
function d(s) {
console.log("이제는 떠날 시간");
}

const testSpread = (...a) => {
let s = 1;
a.forEach((item) => {
item(s);
});
console.log("잘 돌아가나요?");
};

testSpread(b, c, d);
// post(path:String, ...callback:Array(function))

# html 파일 업로드시 옵션들

// accept 넣는타입들(header: Content-Type의 지정) multiple(여러 파일의 업로드가 가능하게 해주는 옵션)

# 한글 이슈

```bash
npm i multer@1.4.4
```
