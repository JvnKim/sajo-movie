// ------------------display  and event ------------------------

/*
  문서 API  작성 하는 함수

*/

import { cardClickEvent, genreBtnClickEvent } from './eventListener.js';

//#region  [작성자 : 김민곤]
// 영화 카드를 생성하는 함수
export function display_MovieCard(movie) {
    const movieDiv = document.createElement('div');
    movieDiv.className = 'card';
    movieDiv.id = 'card';
    movieDiv.innerHTML = `
    <div class="card-image">
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"/>
    </div>
    <div class="card-content">
      <h2>${movie.title}</h2>
      <p>개봉일 : ${movie.release_date}</p>
      <p id="rating">평점 : ${display_ReviewStars(movie.vote_average)}</p>
    </div>
  `;
    // 카드 클릭 이벤트 처리 함수(eventListener.js)
    cardClickEvent(movie, movieDiv);
    return movieDiv;
}

// 영화 목록을 랜더링해 주는 함수
export function display_Movies(movies, divId) {
    const movieListDiv = document.getElementById(divId);
    movieListDiv.innerHTML = ''; // 기존의 영화 카드를 모두 지우고

    movies.forEach((movie) => {
        const movieDiv = display_MovieCard(movie);
        movieListDiv.appendChild(movieDiv);
    });
}

// 스피너 랜더링 하는 함수
export function display_Spinner(isVisible) {
    const spinnerContainer = document.getElementById('spinner-container');
    if (isVisible) {
        spinnerContainer.innerHTML = `<div class="fetch_ing-spinner"></div>`;
    } else {
        spinnerContainer.style.display = 'none';
    }
}

// 장르 버튼 렌더링 하는 함수
export function display_GenreButtons(genres) {
    const buttonContainer = document.getElementById('genres_buttons');
    genres.forEach((key, value) => {
        let btnDiv = document.createElement('div');
        btnDiv.id = 'genre-button';
        btnDiv.innerHTML = `
    <button class="genre-button">${value}</button>`;

        // 장르 버튼 클릭 이벤트 처리 함수(eventListener.js)
        genreBtnClickEvent(key, btnDiv);

        buttonContainer.appendChild(btnDiv);
    });
}

// 별점 별 찍기 [2024.05.04 김민곤]
function display_ReviewStars(num) {
    num = Math.floor(num) / 2;

    let stars = '';
    for (let i = 0; i < num; i++) {
        stars += `⭐`;
    }
    return stars;
}
