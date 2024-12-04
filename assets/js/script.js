const newsTitle = document.getElementById("news-title");
const newsContent = document.getElementById("news-content");
const newsImg = document.getElementById("news-img");
const newsLink = document.getElementById("news-link");
const newsCount = document.getElementById("news-count");

function showNews(news, i) {
	const newsItem = news.items[i];
	const img = JSON.parse(newsItem.imagens);

	newsTitle.innerHTML = newsItem.titulo;
	newsTitle.style.height = "50px";
	newsContent.innerHTML = newsItem.introducao;
	newsImg.src = `https://agenciadenoticias.ibge.gov.br/${img.image_fulltext}`;
	newsImg.style.width = "70%";
	newsImg.style.height = "30%";
	newsImg.style.borderRadius = "10px";
	newsLink.href = newsItem.link;
	newsCount.innerHTML = i + 1;
}

async function searchNews(i) {
	const news = await fetch(
		"http://servicodados.ibge.gov.br/api/v3/noticias/",
	).then((data) => data.json());

	showNews(news, i);
}

function prevNews() {
	const contentCount = Number.parseInt(newsCount.innerHTML) - 1;

	if (contentCount > 0) {
		searchNews(contentCount - 1);
	}
}

function nextNews() {
	const contentCount = Number.parseInt(newsCount.innerHTML) - 1;

	searchNews(contentCount + 1);
}

searchNews(0);

const key = "dd877b2a20c73e78fedf1a4e71cf6ff7";

const tempWeatherMinCaceres = document.getElementById(
	"temp-weather-min-caceres",
);
const tempWeatherMaxCaceres = document.getElementById(
	"temp-weather-max-caceres",
);
const tempWeatherCaceres = document.getElementById("temp-weather-caceres");
const descriptionWeatherCaceres = document.getElementById(
	"description-weather-caceres",
);
const imgWeatherCaceres = document.getElementById("img-weather-caceres");
const humidityWeatherCaceres = document.getElementById(
	"humidity-weather-caceres",
);
const sunriseCaceres = document.getElementById("sunrise-caceres");
const sunsetCaceres = document.getElementById("sunset-caceres");

const cityWeather = document.getElementById("city-weather");
const tempWeather = document.getElementById("temp-weather");
const tempWeatherMin = document.getElementById("temp-weather-min");
const tempWeatherMax = document.getElementById("temp-weather-max");
const descriptionWeather = document.getElementById("description-weather");
const imgWeather = document.getElementById("img-weather");
const humidityWeather = document.getElementById("humidity-weather");
const searchCity = document.getElementById("search-weather");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const cityToWeather = document.getElementById("city-to-weather");

function showWeather(data) {
	if (data.name === "Cáceres") {
		tempWeatherCaceres.innerHTML = ` ${Math.floor(data.main.temp)}°C`;
		tempWeatherMinCaceres.innerHTML = ` ${Math.floor(data.main.temp_min) - 2}°C`;
		tempWeatherMaxCaceres.innerHTML = ` ${Math.floor(data.main.temp_max) + 2}°C`;
		descriptionWeatherCaceres.innerHTML = data.weather[0].description;
		imgWeatherCaceres.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
		humidityWeatherCaceres.innerHTML = ` ${data.main.humidity}%`;

		const sunriseCaceresNew = new Date(data.sys.sunrise * 1000);
		const hoursSunriseCaceresNew = sunriseCaceresNew.getHours();
		const minutesSunriseCaceresNew = sunriseCaceresNew.getMinutes();
		const secondsSunriseCaceresNew = sunriseCaceresNew.getSeconds();
		const daySunriseCaceresNew = [
			hoursSunriseCaceresNew,
			minutesSunriseCaceresNew,
			secondsSunriseCaceresNew,
		].join(":");
		sunriseCaceres.innerHTML = ` ${daySunriseCaceresNew}`;

		const sunsetCaceresNew = new Date(data.sys.sunset * 1000);
		const hoursSunsetCaceresNew = sunsetCaceresNew.getHours();
		const minutesSunsetCaceresNew = sunsetCaceresNew.getMinutes();
		const secondsSunsetCaceresNew = sunsetCaceresNew.getSeconds();
		const daySunsetCaceresNew = [
			hoursSunsetCaceresNew,
			minutesSunsetCaceresNew,
			secondsSunsetCaceresNew,
		].join(":");
		sunsetCaceres.innerHTML = ` ${daySunsetCaceresNew}`;
	} else {
		cityWeather.innerHTML = data.name;
		tempWeather.innerHTML = ` ${Math.floor(data.main.temp)}°C`;
		tempWeatherMin.innerHTML = ` ${Math.floor(data.main.temp_min) - 2}°C`;
		tempWeatherMax.innerHTML = ` ${Math.floor(data.main.temp_max) + 2}°C`;
		descriptionWeather.innerHTML = data.weather[0].description;
		imgWeather.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
		humidityWeather.innerHTML = ` ${data.main.humidity}%`;

		const sunriseNew = new Date(data.sys.sunrise * 1000);
		const hoursSunriseNew = sunriseNew.getHours();
		const minutesSunriseNew = sunriseNew.getMinutes();
		const secondsSunriseNew = sunriseNew.getSeconds();
		const daySunriseNew = [
			hoursSunriseNew,
			minutesSunriseNew,
			secondsSunriseNew,
		].join(":");
		sunrise.innerHTML = ` ${daySunriseNew}`;

		const sunsetNew = new Date(data.sys.sunset * 1000);
		const hoursSunsetNew = sunsetNew.getHours();
		const minutesSunsetNew = sunsetNew.getMinutes();
		const secondsSunsetNew = sunsetNew.getSeconds();
		const daySunsetNew = [
			hoursSunsetNew,
			minutesSunsetNew,
			secondsSunsetNew,
		].join(":");
		sunset.innerHTML = ` ${daySunsetNew}`;
	}
}

async function searchWeather(city) {
	if (city === "Cáceres") {
		const weather = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?id=3468551&appid=${key}&lang=pt_br&units=metric`,
		).then((response) => response.json());
		showWeather(weather);
	} else {
		const weather = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`,
		).then((response) => response.json());
		showWeather(weather);
	}
}

searchWeather("Cáceres");

searchCity.addEventListener("click", () => searchWeather(cityToWeather.value));

function setBackgrounColorWeather() {
	const shadeOfTheSky = document.querySelector(".weather-container");
	const shadeOfTheTextCaceres = document.querySelector(".weather-container");
	const shadeOfTheTextSearch = document.querySelector(".weather-container");

	const dateNow = new Date();
	const hoursNow = dateNow.getHours();
	const minutesNow = dateNow.getMinutes();
	const secondsNow = dateNow.getSeconds();
	const timeNow = [hoursNow, minutesNow, secondsNow].join(":");

	if (hoursNow < 6) {
		shadeOfTheSky.style.background =
			"linear-gradient(135deg, #141e30, #243b55)";
		shadeOfTheTextCaceres.style.color = "#fff";
		shadeOfTheTextSearch.style.color = "#fff";
	} else if (hoursNow >= 6 && hoursNow < 12) {
		shadeOfTheSky.style.background =
			"linear-gradient(135deg, #ffdee9, #b5fffc)";
		shadeOfTheTextCaceres.style.color = "#000";
		shadeOfTheTextSearch.style.color = "#000";
	} else if (hoursNow >= 12 && hoursNow < 18) {
		shadeOfTheSky.style.background =
			"linear-gradient(135deg, #ffd89b, #19547b)";
		shadeOfTheTextCaceres.style.color = "#000";
		shadeOfTheTextSearch.style.color = "#000";
	} else if (hoursNow >= 18) {
		shadeOfTheSky.style.background =
			"linear-gradient(135deg, #141e30, #243b55)";
		shadeOfTheTextCaceres.style.color = "#fff";
		shadeOfTheTextSearch.style.color = "#fff";
	}
}

setInterval(setBackgrounColorWeather, 1000);
setBackgrounColorWeather();

//colocar chamada a API do instagram aqui

const smartphoneMenu = document.querySelector(".list-menu");
const smartphoneNav = document.querySelector(".smartphone-header");

smartphoneMenu.addEventListener("click", () => {
	if (smartphoneNav.style.display === "none") {
		smartphoneNav.style.display = "flex";
	} else {
		smartphoneNav.style.display = "none";
	}
});

function showMenu() {
	const smartphoneNav = document.querySelector(".smartphone-header");

	if (smartphoneNav.style.display === "none") {
		smartphoneNav.style.display = "flex";
	} else {
		smartphoneNav.style.display = "none";
	}
}
