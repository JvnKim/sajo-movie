//2024.05.02 김준영 Comment.js

// function login : login 정보를 저장하는 함수
// 영화ID(movieID), 사용자ID(id), 비밀번호(password), 댓글목록(comments)을 받아서 로컬 스토리지에 저장.
function login(movieId, id, password, comments) {
  localStorage.setItem(
    `movieData_${movieId}`,
    JSON.stringify({ id, password, comments })
  );
}

// function createCommentFrom : 댓글 폼 HTML을 작성하는 함수
// 아이디, 패스워드, 댓글 입력칸을 제공.
// [수정자 : 김민곤  (아이디, 패스워드) / (댓글 작성란/ 목록)  2부분은로 분리]
function createCommentForm() {
  const commentForm = document.createElement("form");
  commentForm.innerHTML = `
  <div id="inputInfo">
        <input type="text" id="idInput" placeholder="아이디">
        <input type="password" id="passwordInput" placeholder="패스워드">
  </div>
  <div id="inputText">
        <textarea id="commentText" placeholder="댓글을 작성하세요..."></textarea>
        <button type="submit">댓글 작성</button>
  </div>
        `;
  return commentForm;
}

// function deleteComment : 댓글을 삭제하는 함수
// 영화 ID와 삭제할 댓글의 인덱스를 받아 해당 댓글을 로컬 스토리지에서 삭제후 페이지 새로고침.
function deleteComment(movieId, index) {
  const movieData =
    JSON.parse(localStorage.getItem(`movieData_${movieId}`)) || {};
  const comments = movieData.comments || [];
  const password = prompt("댓글을 삭제하려면 비밀번호를 입력하세요:");
  if (password !== movieData.password) {
    alert("비밀번호가 일치하지 않습니다. 삭제할 수 없습니다.");
    return;
  }
  comments.splice(index, 1);
  localStorage.setItem(
    `movieData_${movieId}`,
    JSON.stringify({ ...movieData, comments })
  );
  location.reload();
}

// function createCommentContainer : 댓글 컨테이너를 생성하는 함수.
// 영화 ID를 받아 이전에 작성된 댓글들과 댓글 작성폼을 포함한 컨테이너를 만들어 반환.
function createCommentContainer(movieId) {
  const movieData =
    JSON.parse(localStorage.getItem(`movieData_${movieId}`)) || {};

  const comments = movieData.comments || [];

  const commentContainer = document.createElement("div");
  commentContainer.classList.add("comment-container");

  const commentElement = document.createElement("div");
  commentElement.classList.add("comment");

  const commentForm = createCommentForm();
  commentElement.appendChild(commentForm);
  commentContainer.appendChild(commentElement);

  const commentFormElement = commentElement.querySelector("form");
  commentFormElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const idInput = commentFormElement.querySelector("#idInput").value;
    const passwordInput =
      commentFormElement.querySelector("#passwordInput").value;
    const commentInput = commentFormElement.querySelector("#commentText").value;
    if (!idInput || !passwordInput || !commentInput) {
      alert("아이디, 패스워드, 댓글을 모두 입력하세요.");
      return;
    }
    const newComment = {
      id: idInput,
      password: passwordInput,
      comment: commentInput,
    };
    const newComments = [...(movieData.comments || []), newComment];
    login(movieId, idInput, passwordInput, newComments);
    location.reload();
  });

  const previousCommentsElement = document.createElement("div");

  previousCommentsElement.className = "commentslist";
  previousCommentsElement.innerHTML = "<h3>댓글</h3>";
  if (comments && comments.length > 0) {
    const commentsList = document.createElement("ul");
    comments.forEach((commentObj, index) => {
      const commentItem = document.createElement("li");
      commentItem.textContent = `${commentObj.comment} by ${commentObj.id}`;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "삭제";
      deleteButton.addEventListener("click", () => {
        deleteComment(movieId, index);
      });
      commentItem.appendChild(deleteButton);
      commentsList.appendChild(commentItem);
    });
    previousCommentsElement.appendChild(commentsList);
  } else {
    previousCommentsElement.innerHTML += "<p>댓글이 없습니다.</p>";
  }
  previousCommentsElement.style.color = "white";
  commentContainer.appendChild(previousCommentsElement);

  return commentContainer;
}

// document > DOMContentLoaded : 문서가 로드되면 실행되는 이벤트 리스너.
// 현재 URL에서 영화 ID를 가져와 댓글 컨테이너를 생성하고 문서의 body에 추가.
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");
  const commentContainer = createCommentContainer(movieId);
  document.body.appendChild(commentContainer);
});
