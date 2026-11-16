
function average(list) {

    let sum = 0;

    for (const m of list) {
        sum += m.rating;
    }

    return sum / list.length;

}


function best(list) {

    let top = list[0];

    for (const m of list) {

        if (m.rating > top.rating) {
            top = m;
        }

    }

    return top;

}


function filterByRating(list, min) {

    return list.filter(m => m.rating >= min);

}


function sortByRating(list) {

    return [...list].sort((a, b) => b.rating - a.rating);

}


function yearsSince(dateStr) {

    return new Date().getFullYear() - new Date(dateStr).getFullYear();

}


function posterUrl(path, size) {

    return "https://image.tmdb.org/t/p/" + size + path;

}


// 영화 카드 생성 함수
function renderCards(list) {

    const board = document.querySelector(".board");

    board.innerHTML = "";

    for (const m of list) {

        const card = document.createElement("article");

        card.className = "card";

        // 평점이 8점 이상이면 hot 클래스 추가
        if (m.rating >= 8) {
            card.classList.add("hot");
        }

        // 포스터가 있는 경우
        if (m.poster) {

            card.innerHTML = `
                <img class="poster"
                     src="${posterUrl(m.poster, "w342")}"
                     alt="${m.title} 포스터">

                <span class="badge">${m.rating.toFixed(1)}</span>

                <div class="info">
                    <h3>${m.title}</h3>
                    <p class="year">${m.year}</p>
                </div>
            `;

        } else {

            card.innerHTML = `
                <div class="poster-fallback">
                    영화 포스터 없음
                </div>

                <span class="badge">${m.rating.toFixed(1)}</span>

                <div class="info">
                    <h3>${m.title}</h3>
                    <p class="year">${m.year}</p>
                </div>
            `;

        }

        // 보드에 카드 추가
        board.appendChild(card);

    }

    // 영화 개수 표시
    document.getElementById("count").textContent =
        list.length + "편";

}


// 정렬 함수
function sortBy(list, key, desc) {

    const copy = [...list];

    copy.sort((a, b) => {

        if (typeof a[key] === "string") {
            return a[key].localeCompare(b[key]);
        }

        return a[key] - b[key];

    });

    if (desc) {
        copy.reverse();
    }

    return copy;

}


// 정렬 선택 상자 연결 함수
function applySort() {

    const key = document.getElementById("sort").value;

    renderCards(
        sortBy(movies, key, key !== "title")
    );

}


// 처음 화면에 영화 카드 출력
renderCards(movies);

