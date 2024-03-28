const listElem = document.getElementById("list");

class Board {
  static count = 1;
  #id;
  #title;
  #writer;
  #createdAt;
  #content;
  #isNotice = false;
  constructor(title, writer, content) {
    this.#id = Board.count++;
    this.#title = title;
    this.#writer = writer;
    this.#content = content;
    this.#createdAt = this.#createDate();
  }

  #createDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  getId = () => this.#id;
  getTitle = () => this.#title;
  getWriter = () => this.#writer;
  getCreatedAt = () => this.#createdAt;
  getContent = () => this.#content;
  getIsNotice = () => this.#isNotice;
}
// console.log(new Board(1, "오늘의 점심은?", "이정배"));

const list = [
  new Board("오늘의 점심은?", "이정배", ""),
  new Board("오늘의 저녁은?", "이승배", ""),
  new Board("오늘의 과제는?", "방지완", ""),
];
console.log(list);

const reload = () => {
  listElem.innerHTML = `<li class="header">
<ul class="row">
  <li class="num box-center">번호</li>
  <li class="title box-center">제목</li>
  <li class="writer box-center">글쓴이</li>
  <li class="createdAt box-center">등록일</li>
</ul>
</li>`;

  list.forEach((item) => {
    listElem.innerHTML += `</li>
    <li class="item${item.getIsNotice() ? "  notice" : ""}">
      <ul class="row">
        <li class="num box-center">${item.getId()}</li>
        <li class="title ">${item.getTitle()}</li>
        <li class="writer box-center">${item.getWriter()}</li>
        <li class="createdAt box-center">${item.getCreatedAt()}</li>
      </ul>
    </li>`;
  });
};
reload();

document.getElementById("add-btn").onclick = (e) => {
  e.preventDefault(); //버튼의 기본 기능을 멈춰준다.
  // 링크를 타는 일도 불가능하게 만든다.(a태그)
  list.push(
    new Board(
      e.target.form.title.value,
      e.target.form.writer.value,
      "\t".concat(e.target.form.content.value)
    )
  );

  e.target.form.title.value =
    e.target.form.writer.value =
    e.target.form.content.value =
      "";
  reload();
};
//클래스와 버튼들에 textarea관련된 변수 및 식들을 추가했다.

function goBoard(idx) {
  document.getElementById("titleBoard").innerText = list[idx].getTitle();
  document.getElementById("writerBoard").innerText = list[idx].getWriter();
  document.getElementById("createdAtBoard").innerText =
    list[idx].getCreatedAt();
  document.getElementById("contentBoard").innerText = list[idx].getContent();
}

document.getElementById("list").onclick = (e) => {
  console.log(e.target.parentNode);
  let idx = -1;
  for (let i = 1; i < document.getElementsByClassName("row").length; i++) {
    if (e.target.parentNode == document.getElementsByClassName("row")[i]) {
      idx = i;
      break;
    }
  }
  if (idx == -1) return;
  goBoard(idx - 1);
};
