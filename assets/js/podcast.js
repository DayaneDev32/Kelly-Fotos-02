const channelId = "UCXYvwJbbIm-o1O4SthRV2Lw"; // ID do canal
const apiKey = "AIzaSyBqX7F7b9ReeIZV2WKElLz9fMvvikeZtOM"; // Substitua pela sua chave da API
const videoList = document.getElementById("video-list");
const videoContainer = document.getElementById("video-container");

// Função para buscar os vídeos mais recentes
function fetchRecentVideos(pageToken = "") {
	const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=9&order=date&type=video&pageToken=${pageToken}&key=${apiKey}`;

	fetch(searchUrl)
		.then((response) => response.json())
		.then((data) => {
			const nextPageToken = data.nextPageToken;

			// Adiciona vídeos à UI
			// biome-ignore lint/complexity/noForEach: <explanation>
			data.items.forEach((video) => {
				const videoCard = document.createElement("div");
				videoCard.classList.add("video-card");

				const videoThumbnail = video.snippet.thumbnails.medium.url;
				const videoTitle = video.snippet.title;
				const videoLink = `https://www.youtube.com/watch?v=${video.id.videoId}`;

				videoCard.innerHTML = `
                    <a class='link-video' href="${videoLink}" target="_blank">
                        <p class='title-video'>${videoTitle}</p>
                        <img class='img-video' src="${videoThumbnail}" alt="${videoTitle}">
                    </a>
                `;

				videoList.appendChild(videoCard);
			});

			// Se existir mais páginas, configura o scroll infinito
			if (nextPageToken) {
				window.onscroll = () => {
					if (
						window.innerHeight + window.scrollY >=
						document.documentElement.scrollHeight - 50
					) {
						fetchRecentVideos(nextPageToken);
						window.onscroll = null; // Evita múltiplas requisições ao rolar
					}
				};
			}
		})
		.catch((error) => console.error("Erro ao buscar vídeos:", error));
}

// Inicializa a busca com os vídeos mais recentes
fetchRecentVideos();