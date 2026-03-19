const API_KEY = "3bd31859";

const input = document.getElementById("search");
const results = document.getElementById("results");

let timeout;


input.addEventListener("input", (e) => {
  clearTimeout(timeout);

  const query = e.target.value.trim();

  timeout = setTimeout(() => {
    searchMovies(query);
  }, 500);
});

async function searchMovies(query) {

  if (query.length < 3) {
    results.innerHTML = "";
    return;
  }

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
    );

    const data = await res.json();


    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      results.innerHTML = "<p>Нічого не знайдено</p>";
    }

  } catch (error) {
    results.innerHTML = "<p>Помилка з'єднання</p>";
  }
}

function displayMovies(movies) {
  results.innerHTML = movies.map(movie => `
    <div class="movie">
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <p>${movie.Type}</p>
    </div>
  `).join("");
}