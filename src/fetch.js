import {
  display_JenreButtons,
  display_Movies,
  display_Spinner,
} from "./render.js";

const TBDB_URL = "https://api.themoviedb.org/3";
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

// 초기 영화 목록을 불러오는 함수
export async function fetch_Movies() {
  display_Spinner(true); // 스피너 실행
  await fetch(`${TBDB_URL}/movie/now_playing?language=ko-KR&page=1`, options)
    .then((response) => response.json())
    .then((data) => {
      display_Spinner(false); // 데이터를 가져왔으면 스피너 숨김
      const movies = data.results; // 영화 목록을 저장
      // 영화 출력해주기
      display_Movies(movies, document.getElementById("movieList")); // render.js 함수
    })
    .catch((error) => {
      console.log(error);
    });
}

// 장르 목록을 불러오는 함수
export async function fetch_Jenres() {
  await fetch(`${TBDB_URL}/genre/movie/list?language=en`, options)
    .then((response) => response.json())
    .then((data) => {
      const jenres = new Map(data.genres.map((item) => [item.name, item.id]));
      // 장르 버튼 출력하는 함수
      display_JenreButtons(jenres); // render.js 함수
    })
    .catch((error) => {
      console.log(error);
    });
}

// 검색 결과 가져오기 (수정 및 테스트 완료)
export async function fetch_SearchMovies(keyword) {
  await fetch(
    `${TBDB_URL}/search/movie?query=${keyword}&language=ko-KR&page=1&include_adult=false`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      let filteredMovies = data.results;

      // 영화 출력해주기
      display_Movies(filteredMovies); // render.js 함수
    })
    .catch((err) => console.error(err));
}

// 장르에 따른 영화 목록을 찾아서 불러오는 함수
export async function fetch_SearchByJenre(genreId) {
  display_Spinner(true);
  await fetch(
    `${TBDB_URL}/discover/movie?with_genres=${genreId}&language=ko-KR&page=1`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      // 영화 출력해주기
      display_Movies(movies, document.getElementById("movieList")); // render.js 함수 파일
      display_Spinner(false);
    })
    .catch((err) => console.error(err));
}