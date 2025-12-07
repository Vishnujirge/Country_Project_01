const singlec = document.getElementById("countryrow");
const loader = document.getElementById("loader");

// Spinner
function toggelSpineer(flag) {
  flag ? loader.classList.remove("d-none") : loader.classList.add("d-none");
}

// Read ?code=XXX
const param = new URLSearchParams(window.location.search);
const code = param.get("code");
const countryurl = `https://restcountries.com/v3.1/alpha/${code}`;

// Fetch wrapper
const make = async (apiURL) => {
  try {
    toggelSpineer(true);

    let res = await fetch(apiURL);
    let data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "API Failed!");
    }

    return data;
  } finally {
    // ❌ wrong: toggelSpineer(true)
    toggelSpineer(false);
  }
};

// Main function
async function fetchcountry() {
  try {
    toggelSpineer(true);

    let data = await make(countryurl);
    let c = data[0];

    singlec.innerHTML = `
      <div class="col-md-5 d-flex align-items-center justify-content-center">
        <img src="${c.flags.png}" class="img-fluid rounded"
          alt="${c.flags.alt}" title="Flag of ${c.name.common}">
      </div>

      <div class="col-md-7">
        <h3 class="mb-3">${c.name.common}</h3>

        <ul class="list-group">
          <li class="list-group-item"><strong>Official Name:</strong> ${c.name.official}</li>
          <li class="list-group-item"><strong>Capital:</strong> ${c.capital}</li>
          <li class="list-group-item"><strong>Region:</strong> ${c.region}</li>
          <li class="list-group-item"><strong>Subregion:</strong> ${c.subregion}</li>
          <li class="list-group-item"><strong>Population:</strong> ${c.population.toLocaleString()}</li>
          <li class="list-group-item"><strong>Area:</strong> ${c.area} km²</li>

          <li class="list-group-item"><strong>Currencies:</strong>
            ${Object.values(c.currencies).map(cur => `${cur.name} (${cur.symbol})`).join(", ")}
          </li>

          <li class="list-group-item"><strong>Languages:</strong>
            ${Object.values(c.languages || {}).join(", ")}
          </li>

          <li class="list-group-item"><strong>Country Code:</strong> ${c.cca2}</li>

          <li class="list-group-item">
            <strong>Google Maps:</strong>
            <a href="${c.maps.googleMaps}" target="_blank">Open</a>
          </li>

          <li class="list-group-item">
            <strong>Borders:</strong>
            ${
              c.borders
                ? c.borders
                    .map(code => `<a href="country.html?code=${code}" class="badge bg-secondary mx-1">${code}</a>`)
                    .join("")
                : "No Borders"
            }
          </li>
        </ul>
      </div>
    `;
  } catch (err) {
    singlec.innerHTML = `
      <p class="text-danger">Failed to load country data: ${err.message}</p>
    `;
  } finally {
    toggelSpineer(false);
  }
}

fetchcountry();
