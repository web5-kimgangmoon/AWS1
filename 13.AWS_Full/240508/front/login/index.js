// 비동기 통신 : fetch, axios
// fetch: XMLHTTPRequest로 만든  그나마 편한 내부 모듈이다.

const form = document.forms.login;
const emailCheckElem = document.getElementById("email");
const pwCheckElem = document.getElementById("pw");

let isEmail = false,
  isPw = false;

form.email.oninput = (e) => {
  e.preventDefault();
  isEmail = false;
  const emailReg = /^[a-z0-9가-힣]+@[a-z]+\.[a-z]{2,4}$/i;
  console.log(emailReg.test(e.target.value));
  if (!emailReg.test(e.target.value)) {
    emailCheckElem.innerHTML = "이메일 형식을 지켜주세요";
  } else {
    isEmail = true;
    emailCheckElem.innerHTML = "";
  }
};

form.pw.oninput = (e) => {
  e.preventDefault();
  const pwReg = /(?=.*[a-z])(?=.*[!@#$%^*+=-])(?=.*[0-9])/i;
  isPw = false;
  console.log(pwReg.test(e.target.value));
  if (e.target.value.length < 8 || e.target.value.length > 30) {
    pwCheckElem.innerHTML = "비밀번호는 8글자 이상, 30글자 이하로 작성하세요.";
  } else if (!pwReg.test(e.target.value)) {
    pwCheckElem.innerHTML = "비밀번호는 영어, 특수문자, 숫자를 포함하세요.";
  } else {
    isPw = true;
    pwCheckElem.innerHTML = "";
  }
};

form.onsubmit = async (e) => {
  e.preventDefault();

  if (!isEmail || !isPw) return;

  try {
    const response = await fetch("http://localhost:8000/user/login", {
      method: "post",
      mode: "cors",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: form.email.value,
        pw: form.pw.value,
      }),
      credentials: "include",
    });
    location.href = "http://localhost";
    console.log(response.status);
  } catch (err) {
    console.error(err);
  }
};
