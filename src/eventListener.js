import { SearchByJenre } from "./fetch.js";

/*
  이벤트 처리 하는 함수 작성하는 곳
*/

// 장르 버튼 클릭 이벤트 처리 함수
export function jenreBtnClickEvent(key, container) {
  container.addEventListener("click", () => {
    SearchByJenre(key);
  });
}

// 카드 버튼 클릭 이벤트 처리 함수
export const cardClickEvent = (movie, container) => {
  container.addEventListener("click", () => {
    alert(`
        영화 id : ${movie.id}
        영화 제목: ${movie.title}`);
  });
};
