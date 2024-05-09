// 2024년 5월1일 주현우 작성
import { fetch_SearchByGenre, fetch_SearchMovies } from './fetch.js';

export function genreBtnClickEvent(key, container) {
    container.addEventListener('click', () => {
        fetch_SearchByGenre(key);
    });
}

export const cardClickEvent = (movie, container) => {
    container.addEventListener('click', () => {
        const movieId = movie.id;
        if (movieId) {
            const detailPageUrl = `/detail.html?id=${movieId}`;
            window.location.href = detailPageUrl;
        } else {
            console.error('영화 ID가 없습니다.');
            console.error('영화 ID가 없습니다.'); // 예외 처리
        }
    });
};

// 영화 카드를 클릭했을 때 상세 내용 페이지로 이동하는 함수
document.querySelectorAll('.movie-card').forEach((card) => {
    card.addEventListener('click', () => {
        const movieId = card.dataset.movieId;
        const detailPageUrl = `/detail.html?id=${movieId}`;
        window.location.href = detailPageUrl;
    });
});

// 검색 폼을 관리하는 함수
export function handleSearch() {
    const form = document.querySelector('.search_form');
    const input = document.getElementById('search_input');
    const searchIcon = document.getElementById('search_icon');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // 폼 제출 기본 동작 중단
        const searchTerm = input.value.trim(); // 공백 제거 후 검색어 가져오기
        if (!searchTerm) {
            console.log('검색어가 입력되지 않았습니다.');
            return; // 검색어가 비어 있으면 처리 중지
        }
        try {
            await fetch_SearchMovies(searchTerm);
            // 검색 완료 후 입력창 숨기기
            input.value = ''; // 입력 필드 초기화
            input.style.width = '0';
            input.style.opacity = '0';
        } catch (error) {
            console.error('Search failed:', error);
        }
    });

    // 검색 아이콘 클릭 이벤트

    // 2024.5.3 운성
    searchIcon.addEventListener('click', () => {
        if (input.style.width === '0px' || input.style.width === '') {
            input.style.width = '240px';
            input.style.opacity = '1';
            input.focus();
        } else {
            input.style.width = '0';
            input.style.opacity = '0';
            input.value = ''; // 추가: 입력 필드 초기화
        }
    });

    input.addEventListener('input', () => {
        if (input.value.length > 0) {
            input.style.width = '240px';
            input.style.opacity = '1';
        }
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.style.width = '0';
            input.style.opacity = '0';
        }
    });
}

export function handleMovieCardClick() {
    document.querySelectorAll('.movie-card').forEach((card) => {
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
