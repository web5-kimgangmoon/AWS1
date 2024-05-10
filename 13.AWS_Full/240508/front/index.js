const categoryList = [
  { name: "전체", href: "./" },
  {
    name: "정보",
    href: "./",
    categorys: [
      {
        name: "OP.GG 기획",
        href: "./",
      },
      { name: "유저 뉴스", href: "./", isWrite: true },
      { name: "팁과 노하우", href: "./", isWrite: true },
      { name: "패치노트", href: "./" },
    ],
  },
  {
    name: "커뮤니티",
    href: "./",
    categorys: [
      { name: "자유", href: "./", isWrite: true },
      { name: "유머", href: "./", isWrite: true },
      { name: "질문", href: "./", isWrite: true },
      { name: "영상", href: "./", isWrite: true },
      { name: "사건 사고", href: "./", isWrite: true },
      { name: "전적 인증", href: "./", isWrite: true },
      { name: "팬 아트", href: "./", isWrite: true },
    ],
  },
  {
    name: "e스포츠",
    href: "./",
    categorys: [
      { name: "LCK", href: "./", isWrite: true },
      { name: "기타 리그", href: "./", isWrite: true },
    ],
  },
];

const cateElem = document.getElementById("category-list");

categoryList.forEach((cate1) => {
  let str = "";
  if (cate1.categorys) {
    str += `
    <li>
      <a href="${cate1.href}">
        <h4>${cate1.name}<span>&gt</span></h4>
      </a>
      <ul>`;
    cate1.categorys.forEach((cate2) => {
      str += `
        <li>
          <a href="${cate2.href}"><span>${cate2.name}</span></a>
        </li>`;
    });
    str += `
      </ul>
    </li>`;
  } else {
    str += `
    <li>
      <a href="${cate1.href}"><h4>${cate1.name}</h4></a>
    </li>`;
  }
  cateElem.innerHTML += str;
});

const linkList = [
  { name: "유저 찾기", href: "./", img: "./imgs/icon-community-lfg.png" },
  { name: "양성소", href: "./", img: "./imgs/icon-community-subculture.png" },
  { name: "잡담소", href: "./", img: "./imgs/icon-community-talk.png" },
];

const linkListElem = document.getElementById("link-list");

linkList.forEach((link) => {
  linkListElem.innerHTML += `
  <li>
    <a href="${link.href}">
      <div class="link-item">
        <div class="img-box">
          <img src="${link.img}" alt="" />
        </div>
        <span>${link.name}</span>
      </div>
    </a>
  </li>`;
});

const tempArr = [...categoryList];
const cateSeleElem = document.getElementById("category");

for (let i = 0; i < tempArr.length; ++i) {
  cateSeleElem.innerHTML += `<option value="${tempArr[i].href}">${tempArr[i].name}</option>`;
  if (tempArr[i].categorys) tempArr.push(...tempArr[i].categorys);
}

const listElem = document.getElementById("list");

for (let i = 0; i < 40; i++)
  listElem.innerHTML += `<li>
<a href="./">
  <div class="item">
    <div class="like">
      <p>▲</p>
      <p>123</p>
    </div>
    <div class="text">
      <h4>단톡방 자아분열 <span>[32]</span></h4>
      <p>유머 | 2시간 전 | 더레이더</p>
    </div>
    <div class="img">
      <img src="./imgs/bg_lol.jpg" alt="" />
    </div>
  </div>
</a>
</li>`;

const userInfoElem = document.getElementById("user-info");
(async () => {
  const user = (
    await axios.post(
      "http://localhost:8000/user/info",
      { id: 1 }, // body
      {
        headers: { "content-type": "application/json" },
        withCredentials: true,
      } // option
    )
  ).data;

  console.log(user);

  if (user.user) {
    userInfoElem.innerHTML = `<div class="user-level">
    <div class="level-img">
      <img src="../imgs/icon-community-lfg.png" alt="" />
    </div>
    <div class="name-level">
      <div class="user-name">${user.user}</div>
      <div class="user-now-level">레벨 1</div>
      <div class="user-level-bar"></div>
      <div class="next-level">다음 레벨까지 11 남음</div>
    </div>
  </div>  
  <div class="user-menu">
    <div class="user-write-comment">
      <div class="user-writed">
        <a href="./"><button>내가 쓴 글</button></a>
      </div>
      <div class="user-comment">
        <a href="./"><button>내가 쓴 댓글</button></a>
      </div>
    </div>
    <div class="user-ward-write">
      <div class="user-ward">
        <a href="./"><button>내 와드</button></a>
      </div>
      <div class="user-write">
        <a href="/write"><button>글 쓰기</button></a>
      </div>
    </div>
    <div class="user-link">
      <a href="./">
        <button>게임 계정 연결</button>
      </a>
    </div>
  </div>`;
  }
})();

const ranklist = document.getElementById("rank-list");
const rankInfo = [
  {
    cate: "MSI",
    title: "[이벤트] MSI 경기 스코어 예측 이벤트 (T1 vs G2)",
    href: "./",
  },
  {
    cate: "MSI",
    title: "[이벤트] MSI 경기 스코어 예측 이벤트 (T1 vs G2)",
    href: "./",
  },
  { cate: "유머", title: "마을에 여자가 1명이어도 행복한 이유", href: "./" },
  { cate: "유머", title: "마왕과 친구?가 된 용사", href: "./" },
  {
    cate: "유머",
    title: "연인사이 이 정도 연락 당연하다 vs 빡세다",
    href: "./",
  },
  { cate: "유머", title: "일 뽕 특 징", href: "./" },
  { cate: "유머", title: "머리 아니.. 그냥 좆된 디시인.jpg", href: "./" },
  {
    cate: "유머",
    title: "[공지] MSI 경기 스코어 예측 이벤트 당첨자 발표",
    href: "./",
  },
  { cate: "유머", title: "제일 좋아하는 빵 1개만 고르기", href: "./" },
  {
    cate: "유머",
    title: "싱글벙글 한국식 교육 시스템이 안없어지는 이유",
    href: "./",
  },
  {
    cate: "유머",
    title: "허언증이라고 무시당했지만 전설이 된 여초사이트 글",
    href: "./",
  },
  { cate: "유머", title: "너무 낮은 몸값에 충격", href: "./" },
  {
    cate: "유머",
    title: "페이커 피셜 : 내 스킨 고급스럽고 팬분들이 좋아할것같다",
    href: "./",
  },
  { cate: "유머", title: "???:야짤 좀 줘", href: "./" },
];
for (let item of rankInfo) {
  ranklist.innerHTML += `<li><a href="${item.href}">${item.cate} · ${item.title}</a><li>`;
}
