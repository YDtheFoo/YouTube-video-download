


window.onload = () => {

	const youtubeDownloadForm = document.querySelector(".youtube-download-form");
	const input = youtubeDownloadForm.querySelector("Input[type='text']");
	const button = youtubeDownloadForm.querySelector("Button[type='submit']");
	const videoInfo = document.querySelector(".video-info-block");

	button.addEventListener("click", (e)=>{
		const url = input.value;
		if(youtube_parser(url)){
			fetch(`https://swos-erver.vercel.app/youtube-video-download?url=${youtube_parser(url)}`)
			.then((response) => response.json())
  			.then((data) => {
				videoInfo.innerHTML = "";
				const videoInfoContainer = generateDom(data)
				videoInfo.appendChild(videoInfoContainer);
			});
		}else{
            alert("Invalid video URL")
        }
		//e.preventDefault();
	});

}

function youtube_parser(url){
    if(url.length == 11){
        return url;
    }
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

function generateDom(data){
    //container is the main wrapper for results
	const container = document.createElement("div");
    container.style.width = "100%";
    //info is the wrapper around video info, including thumbnail and other info
    const info = document.createElement("div");
    info.style.display = "flex";
    info.style.justifyContent = "space-between";
    //info container holds title and channel name
    const infoContainer = document.createElement("div");
    //video name and link
    const titleLink = document.createElement("a")
    titleLink.href = `https://www.youtube.com/watch?v=${data.videoDetails.videoId}`;
    titleLink.target = "_blank";
    const infoTitle = document.createElement("h3");
    infoTitle.innerText = data.videoDetails.title;
    infoTitle.style.textAlign = "left";
    titleLink.appendChild(infoTitle);
    infoContainer.appendChild(titleLink);
    //video poster channel and link
    const authorLink = document.createElement("a")
    authorLink.href = `https://www.youtube.com/channel/${data.videoDetails.channelId}`;
    authorLink.target = "_blank";
    const infoAuthor = document.createElement("h5");
    infoAuthor.innerText = data.videoDetails.author;
    infoAuthor.style.textAlign = "left";
    authorLink.appendChild(infoAuthor);
    infoContainer.appendChild(authorLink);
    infoContainer.style.paddingRight = "30px";
    //thumbnail
    const thumb = document.createElement("img");
    thumb.src = data.videoDetails.thumbnail.thumbnails[data.videoDetails.thumbnail.thumbnails.length - 1].url;
    thumb.style.maxWidth = "30%";
    info.appendChild(infoContainer);
    info.appendChild(thumb)
    //container to hold all download links
	const ul = document.createElement("ul");
    ul.style.padding = "0px";
    ul.style.display = "flex";
    ul.style.justifyContent = "space-between";
    ul.style.margin = "30px 0px";
    //loop to display each resolution download link
	data.streamingData.formats.forEach(v=>{
		const li = document.createElement("li");
        li.style.listStyle = "none";
        li.style.width = "30%";
		const a = document.createElement("a");
		a.href = v.url;
		a.innerHTML = v.qualityLabel;
        a.target = "_blank";
        a.setAttribute("download","");
        a.style.width = "100%";
        a.style.textAlign = "center";
        a.style.display = "block";
        a.style.backgroundColor = "#dd4545";
        a.style.color = "white";
		li.appendChild(a);
		ul.appendChild(li);
	});
    container.appendChild(info);
	container.appendChild(ul);
	return container
}