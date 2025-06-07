const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.74&lon=6.63&units=metric&appid=529e8f770a39cfc1971f2bb65b959e23';

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // testing only
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }

  apiFetch();
  
  function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`; // Para Celsius
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}
  


  /*function displayResults(data) {
    currentTemp.innerHTML = `${data.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${______}.___`;
    let desc = data.weather[0].______;
    weatherIcon.setAttribute('___', _____);
    weatherIcon.setAttribute('___', _____);
    captionDesc.textContent = `${desc}`;
  }*/