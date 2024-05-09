// XMLHTTPRequest
// AJax 에이잭스
// 비동기화
// - Asynchronous Javascript And XML
// - javascript를 이용한 비동기 통신
// XML: eXtensible Markup language
// - `<XML>`
// HTML:HyperText Markup Language

let isEmail,
  isPw,
  isNick,
  isCheck = false;

const registForm = document.forms["regist"];
console.log(registForm);
const emailResultElem = document.getElementById("email-result");
const pwResultElem = document.getElementById("pw-result");
const checkResultElem = document.getElementById("pw-check-result");
const nickResultElem = document.getElementById("nick-result");
registForm.email.oninput = (e) => {
  isEmail = false;
  const emailReg = /^[a-z0-9가-힣]+@[a-z]+\.[a-z]{2,4}$/i;
  console.log(emailReg.test(e.target.value));
  if (!emailReg.test(e.target.value)) {
    emailResultElem.innerHTML = "이메일 형식을 지켜주세요";
  } else {
    isEmail = true;
    emailResultElem.innerHTML = "";
  }
};
registForm.pw.oninput = (e) => {
  const pwReg = /(?=.*[a-z])(?=.*[!@#$%^*+=-])(?=.*[0-9])/i;
  isPw = false;
  console.log(pwReg.test(e.target.value));
  if (e.target.value.length < 8 || e.target.value.length > 30) {
    pwResultElem.innerHTML = "비밀번호는 8글자 이상, 30글자 이하로 작성하세요.";
  } else if (!pwReg.test(e.target.value)) {
    pwResultElem.innerHTML = "비밀번호는 영어, 특수문자, 숫자를 포함하세요.";
  } else {
    isPw = true;
    pwResultElem.innerHTML = "";
  }
};

registForm.onsubmit = (e) => {
  e.preventDefault(); // 엘리먼트의 기본 기능을 멈춘다.
  //   console.log(registForm.email.value);
  //   console.log(registForm.pw.value);
  //   console.log(registForm["pw-check"].value);
  //   console.log(registForm.nick.value);
  // if (!(isPw && isEmail && isCheck && isNick)) {
  //   alert("내용 확인 후 다시 시도해주세요.");
  //   return;
  // }
  const xhr = new XMLHttpRequest();
  xhr.open("post", "http://localhost:8000/user/regist");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.send(
    JSON.stringify({
      email: registForm.email.value,
      pw: registForm.pw.value,
      "pw-check": registForm["pw-check"].value,
      nick: registForm.nick.value,
    })
  );

  //   setTimeout(()=>{
  //     if(xhr)
  //   }, 5000);

  xhr.onload = () => {
    if (xhr.status == 200) {
      alert("성공!");
      location.href =
        "http://127.0.0.1:5500/13.AWS_Full/240508/front/login/index.html";
    } else if (xhr.status == 400) {
      alert("메시지 확인");
    } else if (xhr.status == 409) {
      alert("중복");
      // 기존 서버 정보와 충돌
    } else {
      alert("알 수 없는 오류 발생");
    }
  };
};
