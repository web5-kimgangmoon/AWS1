# 댓글 삽입 완료

- 답글있는 댓글이라 굉장히 까다로웠다. 양 자체는 의외로 그렇게까진 많지 않은 것 같은데, html 구조를 짜는게 까다로워서 몇몇 태그를 새로 추가하고, 몇 번씩 form 위치를 쓰고 고치고를 반복했다.
- css 쪽은 after을 이용한 작은 외곽선을 position을 이용해 모양을 내는 것이지만, 다행히 전에 게시판을 만들면서 경험한 덕에 빨리 끝냈다.
- op.gg를 번갈아 들여다보면서 모양만 적당히 작성했다. 몇 시간 걸쳐서

추가한 html

```html
<div class="comment">
  <div class="primaryComment">
    <form action="./" method="post" class="commentForm">
      <div class="recommend">
        <button type="button" class="recommendBtn">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-type="default"
            class="upPainting"
          >
            <path
              d="M12.8215 10.4987L8.55564 4.31749C8.48688 4.21791 8.40159 4.13798 8.30561 4.08318C8.20963 4.02837 8.10524 4 7.9996 4C7.89396 4 7.78957 4.02837 7.69359 4.08318C7.59761 4.13798 7.51231 4.21791 7.44355 4.31749L3.17768 10.4987C2.77056 11.0887 3.1081 12 3.73373 12H12.2667C12.8923 12 13.2299 11.0887 12.8215 10.4987Z"
            ></path>
          </svg></button
        ><span>36</span
        ><button type="button" class="recommendBtn">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-type="default"
            class="downPainting"
          >
            <path
              d="M12.8215 10.4987L8.55564 4.31749C8.48688 4.21791 8.40159 4.13798 8.30561 4.08318C8.20963 4.02837 8.10524 4 7.9996 4C7.89396 4 7.78957 4.02837 7.69359 4.08318C7.59761 4.13798 7.51231 4.21791 7.44355 4.31749L3.17768 10.4987C2.77056 11.0887 3.1081 12 3.73373 12H12.2667C12.8923 12 13.2299 11.0887 12.8215 10.4987Z"
            ></path>
          </svg>
        </button>
      </div>
    </form>

    <div class="commentContent">
      <div class="contentFir">
        <div class="img"><img src="./../imgs/icon-level-3.png" /></div>
        <span class="cmtWriter">오라클</span><span>8시간 전</span>
      </div>
      <div class="contentSec">설마 푸틴이 당신도?</div>
      <div class="contentThird">
        <span>신고</span>
        <div class="img"><img src="./../imgs/icon-reply@2x.png" /></div>
        <span>답글 쓰기</span>
      </div>
    </div>
  </div>
  <ul class="reply-list">
    <li>
      <div class="replyShape"></div>
      <div class="commentContent">
        <div class="contentFir">
          <div class="img"><img src="./../imgs/icon-level-3.png" /></div>
          <span class="cmtWriter">오라클</span><span>8시간 전</span>
        </div>
        <div class="contentSec"><span>또똬뿌</span>설마 푸틴이 당신도?</div>
        <div class="contentThird">
          <span>신고</span>
          <div class="img"><img src="./../imgs/icon-reply@2x.png" /></div>
          <span>답글 쓰기</span>
        </div>
      </div>
    </li>
  </ul>
</div>
```

추가한 css

```css
.board .body .list-box .comment-box .comment-list form,
.board .body .list-box .comment-box .sort {
  background-color: transparent;
}
.board .body .list-box .comment-box .comment-list form {
  padding: 0.5rem;
}
.board .body .list-box .comment-box .sort {
  border-bottom: 1px solid #ebeef1;
  padding-top: 0;
  padding-bottom: 0;
}

.board .body .list-box .comment-box .sort #likeSort {
  color: green;
  border-bottom: 3px solid #16ae81;
}

.board .body .list-box .comment-box .sort button {
  background-color: transparent;
  border: unset;
  cursor: pointer;
  padding: 1rem 1rem;
  color: gray;
  font-size: 1rem;
  margin: 0;
}

.board .body .list-box .comment-box .comment-list .comment {
  display: flex;
  flex-direction: column;
  min-height: 6rem;
}
.board .body .list-box .comment-box .comment-list .comment .primaryComment {
  display: flex;
  align-items: center;
}

.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .primaryComment
  form
  .recommend {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 3rem;
}
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .primaryComment
  .commentContent,
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .reply-list
  li
  .commentContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .primaryComment
  .commentContent
  div,
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .reply-list
  li
  .commentContent
  div {
  display: flex;
  align-items: center;
  position: relative;
  /* justify-content: center; */
}
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .primaryComment
  .commentContent
  div
  .img,
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .reply-list
  li
  .commentContent
  div
  .img {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  object-fit: cover;
}
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .primaryComment
  .commentContent
  div
  .img
  img,
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .reply-list
  li
  .commentContent
  div
  .img
  img {
  width: 100%;
  height: 100%;
}
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .primaryComment
  .commentContent
  div,
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .reply-list
  li
  .commentContent
  div {
  padding: 0.2rem 0 0.2rem 0;
}
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .primaryComment
  .commentContent
  div
  span,
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .reply-list
  li
  .commentContent
  div
  span {
  color: lightgray;
  padding-right: 1rem;
}
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .primaryComment
  .commentContent
  div
  .cmtWriter,
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .reply-list
  li
  .commentContent
  div
  .cmtWriter {
  color: black;
  font-weight: 800;
  /* justify-content: center; */
}
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .primaryComment
  .commentContent
  div
  .cmtWriter::after,
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .reply-list
  li
  .commentContent
  div
  .cmtWriter::after {
  content: " ";
  display: inline-block;
  height: 35%;
  top: 13;
  bottom: 0;
  padding: 0 0.2rem 0 0.2rem;
  position: absolute;
  border-right: 1px solid #ebeef1;
}
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .primaryComment
  .commentContent
  .contentSec,
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .reply-list
  li
  .commentContent
  .contentSec {
  word-break: break-all;
  white-space: pre-line;
  font-size: 0.9rem;
}
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .primaryComment
  .commentContent
  .contentSec
  span,
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .reply-list
  li
  .commentContent
  .contentSec
  span {
  padding: 0;
  margin: 0.3rem;
  background-color: greenyellow;
  color: #16ae81;
}

.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .primaryComment
  .commentContent
  .contentThird,
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .reply-list
  li
  .commentContent
  .contentThird {
  font-size: 0.9rem;
}
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .primaryComment
  .commentContent
  .contentThird
  .img,
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .reply-list
  li
  .commentContent
  .contentThird
  .img {
  display: inline-block;
  margin-left: 0.8rem;
  width: 1rem;
  height: 1rem;
  object-fit: cover;
}
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .primaryComment
  .commentContent
  .contentThird
  span:last-child,
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .reply-list
  li
  .commentContent
  .contentThird
  span:last-child {
  padding-left: 0.4rem;
}
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .primaryComment
  form
  .recommend
  .recommendBtn {
  border: 0;
  background-color: transparent;
}

.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .primaryComment
  form
  .recommend
  .recommendBtn
  .upPainting,
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .primaryComment
  form
  .recommend
  .recommendBtn
  .downPainting {
  fill: gainsboro;
}
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .primaryComment
  form
  .recommend
  .recommendBtn
  .downPainting {
  transform: rotate(180deg);
}
.board .body .list-box .comment-box .comment-list .comment .reply-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin: 0;
  background-color: #f8f9fa;
}
.board .body .list-box .comment-box .comment-list .comment .reply-list li {
  display: flex;
  flex: 1;
}
.board
  .body
  .list-box
  .comment-box
  .comment-list
  .comment
  .reply-list
  li
  .replyShape {
  margin-left: 4rem;
  margin-top: 0.6rem;
  margin-right: 1rem;
  width: 0.6rem;
  height: 0.6rem;
  border-left: 1px solid gray;
  border-bottom: 1px solid gray;
}
```
