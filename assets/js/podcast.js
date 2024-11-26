const youtubeVideo = document.querySelector(".last-youtube-video");

async function searcLastYoutubeVideo() {
	youtubeVideo.innerHTML = "";
	const lastVideo = await fetch(
		"https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUXYvwJbbIm-o1O4SthRV2Lw&key=AIzaSyBA11F7Oqv_9sUxmDcwXi3facdB08IKRNw",
	)
		.then((res) => res.json())
		.then((data) => {
			youtubeVideo.innerHTML += `
			<a target='_blank' href='https://www.youtube.com/watch?v=${data.items[0].snippet.resourceId.videoId}' >
				<div class='youtube-container'>	
					<p class='youtube-title'>${data.items[0].snippet.title}</p>
					<img class='youtube-img' src='${data.items[0].snippet.thumbnails.maxres.url}'>
				<div>
			</a>
			`;
		})
		.catch((err) => {
			console.log(err);
			youtubeVideo.innerHTML +=
				"<h5>Algo não saiu como esperado, tente novamente mais tarde!</h5>";
		});
}

setInterval(searcLastYoutubeVideo, 60000);
searcLastYoutubeVideo();