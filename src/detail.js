// URL에서 영화 ID 추출
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

// 영화 정보 가져오기
async function fetchMovieDetails() {
    try {
        // movieId가 null이 아닌 경우에만 API 요청을 보냄
        if (movieId) {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&api_key=2398811a7d146c725b3ad2f4d57c66f0&append_to_response=credits`
            );
            const data = await response.json();
            return data;
        } else {
            console.error("영화 ID가 없습니다.");
            return null;
        }
    } catch (error) {
        console.error("영화 정보를 가져오는 중에 오류가 발생했습니다:", error);
        return null;
    }
}

// 별점 표시 함수
function displayRating(rating) {
  const ratingElement = document.getElementById("rating");
  const stars = "⭐️".repeat(Math.floor(rating / 2));
  const average = (rating / 2).toFixed(2);
  ratingElement.textContent = `평점: ${average} ${stars}`;
}

// 출연진 및 감독의 프로필 이미지와 추가 정보 표시 
function displayCastAndDirectorsProfile(movie) {
    const castProfiles = document.getElementById("castList");
    const directorsProfiles = document.getElementById("directorsList");

    movie.credits.cast.forEach((actor) => {
        let actorInfo = document.createElement("div");
        actorInfo.className = "profile-item";
        actorInfo.innerHTML = `<img src="${actor.profile_path
                ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                : "no-image-V3.png"
            }" alt="${actor.name}">
                               <p>${actor.name}</p>`;
        castProfiles.appendChild(actorInfo);
    });

    movie.credits.crew
        .filter((crewMember) => crewMember.department === "Directing")
        .forEach((director) => {
            let directorInfo = document.createElement("div");
            directorInfo.className = "profile-item";
            directorInfo.innerHTML = `<img src="${director.profile_path
                    ? `https://image.tmdb.org/t/p/w200/${director.profile_path}`
                    : "no-image-V3.png"
                }" alt="${director.name}">
                                  <p>${director.name}</p>`;
            directorsProfiles.appendChild(directorInfo);
        });
}

// 영화 정보 화면에 표시하는 함수
async function displayMovieDetails() {
    const movie = await fetchMovieDetails();
    if (!movie) return; // 영화 정보가 없을 경우 함수 종료

    const posterElement = document.getElementById("poster");
    const titleElement = document.getElementById("title");
    const genreElement = document.getElementById("genre");
    const runtimeElement = document.getElementById("runtime");
    const overviewElement = document.getElementById("overview");
    const releaseDateElement = document.getElementById("releaseDate");

    posterElement.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    titleElement.textContent = movie.title;
    genreElement.textContent =
        "장르: " + movie.genres.map((genre) => genre.name).join(", ");
    displayRating(Math.round(movie.vote_average));

    // 런타임, 줄거리, 개봉일 표시
    runtimeElement.textContent = "런타임: " + movie.runtime + "분";
    overviewElement.textContent = movie.overview
        ? "줄거리: " + movie.overview
        : "줄거리 업데이트 중입니다.";
    releaseDateElement.textContent = "개봉일: " + movie.release_date;

    displayCastAndDirectorsProfile(movie);
}

// 페이지 로드 시 영화 정보 가져와서 표시
window.addEventListener("load", function () {
    displayMovieDetails();
});