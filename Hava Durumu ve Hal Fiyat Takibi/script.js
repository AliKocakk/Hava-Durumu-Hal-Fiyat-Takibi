const url = 'https://api.openweathermap.org/data/2.5/'
const key = 'e040499f0979773e238686c3ab5d08df'
const setQuery = (e) => {
    if(e.keyCode == '13')
    getResult(searchBar.value)
    
}
const getResult = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`
    fetch(query)
    .then(weather => {
        return weather.json()
    })
    .then(displayResult)
}

const displayResult = (result) => {
    let city = document.querySelector('.city')
    city.innerText = `${result.name}, ${result.sys.country}`

    let temp = document.querySelector('.temp')
    temp.innerText= `${Math.round(result.main.temp)}°C `

    let desc = document.querySelector('.desc')
    desc.innerText = result.weather[0].description

    let minmax = document.querySelector('.minmax')
    minmax.innerText = `${Math.round(result.main.temp_min)}°C En Düşük
    ${Math.round(result.main.temp_max)}°C En Yüksek`
   

}

const searchbar = document.getElementById('searchBar')
searchbar.addEventListener('keypress',setQuery)