const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("input", displayMatches);

fetch(endpoint)
  .then(res => {
    if (!res.ok) throw new Error("Bad response");
    return res.json();
  })
  .then(data => cities.push(...data))
  .catch(error => console.error(error));

function findMatches(wordToMatch, cities) {
  return cities.filter(
    place =>
      place.city.includes(wordToMatch) || place.state.includes(wordToMatch)
  );
}

function displayMatches() {
  let matchesHTML = "";
  const matches = findMatches(this.value, cities);
  const regEx = new RegExp(this.value, "gi");

  console.log(matches);

  matches.map(match => {
    const city = match.city.replace(
      regEx,
      `<span class='hl'>${this.value}</span>`
    );

    const state = match.state.replace(
      regEx,
      `<span class='hl'>${this.value}</span>`
    );

    const population = new Intl.NumberFormat(undefined).format(
      match.population
    );

    matchesHTML += `
    <li>
      <span class="name">${city}, ${state}</span>
      <small>Pop: ${population}</small> 
    </li>
  `;
  });

  suggestions.innerHTML = "";
  suggestions.insertAdjacentHTML("afterbegin", matchesHTML);
}
