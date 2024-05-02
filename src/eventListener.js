// import { fetch_SearchByJenre, fetch_SearchMovies } from "./fetch.js";

// /*
//   이벤트 처리 하는 함수 작성하는 곳
// */

// // 장르 버튼 클릭 이벤트 처리 함수
// export function jenreBtnClickEvent(key, container) {
//   container.addEventListener("click", () => {
//     fetch_SearchByJenre(key);
//   });
// }

// // 카드 버튼 클릭 이벤트 처리 함수
// export const cardClickEvent = (movie, container) => {
//   container.addEventListener("click", () => {
//     // alert(`
//     //     영화 id : ${movie.id}
//     //     영화 제목: ${movie.title}`);
//     const movieId = movie.id;
//     if (movieId) { // movieId가 존재하는 경우에만 페이지 이동
//       const detailPageUrl = `/detail.html?id=${movieId}`;
//       window.location.href = detailPageUrl;
//     } else {
//       console.error('영화 ID가 없습니다.'); // 예외 처리
//     }
//   });
// };

// // 검색 폼을 관리하는 함수
// export function handleSearch() {
//   const form = document.querySelector(".search_form");
//   const input = document.getElementById("search_input");

//   form.addEventListener("submit", (event) => {
//     event.preventDefault(); // 기본 동작 중단
//     const searchTerm = input.value;
//     fetch_SearchMovies(searchTerm);
//   });
// }

// // 2024년 5월1일 주현우 작성
// export function handleMovieCardClick() {
//   // 영화 카드를 클릭했을 때 상세 내용 페이지로 이동하는 함수
//   document.querySelectorAll('.movie-card').forEach(card => {
//     card.addEventListener('click', (event) => {
//       const movieId = event.currentTarget.dataset.movieId;
//       if (movieId) { // movieId가 존재하는 경우에만 페이지 이동
//         const detailPageUrl = `/detail.html?id=${movieId}`;
//         window.location.href = detailPageUrl;
//       } else {
//         console.error('영화 ID가 없습니다.'); // 예외 처리
//       }
//     });
//   });




// 2024년 5월1일 주현우 작성
import { fetch_SearchByJenre, fetch_SearchMovies } from "./fetch.js";

export function jenreBtnClickEvent(key, container) {
  container.addEventListener("click", () => {
    fetch_SearchByJenre(key);
  });
}

export const cardClickEvent = (movie, container) => {
  container.addEventListener("click", () => {
    const movieId = movie.id;
    if (movieId) {
      const detailPageUrl = `/detail.html?id=${movieId}`;
      window.location.href = detailPageUrl;
    } else {
      console.error('영화 ID가 없습니다.'); 
    }
  });
};

export function handleSearch() {
  const form = document.querySelector(".search_form");
  const input = document.getElementById("search_input");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); 
    const searchTerm = input.value;
    fetch_SearchMovies(searchTerm);
  });
}

export function handleMovieCardClick() {
  document.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('click', (event) => {
      const movieId = event.currentTarget.dataset.movieId;
      if (movieId) {
        const detailPageUrl = `/detail.html?id=${movieId}`;
        window.location.href = detailPageUrl;
      } else {
        console.error('영화 ID가 없습니다.');
      }
    });
  });
}
