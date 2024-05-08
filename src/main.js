import { handleSearch, handleMovieCardClick } from "./eventListener.js";
import { fetch_Genres, fetch_MovieList, fetch_Movies } from "./fetch.js";
// import { handleMovieCardClick } from "./eventListener.js"; //주현우 작성
import "./detail.js"; // 전은겸 작성

// main과 sub 화면 바꾸는 함수 [김민곤 작성]
function checkAndToggleVisibility() {
  const searchContainer = document.getElementById("subBody");
  const movieListContainer = document.getElementById("mainBody");

  if (searchContainer.children.length > 0) {
    // searchMovieListContainer에 자식 요소가 있으면 movieListContainer를 숨깁니다.
    movieListContainer.style.display = "none";
    searchContainer.style.display = "grid";
  } else {
    // searchMovieListContainer에 자식 요소가 없으면 movieListContainer를 보여줍니다.
    movieListContainer.style.display = "block";
    searchContainer.style.display = "none";
  }
}

// 페이지 로드 시 검사를 실행합니다.
document.addEventListener("DOMContentLoaded", checkAndToggleVisibility);

// searchMovieListContainer의 변경 사항을 감시합니다. (예: 자식 요소가 추가되거나 제거될 때)
const observer = new MutationObserver(checkAndToggleVisibility);
observer.observe(document.getElementById("subBody"), {
  childList: true, // 자식 요소의 추가 및 제거를 관찰합니다.
});

// 2024.5.3 운성 수정
function updateSliderWithMovies(movies) {
  const slider = document.getElementById("movieSlider");
  slider.innerHTML = "";

  movies.forEach((movie) => {
    // console.log("Movie data:", movie); // API에서 받은 데이터 확인
    const genres = movie.genres.map((genre) => genre.name).join(", ");
    const overview = movie.overview || "정보 없음";

    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
      movie.title
    }" class="slide-img">
          <div class="movie-info">
              <h3>${movie.title}</h3>
              <p>개봉일: ${movie.release_date}</p>
              <p>평점: ${Math.floor(movie.vote_average)}/10</p>
          </div>
      `;
    slider.appendChild(slide);
  });
}

// 운성

// 페이지를 맨 위로 스크롤하는 함수
function scrollTopFunction() {
  document.body.scrollTop = 0; // Safari
  document.documentElement.scrollTop = 0;
}

// 위로 스크롤 버튼 요소를 가져옵니다.
var scrollTopBtn = document.querySelector(".scrollTop");

// 스크롤 이벤트를 추가하여 버튼이 스크롤되면 표시되도록 합니다.
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 20) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

// 위로 스크롤 버튼을 클릭했을 때 페이지가 맨 위로 스크롤되도록 합니다.
scrollTopBtn.addEventListener("click", function () {
  scrollTopFunction();
});

//리다이렉트 함수
function handleRedirect(container) {
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(container).addEventListener("click", function () {
      location.reload(); // 현재 페이지를 새로고침합니다.
    });
  });
}

//리다이렉트 함수
handleSearch();

//장르 항목들 불러오기
fetch_Genres();

//영화 정보 불러오기
fetch_Movies();
//영화 정보 불러오기 장르별로[2024.05.04]김민곤
//Fantasy id = 14
fetch_MovieList(14, "Fantasy");
//Action id = 28
fetch_MovieList(28, "Action");
//Comedy id = 35
fetch_MovieList(35, "Comedy");

// handleRedirect("h1");

handleMovieCardClick(); // 수정된 부분