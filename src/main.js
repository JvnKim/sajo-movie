// import { handleSearch } from "./eventListener.js";
// import { fetch_Jenres, fetch_Movies } from "./fetch.js";
// import { handleMovieCardClick } from "./eventListener.js"; //2024년 5월1일 주현우 작성
// /*
//   main 애매하다 싶은 함수 들은 일단 다 여기다 넣으세요.
// */

// //리다이렉트 함수
// function handleRedirect(container) {
//   document.addEventListener("DOMContentLoaded", function () {
//     document.querySelector(container).addEventListener("click", function () {
//       location.reload(); // 현재 페이지를 새로고침합니다.
//     });
//   });
// }

// // 검색 기능
// handleSearch();

// //장르 항목들 불러오기
// fetch_Jenres();
// //영화 정보 불러오기
// fetch_Movies();

// // h1 태그를 누르면 redirect 된다.
// handleRedirect("h1");

// // 영화 카드 클릭 이벤트 처리 함수 호출 (2024년 5월1일 주현우 작성)
// handleMovieCardClick();

import { handleSearch, handleMovieCardClick } from './eventListener.js';
import { fetch_Jenres, fetch_Movies } from './fetch.js';
// import { handleMovieCardClick } from "./eventListener.js"; //주현우 작성
import './detail.js'; // 전은겸 작성

// 2024.5.3 운성 수정

function updateSliderWithMovies(movies) {
    const slider = document.getElementById('movieSlider');
    slider.innerHTML = '';

    movies.forEach((movie) => {
        console.log('Movie data:', movie); // API에서 받은 데이터 확인
        const genres = movie.genres.map((genre) => genre.name).join(', ');
        const overview = movie.overview || '정보 없음';

        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="slide-img">
          <div class="movie-info">
              <h3>${movie.title}</h3>
              <p>개봉일: ${movie.release_date}</p>
              <p>평점: ${movie.vote_average}/10</p>
              <p>장르: ${genres}</p>
              <p>요약: ${overview}</p>
          </div>
      `;
        slider.appendChild(slide);
    });
}

// 운성

//리다이렉트 함수
function handleRedirect(container) {
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelector(container).addEventListener('click', function () {
            location.reload(); // 현재 페이지를 새로고침합니다.
        });
    });
}

//리다이렉트 함수
handleSearch();

//장르 항목들 불러오기
fetch_Jenres();

//영화 정보 불러오기
fetch_Movies();

handleRedirect('h1');

handleMovieCardClick(); // 수정된 부분
