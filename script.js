const newsTitle = document.getElementById("news-title");
const newsContent = document.getElementById("news-content");
const newsImg = document.getElementById("news-img");
const newsLink = document.getElementById("news-link");
const newsCount = document.getElementById("news-count");

function showNews(news, i) {
	const newsItem = news.items[i];
	const img = JSON.parse(newsItem.imagens);

	newsTitle.innerHTML = newsItem.titulo;
	newsContent.innerHTML = newsItem.introducao;
	newsImg.src = `https://agenciadenoticias.ibge.gov.br/${img.image_fulltext}`;
	newsImg.style.width = "50vw";
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
	// const contentCount = newsCount.innerHTML.;

	// if (count >= 0) {
	const countPrev = 0;
	searchNews(countPrev);
	// }

	// count = 0;
	// console.log(newsCount.innerHTML);
	// searchNews(count);
}

function nextNews() {
	const countNext = 1;

	searchNews(countNext);
}

searchNews(0);

const cityWeather = document.getElementById("city-weather");
const tempWeather = document.getElementById("temp-weather");
const chanceWeather = document.getElementById("chance-weather");
const mmWeather = document.getElementById("mm-weather");

