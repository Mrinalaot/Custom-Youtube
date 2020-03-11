document.addEventListener("DOMContentLoaded", function() {
    var input = document.getElementById("search-input");
    var inputBtn = document.getElementById("search-btn");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("search-btn").click();
        }
    });
    inputBtn.addEventListener("click", function() {
        doSearch();
    });

});

function doSearch() {
    var searchedText = document.getElementById("search-input");
    var key = "AIzaSyBCnKXDJl3SLRxPj3ib1WH0s2U6hxM8rdY";
    var maxResults = 10;
    let url = `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=${maxResults}&q=${searchedText.value}`;

    fetch(url, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(response => response.json())
        .then(data => {
            displayResult(data);
        });
}

function displayResult(data) {

    var mainNode = document.getElementById("main");
    mainNode.innerHTML = "";
    console.log(data.items);

    data.items.forEach(element => {
        var thumb = element.snippet.thumbnails.medium.url;
        var title = element.snippet.title;
        var desc = element.snippet.description.substring(0, 100);
        var vid = element.id.videoId;
        var videoLink = `https://www.youtube.com/watch?v=${vid}`
        var publishDate = element.snippet.publishedAt.substring(0, 10);
        var channelName = element.snippet.channelTitle;

        mainNode.innerHTML += ` <article class="item" data-key="${vid}">
                                    <a href="${videoLink}"  target="_blank"> 
                                       <img src="${thumb}" alt="video icon" class="thumb">
                                    </a>
        							<div class="details">
                                        <h4><a href="${videoLink}" target="_blank">${title}</a></h4>
                                        <p>Published on ${publishDate} by ${channelName}<p>
        								<p>${desc}</p>
        							</div>
                                </article>
                            `;



    });

}