// URL에서 영화 ID 추출
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

// 영화 정보 가져오기
async function fetchMovieDetails() {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&api_key=2398811a7d146c725b3ad2f4d57c66f0`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("영화 정보를 가져오는 중에 오류가 발생했습니다:", error);
        return null;
    }
}

// 별점 표시 함수
function displayRating(rating) {
    const ratingElement = document.getElementById("rating");
    const stars = "⭐️".repeat(rating); // 별표 문자열 생성
    const average = rating.toFixed(2); // 평균 평점 계산 및 소수점 두 자리까지 표시
    ratingElement.textContent = `평점: ${average} ${stars}`;
}

// 영화 정보 화면에 표시하는 함수
async function displayMovieDetails() {
    try {
        const movie = await fetchMovieDetails();

        if (!movie) return; // 영화 정보가 없을 경우 함수 종료

        const posterElement = document.getElementById("poster");
        const titleElement = document.getElementById("title");
        const genreElement = document.getElementById("genre");
        const castElement = document.getElementById("cast");
        const directorsElement = document.getElementById("directors");
        const runtimeElement = document.getElementById("runtime"); // 런타임을 표시할 요소 2024년05월03일 주현우 작성
        const overviewElement = document.getElementById("overview"); // 줄거리를 표시할 요소 2024년05월03일 주현우 작성
        const releaseDateElement = document.getElementById("releaseDate"); // 개봉일 표시_전은겸 240503

        posterElement.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        titleElement.textContent = movie.title;
        genreElement.textContent =
            "장르: " + movie.genres.map((genre) => genre.name).join(", ");

        // 별점 표시
        displayRating(Math.round(movie.vote_average));

        // 출연진 정보 표시
        const castList = movie.credits && movie.credits.cast ? movie.credits.cast.map((actor) => actor.name).join(", ") : "";
        castElement.textContent = "출연진: " + castList;

        // 감독 정보 표시
        const directorsList = movie.credits && movie.credits.crew
            ? movie.credits.crew
                .filter((crewMember) => crewMember.department === "Directing")
                .map((crewMember) => crewMember.name)
                .join(", ")
            : "";
        directorsElement.textContent = "감독: " + directorsList;

        // 런타임 표시 2024년05월03일 주현우 작성
        runtimeElement.textContent = "런타임: " + movie.runtime + "분";

        // 줄거리 표시 2024년05월03일 주현우 작성
        overviewElement.textContent = movie.overview ? "줄거리: " + movie.overview : "줄거리 업데이트 중입니다.";

        // 개봉일 표시_전은겸 240503
        releaseDateElement.textContent = "개봉일: " + movie.release_date;
    } catch (error) {
        console.error("영화 정보를 가져오는 중에 오류가 발생했습니다:", error);
    }
}



// 페이지 로드 시 영화 정보 가져와서 표시
window.onload = displayMovieDetails;

// 전은겸 240503 수정 및 추가

