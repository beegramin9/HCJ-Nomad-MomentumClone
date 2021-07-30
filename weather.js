const weather = document.querySelector('.weather'),
    span_place = weather.querySelector(".weather__place"),
    span_temperature = weather.querySelector(".weather__temperature")

const API_KEY = "9f4fbf8791e2a8ae482f56cb7ae14ecd"
/* JS는 URL을 가져올 때 새로고침 하지 않아도 데이터를 refresh할 수 있다.
React가 이거임. JS이 데이터를 계속 가져오고 있기 때문이다. */

function getWeather(lat,lng) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&`)
    /* 섭씨온도 metric */
    // Promise화
    /* response는 string으로 들어옴. json으로 만들어주자 */
    .then(response => response.json())
    .then(json => {
        const temperature = json.main.temp
        const place = json.name
        span_place.innerText = place
        span_temperature.innerText = `${parseInt(temperature)}°C`
    })
}

const COORDS = 'coords'

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObs = {
        latitude : latitude,
        longitude : longitude
    }
    /* 좌표를 저장해줘야 한다 */
    saveCoords(coordsObs) 
    /* 날씨 가져오기 */
    getWeather(latitude,longitude)
}

function handleGeoError(error) {
    console.log(error);
}

function askForCoords() {
    /* Navigator API 사용 
    성공을 알리는 콜백, 에러를 알리는 콜백 */

    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS)
    /* 좌표가 들어온 게 없다면 가져오고 */
    if (!loadedCoords) {
        askForCoords()
    /* 좌표가 들어온 게 있으면 parse해서 getWeather에 넣어준다. */
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude)
    }
}

function init() {
    loadCoords()
}
init()