async function setup(){
    const root = document.querySelector('.root')
    const searchInput = document.querySelector('.searchInput')
    const searchSelect = document.querySelector('.searchSelect')
    const backBtn = document.querySelector('.backBtn')
    const darkMode = document.querySelector('.darkMode')


    let arr = []

    async function loadCountrylist() {
        let url = `https://restcountries.eu/rest/v2/all`;
        let obj = await (await fetch(url)).json();
        arr = Array.from(obj) 
        arr.forEach(addCountry)
    }
    
    await loadCountrylist();

    function createElement(tagName, className, parentElement) {
        const element = document.createElement(tagName)
        element.className = className
        parentElement.appendChild(element)
        return element
    }


    function addCountry(country){
        const card = createElement("div", "card", root)

        const imgFlag = createElement("img", "img", card)
        imgFlag.src = country.flag

        const title = createElement("div", "cardTitle", card)
        title.innerText = country.name

        const population = createElement("div", "population", card)
        population.innerHTML = `Population: ${country.population}`
        
        const region = createElement("div", "region", card)
        region.innerHTML = `Region: ${country.region}`


        const capital = createElement("div", "capital", card)
        capital.innerHTML = `Capital: ${country.capital}`



        title.addEventListener('click', () => {
            root.innerHTML= ''

            let clickedCountry = country.name

            arr.filter(country => country.name === clickedCountry ).forEach(showCountry)

        })

        function showCountry(country){
 
            const cardBig = createElement("div", "cardBig", root)
            const cardRight = createElement("div", "cardRight", cardBig)
            const cardRightMain = createElement("div", "cardRightMain", cardRight)


            const imgFlagBig = createElement("img", "imgFlagBig", cardBig)
            imgFlagBig.src = country.flag


            const titleBig = createElement("div", "cardTitleBig", cardRight)
            titleBig.innerText = country.name

            const nativeName = createElement("div", "nativeName", cardRightMain)
            nativeName.innerText = "Native name: " + country.nativeName

            const population = createElement("div", "population", cardRightMain)
            population.innerHTML = `Population: ${country.population}`
   
            const region = createElement("div", "region", cardRightMain)
            region.innerHTML = `Region: ${country.region}`


            const subRegion = createElement("div", "subRegion", cardRightMain)
            subRegion.innerHTML = `Sub region: ${country.subregion}`

            const capital = createElement("div", "capital", cardRightMain)
            country.capital ? capital.innerHTML = `Capital: ${country.capital}` : capital.innerHTML = "Capital: No Capital"
            capital.classList.add('capital')


            const topLevelDomain = createElement("div", "topLevelDomain", cardRightMain)
            topLevelDomain.innerHTML = `Top Level Domain: ${country.topLevelDomain}`

            const currencies = createElement("div", "currencies", cardRightMain)
            currencies.innerHTML = `Currencies: ${country.currencies[0].code}`

            const languages = createElement("div", "languages", cardRightMain)
            languages.innerHTML = `Languages: ${country.languages.map(language => language = " " + language.name )}`

            cardRight.appendChild(cardRightMain)

            const borders = createElement("div", "borders", cardRight)
            borders.innerText="Borders"

            let bordersArr = country.borders.map(border => border = arr.filter( country=> country.alpha3Code === border)[0].name)

             if(bordersArr.length == 0){ 
                borders.innerText="No Border Countries"
            }

            bordersArr.forEach(border => {
                let borderBox =  document.createElement('div')
                borderBox.classList.add('borderBox')
                borderBox.innerText= border
                borders.appendChild(borderBox)

                borderBox.addEventListener('click', () =>{
                    root.innerHTML= ''
                    arr.filter(country => country.name === border ).forEach(showCountry)
                })
            })

            cardBig.appendChild(cardRight)

            backBtn.classList.add('show')
            searchInput.classList.add('hide')
            searchSelect.classList.add('hide')
        }
    }





    searchInput.addEventListener('change', () => {
        root.innerHTML= ''

        arr.filter(country => country.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||  country.capital.toLowerCase().includes(searchInput.value.toLowerCase())).forEach(addCountry)

        document.querySelectorAll('.cardTitle').forEach(highlight)
        document.querySelectorAll('.capital').forEach(highlight)

    })


    
    function highlight(country){
        let html = country.innerHTML 
        let index = html.toLowerCase().indexOf(searchInput.value);
        let text = searchInput.value
        if(index >= 0){
            let re = new RegExp(text,"gi");
            country.innerHTML = country.innerHTML.replace(re, function(match) {
            return `<span class="highlight">${match}</span>`
        });
        }
    }


    let regionArr = arr.map( country => country = country.region)
    let filteredRegions = Array.from(new Set(regionArr)).filter(item => item)

    filteredRegions.sort(SortByName).map(fillSelectList)



    
    function SortByName(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    }

    
    function fillSelectList (item){
        option = document.createElement('option');
        option.setAttribute('value', item);
        option.appendChild(document.createTextNode(item));
        searchSelect.appendChild(option)
    }


    searchSelect.addEventListener('change', () => {
        root.innerHTML =""
        arr.filter(country => country.region.includes(searchSelect.value)).forEach(addCountry)

    })


    let initialTheme

    darkMode.addEventListener('click', () => {

        const root = document.documentElement;

        if(initialTheme) {
          root.style.setProperty('--background-color', 'hsl(0, 0%, 98%)');
          root.style.setProperty('--text-color', 'hsl(200, 15%, 8%)');
          root.style.setProperty('--elements-color', 'hsl(0, 0%, 100%)');

          initialTheme = false;  
        } else {
            root.style.setProperty('--background-color', 'hsl(207, 26%, 17%)');
            root.style.setProperty('--text-color', 'hsl(0, 0%, 100%)');
            root.style.setProperty('--elements-color', 'hsl(209, 23%, 22%)');
          initialTheme = true;
        }

    })


    backBtn.addEventListener('click', () => {
        root.innerHTML= ''
        arr.forEach(addCountry)
        backBtn.classList.remove('show')
        searchInput.classList.remove('hide')
        searchSelect.classList.remove('hide')

    })





}



window.onload = setup;

