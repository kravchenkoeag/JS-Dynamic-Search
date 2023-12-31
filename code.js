const api = 
`https://raw.githubusercontent.com/kravchenkoeag/JS-Dynamic-Search/main/subway.json`;

const stations = [];

fetch(api)
    .then(res => res.json())
    .then(data => {
        console.log('data >>>> ', data);

        data.forEach(line => {
            stations.push(...line.stations);          
        })
    });

    const searchInput = document.querySelector('.search');
    const searchOptions = document.querySelector('.options');

    function getOptions(word, stations) {

        return stations.filter(s => {
        //  Определить совпадает ли то что мы вбили в input  
        
        const regex = new RegExp(word, 'gi')
        
        return s.name.match(regex)
        })
    }

    function displayOptions() {
        console.log('this.value >> ', this.value);

        const options = getOptions(this.value, stations);

        const html = options
        .map(station => {

            const regex = new RegExp(this.value, 'gi');
            const stationName = station.name.replace(regex,
                `<span class="hl">${this.value}</span>`
                )

            return `<li><span>${stationName}</span></li>`
        })
        .slice(0, 10)
        .join('');

        searchOptions.innerHTML = this.value ? html : null;
    }

    searchInput.addEventListener('change', displayOptions);
    searchInput.addEventListener('keyup', displayOptions);
