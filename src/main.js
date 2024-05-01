import { handleSearch } from "./eventListener.js";
import { fetch_Jenres, fetch_Movies } from "./fetch.js";
import { handleMovieCardClick } from "./eventListener.js"; //주현우 작성

/*
  main 애매하다 싶은 함수 들은 일단 다 여기다 넣으세요.
*/

//리다이렉트 함수
function handleRedirect(container) {
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(container).addEventListener("click", function () {
      location.reload(); // 현재 페이지를 새로고침합니다.
    });
  });
}

// 검색 기능
handleSearch();

//장르 항목들 불러오기
fetch_Jenres();
//영화 정보 불러오기
fetch_Movies();

// h1 태그를 누르면 redirect 된다.
handleRedirect("h1");
