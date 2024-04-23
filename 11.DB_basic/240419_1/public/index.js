const date = new Date();
const dateTitle = `${date.getFullYear()}년 ${(date.getMonth() + 1)
  .toString()
  .padStart(2, "0")}월 ${date.getDate().toString().padStart(2, "0")}일 ${[
  "일",
  "월",
  "화",
  "수",
  "목",
  "금",
  "토",
].at(date.getDay())}요일 과제`;
document.getElementById("todo-head").innerHTML = dateTitle + "의 할일";

(async () => {
  const cookie = document.cookie;
  console.log(cookie);
  if (cookie) {
  } else {
    const regist = await (await fetch("/user/regist")).text();
    document.getElementById("user-box").innerHTML = regist;
  }

  const user = await (await fetch("/user/")).text();
  document.getElementById("user-box").innerHTML += user;
  const list = await (await fetch("/todo/")).text();
  document.getElementById("body").innerHTML = list;
})();
