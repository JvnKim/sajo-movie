import {
  display_GenreButtons,
  display_Movies,
  display_Spinner,
} from "./render.js";

const TMDB_URL = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWZmNmMxY2VhMDUxMTg3ZTYzMTUzYWQyYzYzY2E5ZCIsInN1YiI6IjY0ZTg1ZmU2NTI1OGFlMDE0ZGYyMjZlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LwbMg29luCKo58wfbjsZRD8NXPMkXj3CRD-WwwzGeTk",
  },
};

/*
  API 요청 응답 코드 적는 곳
*/
// 배우 불러오는 함수

// 초기 영화 목록을 불러오는 함수

// 2024.5.3 운성 수정
export async function fetch_Movies() {
  display_Spinner(true);
  try {
    const response = await fetch(
      `${TMDB_URL}/movie/now_playing?language=ko-KR&page=1`,
      options
    );
    const data = await response.json();
    display_Spinner(false);
    display_Movies(data.results, "latestMovies"); // 영화 목록을 화면에 표시
    updateSliderWithMovies(data.results); // 슬라이더 업데이트
  } catch (error) {
    console.error("Error fetching movies:", error);
    display_Spinner(false);
  }
}

async function fetchMovieTrailers(movieId) {
  // const trailerOptions = {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     Authorization:
  //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTUxMjBmOGFmMWJkNmQ0OGU2Y2E4MDAzYmY2ZjAwNiIsInN1YiI6IjY2MjYzNjVkN2E5N2FiMDE3ZDhmMTc3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y0YvIb-StdqiAR5fgypwYHkV8MLZhbAJ5ygnX7ebCcY",
  //   },
  // };

  try {
    const response = await fetch(
      `${TMDB_URL}/movie/${movieId}/videos?language=en-US`,
      options
    );
    const data = await response.json();
    const trailer = data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    return trailer ? trailer.key : null; // YouTube video key if trailer exists
  } catch (error) {
    console.error("Error fetching trailers:", error);
    return null;
  }
}

async function updateSliderWithMovies(movies) {
  const slider = document.getElementById("movieSlider");
  display_Spinner(true);
  slider.innerHTML = ""; // 슬라이더 내용 초기화
  for (const movie of movies) {
    const trailerKey = await fetchMovieTrailers(movie.id); // 트레일러 키 가져오기
    const trailerEmbedUrl = trailerKey
      ? `https://www.youtube.com/embed/${trailerKey}?autoplay=0&mute=1`
      : "";

    const slide = document.createElement("div");
    slide.className = "slide";
    slide.style.display = "none";
    // 트레일러가 있으면 임베드하고, 없으면 메시지 표시
    const iframePart = trailerKey
      ? `<iframe src="${trailerEmbedUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen class="custom-iframe"></iframe>`
      : `<div>트레일러가 없습니다</div>`;

    slide.innerHTML = `
          <div class="slide-content">
              <img src="https://image.tmdb.org/t/p/w500${
                movie.poster_path
              }" alt="${movie.title}" class="slide-img">
              <div class="movie-info">
              ${iframePart}
                  <h3>${movie.title}</h3>
                  <p>개봉일: ${movie.release_date}</p>
                  <p>평점: ${movie.vote_average.toFixed(2)} / 10</p>
                  
              </div>
          </div>
      `;
    slider.appendChild(slide);
    display_Spinner(false);
  }

  startSlider(); // 슬라이더 애니메이션 시작
}

// 2024.05.08 운성 영화 랜덤 슬라이드 수정
function startSlider() {
  let slides = document.querySelectorAll(".slide");
  let currentIndex = 0;
  if (slides.length > 0) {
    let currentIndex = Math.floor(Math.random() * slides.length);
    slides[currentIndex].style.display = "block"; // 첫 번째 슬라이드 표시

    // 슬라이드 변경 주기 설정
    setInterval(() => {
      slides[currentIndex].style.display = "none"; // 현재 슬라이드 숨김
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].style.display = "block"; // 다음 슬라이드 표시
    }, 15000); // 15초마다 슬라이드 변경

    // 버튼 클릭 이벤트 처리
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    prevButton.addEventListener("click", () => {
      slides[currentIndex].style.display = "none"; // 현재 슬라이드 숨김
      currentIndex = (currentIndex - 1 + slides.length) % slides.length; // 이전 슬라이드 인덱스 계산
      slides[currentIndex].style.display = "block"; // 이전 슬라이드 표시
    });

    nextButton.addEventListener("click", () => {
      slides[currentIndex].style.display = "none"; // 현재 슬라이드 숨김
      currentIndex = Math.floor(Math.random() * slides.length); // 랜덤 슬라이드 인덱스 계산
      slides[currentIndex].style.display = "block"; // 다음 슬라이드 표시
    });
  }
}

// 운성

// 장르 목록을 불러오는 함수
export async function fetch_Genres() {
  await fetch(`${TMDB_URL}/genre/movie/list?language=en`, options)
    .then((response) => response.json())
    .then((data) => {
      const genres = new Map(data.genres.map((item) => [item.name, item.id]));
      // 장르 버튼 출력하는 함수
      display_GenreButtons(genres); // render.js 함수
    })
    .catch((error) => {
      console.log(error);
    });
}

// 검색 결과 가져오기 (수정 및 테스트 완료)
export async function fetch_SearchMovies(keyword) {
  try {
    const response = await fetch(
      `${TMDB_URL}/search/movie?query=${encodeURIComponent(
        keyword
      )}&language=ko-KR&page=1&include_adult=false`,
      options
    );
    const data = await response.json();
    let filteredMovies = data.results;

    // 영화 출력해주기
    display_Movies(filteredMovies, "subBody"); // render.js 함수
    // return filteredMovies; // 검색된 영화 데이터를 반환
  } catch (err) {
    console.error(err);
    throw err; // 에러를 호출자에게 전파
  }
}

// 장르에 따른 영화 목록을 찾아서 불러오는 함수
export async function fetch_SearchByGenre(genreId) {
  display_Spinner(true);
  await fetch(
    `${TMDB_URL}/discover/movie?with_genres=${genreId}&language=ko-KR&page=1`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      // 영화 출력해주기
      display_Movies(movies, "subBody"); // render.js 함수 파일
      display_Spinner(false);
    })
    .catch((err) => console.error(err));
}

// 장르아이디, 위치 받아서 영화 목록 출력해 주기
export async function fetch_MovieList(genreId, divId) {
  display_Spinner(true);
  await fetch(
    `${TMDB_URL}/discover/movie?with_genres=${genreId}&language=ko-KR&page=1`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      // 영화 출력해주기
      display_Movies(movies, divId); // render.js 함수 파일
      display_Spinner(false);
    })
    .catch((err) => console.error(err));
}
