// 영화 평점 평균 구하기
function average(list) {
    let sum = 0;

    for (const m of list) {
        sum += m.rating;
    }

    return list.length === 0 ? 0 : sum / list.length;
}

// 가장 높은 평점의 영화 찾기
function best(list) {
    if (list.length === 0) {
        return null;
    }

    let top = list[0];

    for (const m of list) {
        if (m.rating > top.rating) {
            top = m;
        }
    }

    return top;
}

// 일정 평점 이상의 영화 찾기
function filterByRating(list, min) {
    return list.filter(m => m.rating >= min);
}

// 평점순으로 정렬하기
function sortByRating(list) {
    return [...list].sort((a, b) => b.rating - a.rating);
}

// 개봉 후 경과 연도 계산하기
function yearsSince(dateStr) {
    return new Date().getFullYear() - new Date(dateStr).getFullYear();
}

// TMDB 포스터 주소 만들기
function posterUrl(path, size) {
    return "https://image.tmdb.org/t/p/" + size + path;
}

// 영화 배열을 화면에 카드로 출력하기
function renderCards(list) {
    const board = document.querySelector("#movie-board");

    // 기존 카드를 지워 정렬할 때 카드가 중복되지 않게 합니다.
    board.innerHTML = "";

    for (const m of list) {
        const card = document.createElement("article");
        card.className = "card";

        // 평점이 8점 이상이면 hot 클래스를 추가합니다.
        if (m.rating >= 8) {
            card.classList.add("hot");
        }

        const poster = document.createElement("img");
        poster.className = "poster";
        poster.src = posterUrl(m.poster, "w342");
        poster.alt = m.title + " 포스터";

        poster.onerror = function () {
            card.classList.add("no-poster");
            poster.style.display = "none";

            const fallback = document.createElement("div");
            fallback.className = "poster-fallback";
            fallback.textContent = "영화";
            card.insertBefore(fallback, card.firstChild);
        };

        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = m.rating;

        const info = document.createElement("div");
        info.className = "info";

        const title = document.createElement("h3");
        title.textContent = m.title;

        const year = document.createElement("p");
        year.className = "year";
        year.textContent = "개봉 " + m.date;

        const description = document.createElement("p");
        description.className = "description";
        description.textContent = m.description || "";

        info.appendChild(title);
        info.appendChild(year);

        if (m.description) {
            info.appendChild(description);
        }

        card.appendChild(poster);
        card.appendChild(badge);
        card.appendChild(info);
        board.appendChild(card);
    }

    // 현재 영화 개수를 표시합니다.
    document.getElementById("count").textContent = list.length + "편";
}

// 영화 배열을 원하는 기준으로 정렬하기
function sortBy(list, key, desc) {
    const copy = [...list];

    copy.sort((a, b) => {
        if (typeof a[key] === "string") {
            return a[key].localeCompare(b[key], "ko");
        }

        return a[key] - b[key];
    });

    if (desc) {
        copy.reverse();
    }

    return copy;
}

// 선택 상자의 값에 따라 영화를 다시 정렬하기
function applySort() {
    const key = document.getElementById("sort").value;

    if (key === "title") {
        renderCards(sortBy(movies, key, false));
    } else {
        renderCards(sortBy(movies, key, true));
    }
}

// 콘솔에서 영화 데이터와 함수 실행 결과 확인하기
console.log("평균:", average(movies));
console.log("최고:", best(movies).title);
console.log("8점 이상:", filterByRating(movies, 8).length + "편");

const sorted = sortByRating(movies);
console.log("평점순 1위:", sorted[0].title);
console.log("원본 1번:", movies[0].title);
console.log(yearsSince(movies[0].date) + "년 전 개봉");
console.log(posterUrl(movies[0].poster, "w342"));

// 페이지 제목과 영화 통계 표시
document.title = "내 영화 " + movies.length + "편";

document.getElementById("out").textContent =
    "평균 " + average(movies).toFixed(1) +
    "점, 최고 평점 영화는 " + best(movies).title + "입니다.";

// 처음 화면은 평점순으로 출력합니다.
renderCards(sortBy(movies, "rating", true));
