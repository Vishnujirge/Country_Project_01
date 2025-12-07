const cl = console.log;

const countryContainerRow = document.getElementById('countryContainerRow');
// https://restcountries.com/v3.1/all?fields=name,cca2,flags,region

//https://restcountries.com/v3.1/alpha/IN
//https://restcountries.com/v3.1/alpha/356

// We can access any object from that code/key 
// we can use two endpoints
const BASE_URL = `https://restcountries.com/v3.1/all`;

function toggleSpinner(flag) {
  if (flag === true){
     loader.classList.remove("d-none")
  } else{
     loader.classList.add("d-none")
 
  }
}


function snackbar(title, icon) {
  Swal.fire({
    title,
    icon,
    timer: 1500,
  });
}


//HTML FILE 
// country.html?code="IND" -> KEY & VALUES => query params ,: 1VALUE IS params->(:ID)
//We will get query params -> IND -> API call -> templeting 
// we have to pass the country code as -> query params ;

(async function fetchAllCountries() {
    try {
       toggleSpinner(true);
        // we dont use/add query params  like that there some other ways to add it 
        // /in angular -> new HttpParams().set() use this set ?query params in headers
        // find the way how set query params in js..!!
        // you have to use -> URLSearchParams();

        let COUNTRY_URL = `${BASE_URL}/?fields=name,cca2,flags,region`;
        let res = await fetch(COUNTRY_URL, {
            method: 'GET',
            body: null,
        })

        let data = await res.json()
        // cl(data)

        if (!res.ok) {
            throw new Error('Something Went Wrong In Data !!!');
        }
        data.map(c => {
            cl(c) 
            // it give us 250_Obje. data 

            const col = document.createElement('div');
            //we can create one funtion for create single/arr we can call it
            col.className = `col-sm-6 col-md-4 col-lg-3 mb-4`;

            col.innerHTML = `
             <div class="country-card h-100" data-code="${c.cca2}" role="button">
             <img src="${c.flags.png}" class="country-flag w-100" alt="${c.flags.alt}" title="${c.flags.alt}" loading="lazy" />
             <div class="card-body">
                <h3 class="card-title mb-1">
                    ${c.name.common || c.name.officail}
                </h3>
             </div>
             <div class="p-3 text-center">
                <div class="country-title">Antigua and Barbuda</div>
                <div class="country-code"> Code:${c.cca2}</div>
             </div>
             </div>`
             col.addEventListener('click',()=>{
              // cl(c.cca2)
              window.location.href = `country.html?code=${c.cca2}&test=testQueryParams`
             })

            countryContainerRow.append(col);
        })
        // cl("  250_Data For Ui :",data)

    } catch (err) {
        cl('Something Went Wrong In Data !!!')

    }
     finally {
    toggleSpinner(false);
  }
})()





searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  document.querySelectorAll("#countryContainerRow .col-sm-6").forEach(col => {
    const name = col.querySelector("h3").textContent.toLowerCase();

    if (name.includes(value)) {
      col.style.display = "";
    } else {
      col.style.display = "none";
    }
  });
});




