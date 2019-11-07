/* TODO
 * Search movies by keyword
 *
 */

let API_KEY = "ad8d9250";
var moveE = new MoveE(API_KEY);
var hasResults = false;
var details = document.getElementById("details");
var searchResults = document.getElementById("search-results");
var searchTerm = '';
var page = 1;
var totResults = 10000;

window.onload = function() {
  fetchRandom();
};

document.getElementById("search-form").addEventListener("submit", search);

document.getElementById("random-movie").addEventListener("click", fetchRandom);


async function search(e, append) {
  if(e)
    e.preventDefault();
  key = document.getElementById("search").value;
  searchTerm = key;
  response = await moveE.search(key, page);
  
  if(response.success) {
    console.log(response);
    if(!append) {
      page = 1;
      totResults = parseInt(response.data.totalResults);
    }
    data = response.data.Search;

    items = ''

    data.forEach(function(v) {
      items += `
        <div class="search-item" onclick="loadMovieDetails('${v.imdbID}')">
          <img src="${v.Poster}" />
          <h3 class="search-item-text">${v.Title}</h3>
        </div>
      `
    })

    // template = `
      
    // `
    hasResults = true;

    console.log(page * 10, totResults);
    if(page * 10 < totResults) {
      items += '<button class="load-more" onclick="loadMore(event)" type="button">Load More</button>';
    }

    if(append)
      searchResults.innerHTML += items;
    else
      searchResults.innerHTML = items;
    
    closeDetails();
  } else {
    makeToast(response.message, "danger");
  }
}

function loadMore(e) {
  page++;
  e.target.parentNode.removeChild(e.target);
  search(null, true);
}

async function fetchRandom() {
  result = await loadMovieDetails(getRandomMovieId());
  if (result) makeToast("Here's a random movie to watch.", "info");
}

async function loadMovieDetails(id) {
  closeDetails();
  let response = await moveE.getMovie(id);
  console.log(response);
  if (response.success) {
    let data = response.data;
    let genreList = data.Genre.split(", ");
    let genreHTML = "";

    genreList.forEach(function(v) {
      genreHTML += `<span class="genre">${v}</span>`;
    });
    template = `
    <div class="inner-left">
    <h1 class="movie-title">${data.Title}</h1>
    <h3 class="year">${data.Year}</h3>
    <div class="genre-list">${genreHTML}</div>
    <h3>Plot:</h3>
    <p>
        ${data.Plot}
    </p>

    <p>
        <h3>Details</h3>
        <b>Directed by:</b> ${data.Director}
        <br />
        <b>Cast:</b>
        ${data.Actors}
    </p>
</div>

<div class="inner-right">
  ${
    hasResults
      ? '<div class="align-right larger close-action"><a onclick="closeDetails()" href="#">Close</a></div>'
      : ""
  }
    <img class="poster" src="${data.Poster}" title="${data.Title}" />
    <div class="tag tag-imdb">IMDb: ${data.imdbRating}</div>
    <div class="tag tag-metacritic">Metacritic: ${data.Metascore}</div>
</div>
    `;

    setTimeout(function(){
      details.innerHTML = template;
      searchResults.classList.add('search-blurred');
      details.classList.remove("details-hidden");
    }, 350);
    return true;
  }
  // Error
  makeToast(response.message, "danger");
  return false;
}

// function parseTemplate(template, data) {
//   /*
//     Parse strings with mustache syntax.
//     For example:
//       template = Hello, {{name}}
//       data = {name: 'Darani'}

//       Returns: Hello, Darani
//   */
//   Object.keys(data).forEach(function(key, index) {
//     template = template.replace(new RegExp(`{{\\s*${key}\\s*}}`), data[key]);
//   });
//   return template;
// }

function closeDetails() {
  details.classList.add("details-hidden");
  searchResults.classList.remove('search-blurred');
}

function makeToast(text, type) {
  container = document.getElementById("toast-container");
  container.innerHTML += `<div class="toast toast-active toast-${type}" onclick="dismissToast(event)">
  ${text}
  <span class="toast-dismiss-msg">Click to dismiss.</span>
</div>`;
}

function dismissToast(e) {
  target = e.target;

  while (!target.classList.contains("toast")) {
    target = target.parentNode;
  }
  target.classList.remove("toast-active");
  setTimeout(function() {
    target.classList.add("toast-dismissed");
  }, 100);
  setTimeout(function() {
    target.parentNode.removeChild(target);
  }, 300);
}
function getRandomMovieId() {
  topMovies = [
    "tt0111161",
    "tt0068646",
    "tt0468569",
    "tt0071562",
    "tt0167260",
    "tt0110912",
    "tt0108052",
    "tt0050083",
    "tt7286456",
    "tt1375666",
    "tt0137523",
    "tt0120737",
    "tt0109830",
    "tt0060196",
    "tt0167261",
    "tt0133093",
    "tt0099685",
    "tt0080684",
    "tt0073486",
    "tt0056058",
    "tt6316138",
    "tt3417422",
    "tt0816692",
    "tt0317248",
    "tt0245429",
    "tt0120815",
    "tt0120689",
    "tt0118799",
    "tt0114369",
    "tt0102926",
    "tt0076759",
    "tt0047478",
    "tt0038650",
    "tt6751668",
    "tt4154796",
    "tt4154756",
    "tt2582802",
    "tt1675434",
    "tt0482571",
    "tt0407887",
    "tt0253474",
    "tt0172495",
    "tt0120586",
    "tt0114814",
    "tt0110413",
    "tt0110357",
    "tt0103064",
    "tt0095765",
    "tt0095327",
    "tt0088763",
    "tt0064116",
    "tt0054215",
    "tt0034583",
    "tt0032553",
    "tt0027977",
    "tt0021749",
    "tt8291224",
    "tt8267604",
    "tt8108198",
    "tt5311514",
    "tt5074352",
    "tt4633694",
    "tt2380307",
    "tt1853728",
    "tt1345836",
    "tt1187043",
    "tt0986264",
    "tt0910970",
    "tt0405094",
    "tt0364569",
    "tt0209144",
    "tt0119698",
    "tt0090605",
    "tt0087843",
    "tt0082971",
    "tt0081505",
    "tt0078788",
    "tt0078748",
    "tt0057012",
    "tt0051201",
    "tt0050825",
    "tt0047396",
    "tt0043014",
    "tt2106476",
    "tt1832382",
    "tt1255953",
    "tt0476735",
    "tt0435761",
    "tt0361748",
    "tt0338013",
    "tt0211915",
    "tt0208092",
    "tt0180093",
    "tt0169547",
    "tt0119217",
    "tt0118849",
    "tt0116231",
    "tt0114709",
    "tt0112573",
    "tt0105236",
    "tt0093058",
    "tt0091251",
    "tt0086879",
    "tt0086250",
    "tt0086190",
    "tt0082096",
    "tt0075314",
    "tt0070735",
    "tt0066921",
    "tt0062622",
    "tt0059578",
    "tt0056592",
    "tt0056172",
    "tt0053604",
    "tt0053125",
    "tt0052357",
    "tt0045152",
    "tt0044741",
    "tt0040522",
    "tt0036775",
    "tt0033467",
    "tt0022100",
    "tt0017136",
    "tt0012349",
    "tt7838252",
    "tt6966692",
    "tt5571734",
    "tt5323662",
    "tt5027774",
    "tt4934950",
    "tt4849438",
    "tt4430212",
    "tt3322420",
    "tt2991224",
    "tt2758880",
    "tt2356180",
    "tt2338151",
    "tt2283748",
    "tt2096673",
    "tt1954470",
    "tt1639426",
    "tt1620933",
    "tt1305806",
    "tt1291584",
    "tt1049413",
    "tt0993846",
    "tt0871510",
    "tt0457430",
    "tt0434409",
    "tt0405508",
    "tt0375611",
    "tt0374887",
    "tt0372784",
    "tt0367110",
    "tt0363163",
    "tt0347149",
    "tt0268978",
    "tt0242519",
    "tt0169858",
    "tt0120735",
    "tt0119488",
    "tt0113277",
    "tt0112641",
    "tt0109117",
    "tt0105695",
    "tt0097576",
    "tt0096283",
    "tt0095016",
    "tt0089881",
    "tt0081398",
    "tt0079944",
    "tt0074896",
    "tt0073707",
    "tt0071853",
    "tt0071315",
    "tt0060107",
    "tt0057115",
    "tt0055630",
    "tt0055031",
    "tt0053291",
    "tt0050986",
    "tt0050976",
    "tt0046912",
    "tt0046438",
    "tt0043338",
    "tt0042876",
    "tt0042192",
    "tt0042041",
    "tt0040897",
    "tt0040725",
    "tt0019254",
    "tt0015864",
    "tt0015324",
    "tt4857264",
    "tt4016934",
    "tt3612616",
    "tt3390572",
    "tt3315342",
    "tt3170832",
    "tt3011894"
  ];

  return topMovies[Math.floor(Math.random() * topMovies.length)];
}
