async function setup(){
    const root = document.querySelector('.root')
    const searchInput = document.querySelector('.searchInput')
    const searchSelect = document.querySelector('.searchSelect')
    const backBtn = document.querySelector('.backBtn')


    let arr = []

    async function loadCountrylist() {
        let url = `https://restcountries.eu/rest/v2/all`;
        let obj = await (await fetch(url)).json();
        arr = Array.from(obj) 
        arr.forEach(addCountry)
    }
    
    await loadCountrylist();


    function addCountry(country){
        let card = document.createElement('div')
        card.classList.add('card')
        let title = document.createElement('div')
        title.classList.add('cardTitle')
        title.innerText = country.name
        let imgFlag = document.createElement('img')
        imgFlag.src = country.flag
        imgFlag.classList.add('img')

        let population = document.createElement('div')
        population.innerHTML = `Population: ${country.population}`

        let region = document.createElement('div')
        region.innerHTML = `Region: ${country.region}`

        let capital = document.createElement('div')
        capital.innerHTML = `Capital: ${country.capital}`
        capital.classList.add('capital')

        
        card.appendChild(imgFlag)
        card.appendChild(title)
        card.appendChild(population)
        card.appendChild(region)
        card.appendChild(capital)
        root.appendChild(card)



        title.addEventListener('click', () => {
            root.innerHTML= ''

            let clickedCountry = country.name

            arr.filter(country => country.name === clickedCountry ).forEach(showCountry)


        })

        function showCountry(country){

            let cardBig = document.createElement('div')
            cardBig.classList.add('cardBig')
            let titleBig = document.createElement('div')
            titleBig.classList.add('cardTitleBig')
            titleBig.innerText = country.name
            let imgFlagBig = document.createElement('img')
            imgFlagBig.src = country.flag
            imgFlagBig.classList.add('imgFlagBig')

            let nativeName = document.createElement('div')
            nativeName.classList.add('nativeName')
            nativeName.innerText = "Native name: " + country.nativeName
    
            let population = document.createElement('div')
            population.innerHTML = `Population: ${country.population}`
    
            let region = document.createElement('div')
            region.innerHTML = `Region: ${country.region}`

            let subRegion = document.createElement('div')
            subRegion.innerHTML = `Sub region: ${country.subregion}`
    
            let capital = document.createElement('div')
            capital.innerHTML = `Capital: ${country.capital}`
            capital.classList.add('capital')

            let topLevelDomain = document.createElement('div')
            topLevelDomain.innerHTML = `Top Level Domain: ${country.topLevelDomain}`

            let currencies = document.createElement('div')
            currencies.innerHTML = `Currencies: ${country.currencies[0].code}`

            
            let languages = document.createElement('div')
            languages.innerHTML = `Languages: ${country.languages.map(language => language = " " + language.name )}`

            let borders = document.createElement('div')
            borders.classList.add('borders')

            let bordersArr = country.borders.map(border => border = arr.filter( country=> country.alpha3Code === border)[0].name)


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


            let cardRight = document.createElement('div')
            cardRight.classList.add('cardRight')

            let cardRightMain = document.createElement('div')
            cardRightMain.classList.add('cardRightMain')


    
            
            cardBig.appendChild(imgFlagBig)
            cardRight.appendChild(titleBig)
            cardRightMain.appendChild(nativeName)
            cardRightMain.appendChild(population)
            cardRightMain.appendChild(region)
            cardRightMain.appendChild(subRegion)
            cardRightMain.appendChild(capital)
            cardRightMain.appendChild(topLevelDomain)
            cardRightMain.appendChild(currencies)
            cardRightMain.appendChild(languages)
            

            cardRight.appendChild(cardRightMain)
            cardRight.appendChild(borders)
            cardBig.appendChild(cardRight)
            

            root.appendChild(cardBig)

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



}



window.onload = setup;

