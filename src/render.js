// ------------------display  and event ------------------------

/*
  문서 API  작성 하는 함수

*/

import { cardClickEvent, jenreBtnClickEvent } from "./eventListener.js";

// 영화 카드를 생성하는 함수
export function display_MovieCard(movie) {
  const movieDiv = document.createElement("div");
  movieDiv.classList.add("card");
  movieDiv.innerHTML = `
    <div class="card-image">
      <image src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"/>
    </div>
    <div class="card-content">
      <h2>${movie.title}</h2>
      <p>개봉일 : ${movie.release_date}</p>
      <p>평점 : ${Math.floor(movie.vote_average)}/10</p>
      <p>${movie.overview || "정보없음"}</p>
    </div>
  `;
  // 카드 클릭 이벤트 처리 함수(eventListener.js)
  cardClickEvent(movie, movieDiv);
  return movieDiv;
}

// 영화 목록을 랜더링해 주는 함수
export function display_Movies(movies) {
  const movieListDiv = document.getElementById("movieList");
  movieListDiv.innerHTML = ""; // 기존의 영화 카드를 모두 지우고

  movies.forEach((movie) => {
    const movieDiv = display_MovieCard(movie);
    movieListDiv.appendChild(movieDiv);
  });
}

// 스피너 랜더링 하는 함수
export function display_Spinner(isvisible) {
  const spinnerContainer = document.getElementById("spinner-container");
  if (isvisible) {
    spinnerContainer.innerHTML = `<div class="fetch_ing-spinner"></div>`;
  } else {
    spinnerContainer.style.display = "none";
  }
}

// 장르 버튼 렌더링 하는 함수
export function display_JenreButtons(jenres) {
  const buttonContainer = document.getElementById("jenres_buttons");
  jenres.forEach((key, value) => {
    let btnDiv = document.createElement("div");
    btnDiv.id = "jenre-button";
    btnDiv.classList.add("jenre-button");
    btnDiv.innerHTML = `
    <button class="jenre-button">${value}</button>`;

    // 장르 버튼 클릭 이벤트 처리 함수(eventListener.js)
    jenreBtnClickEvent(key, btnDiv);

    buttonContainer.appendChild(btnDiv);
  });
}

// 전은겸 작성 240502 //뭐가 안맞아서 잠깐 주석처리
// // 배우&제작진 표시 함수
// export function display_Credits(credits) {
//   const creditsContainer = document.getElementById("credits");
//   creditsContainer.innerHTML = ""; // 기존 정보 모두 지워

//   credits.forEach((credit) => {
//     const creditDiv = document.createElement("div");
//     creditDiv.classList.add("credit-item");
//     creditDiv.innerHTML = `
//       <img src="https://image.tmdb.org/t/p/w500/${credit.profile_path}" alt="${credit.name}" class="credit-img">
//       <p class="credit-name">${credit.name}</p>
//       <p class="credit-character">${credit.character || "N/A"}</p>
//     `;
//     creditsContainer.appendChild(creditDiv);
//   });
// }
