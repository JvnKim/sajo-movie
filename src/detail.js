// url에서 영화 id 가져오기
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// 영화 정보 가져오기
async function fetchMovieDetails() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&api_key=2398811a7d146c725b3ad2f4d57c66f0`)
    const data = await response.json();
    return data;
}

// 화면에 별점 표시 함수
function displayrating(rating) {
    const ratingElement = document.getElementById('rating');
    const stars = '⭐⭐⭐⭐⭐'.slice(0, rating); // 별표 문자열 생성
    const average = rating.toFixed(2); // 평균 평점 계산 및 소수점 두 자리까지 표시
    ratingElement.textContent = `⭐ ${average}`;
}


// 영화 정보 화면에 표시하는 함수
function displayMovieDetails(movie) {
    const posterElement = document.getElementById('poster');
    const titleElement = document.getElementById('title');
    const genreElement = document.getElementById('genre');
    const releaseDateElement = document.getElementById('creators');
    const castElement = document.getElementById('cast');

    posterElement.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    titleElement.textContent = movie.title;
    genreElement.textContent = "장르: " + movie.genres.map(genre => genre.name).join(', ');

    // 별점 표시
    displayRating(Math.round(movie.vote_average));

    // 출연진 정보 표시
    const castList = movie.credits.cast.map(actor => actor.name).join(', ');
    castElement.textContent = "출연진: " + castList;

    // 크리에이터 정보 표시
    const creatorsList = movie.credits.crew.filter(crewMember => crewMember.department === 'Directing').map(crewMember => crewMember.name).join(', ');
    creatorsElement.textContent = "크리에이터: " + creatorsList;
}

// 페이지 로드 시 영화 정보 가져와서 표시
window.onload = async () => {
    const movie = await fetchMovieDetails();
    displayMovieDetails(movie);
}; 