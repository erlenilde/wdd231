const todayTemp = document.querySelector('#temp-today');
const day2Temp = document.querySelector('#temp-day2');
const day3Temp = document.querySelector('#temp-day3');
const weekDay2 = document.querySelector('#day2');
const weekDay3 = document.querySelector('#day3');
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=16.76&lon=3.00&units=metric&appid=529e8f770a39cfc1971f2bb65b959e23';

async function apiFetch() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // testing only
            displayForecastResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayForecastResults(data) {
    todayTemp.innerHTML = `${data.list[0].main.temp}&deg;C`;
    day2Temp.innerHTML = `${data.list[7].main.temp}&deg;C`;
    day3Temp.innerHTML = `${data.list[15].main.temp}&deg;C`;
    let dt2 = data.list[7].dt;
    let weekDay2Name = new Date(dt2 * 1000).toLocaleDateString('en-US', { weekday: 'long' });
    weekDay2.innerHTML = weekDay2Name;
    let dt3 = data.list[15].dt;
    let weekDay3Name = new Date(dt3 * 1000).toLocaleDateString('en-US', { weekday: 'long' });
    weekDay3.innerHTML = weekDay3Name;

}