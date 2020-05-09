async function setup(){
    const root = document.querySelector('.root')
    const searchInput = document.querySelector('.searchInput')
    const searchSelect = document.querySelector('.searchSelect')


    let arr = []

    async function loadCountrylist() {
        let url = `https://restcountries.eu/rest/v2/all`;
        let obj = await (await fetch(url)).json();
        arr = Array.from(obj) 
        arr.forEach(addCountry)
    }


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


            arr.filter(country => country.name === clickedCountry ).forEach( country => {
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

                let borders = document.createElement('div')
                // borders.innerHTML = `borders: ${country.borders}`
                borders.classList.add('borders')

                let borderList = country.borders

                


              console.log(arr.filter( country=> country.alpha3Code == borderList[0])[0].name);
              

                
                


                


                borders.innerHTML = `borders: ${country.borders.map(border => border = arr.filter( country=> country.alpha3Code === border)[0].name)}`


        
                
                card.appendChild(imgFlag)
                card.appendChild(title)
                card.appendChild(population)
                card.appendChild(region)
                card.appendChild(capital)
                card.appendChild(borders)

                root.appendChild(card)

            })



        })










    }

    await loadCountrylist();


    searchInput.addEventListener('change', () => {
        root.innerHTML= ''

        arr.filter(country => country.name.toLowerCase().includes(searchInput.value) ||  country.capital.toLowerCase().includes(searchInput.value)).forEach(addCountry)

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
            return `<span>${match}</span>`
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

