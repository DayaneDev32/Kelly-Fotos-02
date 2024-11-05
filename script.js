const newsTitle = document.getElementById("news-title");
const newsContent = document.getElementById("news-content");
const newsImg = document.getElementById("news-img");
const newsLink = document.getElementById("news-link");
const newsCount = document.getElementById("news-count");

function showNews(news, i) {
	const newsItem = news.items[i];

	console.log(newsItem);

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

	console.log(news);

	showNews(news, i);
}

function prevNews() {
	let prev = 0;

	searchNews(prev);
}

function nextNews() {
	let next = 1;

	searchNews(next);
}

searchNews(0);
