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

function renderCards(list) {

    const board = document.querySelector("#mine .board");

    if (!board) return;

    board.innerHTML = "";

    for (const m of list) {

        // article 요소 생성

        const card = document.createElement("article");

        card.className = "card";

        if (m.rating >= 8) {
            card.classList.add("hot");
        }

        const poster = document.createElement("img");

        poster.className = "poster";

        poster.src = posterUrl(m.poster, "w342");

        poster.alt = m.title + " 포스터";

        poster.onerror = function () {

            this.style.display = "none";

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

        description.textContent = m.description;

        info.appendChild(title);

        info.appendChild(year);

        info.appendChild(description);

        card.appendChild(poster);

        card.appendChild(badge);

        card.appendChild(info);

        board.appendChild(card);

    }

    const count = document.getElementById("count");

    if (count) {

        count.textContent = list.length + "편";

    }

}

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

function applySort() {

    const select = document.getElementById("sort");

    if (!select) return;

    const key = select.value;

    const result = sortBy(movies, key, key !== "title");

    renderCards(result);

}

function removeFirstCard() {

    const card = document.querySelector("#mine .board .card");

    if (card) {

        card.remove();

        const count = document.getElementById("count");

        const remaining = document.querySelectorAll("#mine .board .card").length;

        if (count) {

            count.textContent = remaining + "편";

        }

    }

}

renderCards(sortBy(movies, "rating", true));

console.log("평균:", average(movies));

console.log("최고:", best(movies).title);

console.log("8점 이상:", filterByRating(movies, 8).length + "편");

const sorted = sortByRating(movies);

console.log("평점순 1위:", sorted[0].title);

console.log("원본 1번:", movies[0].title);

console.log(yearsSince(movies[0].date) + "년 전 개봉");

console.log(posterUrl(movies[0].poster, "w342"));

console.table(sortByRating(movies));

document.title = "내 영화 " + movies.length + "편";

const output = document.getElementById("out");

if (output && movies.length > 0) {

    output.textContent =
        "평균 " + average(movies).toFixed(1) +
        "점, 최고 " + best(movies).title;

}
```
