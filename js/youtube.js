//AIzaSyAKhEGLwUUDbyqhFqiu9x0G1cymiZK08fQ

//PLR22mOC3bZYpkLFyPAySsd9OOyY9M4TFh

let vidList = document.querySelector(".vidList");
let key = "AIzaSyCuozbhwv2qSp0hiD1cu7p6Uf2bSXEALbg";
let playlistId = "PLpCsw49zIOW0X5vao9ywO3WEc2Z69MpoZ";
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}`;


fetch(url)
    .then((data)=>{
        console.log(data);
        return data.json();
    })
    .then((json)=>{
        // console.log(json);
        let items = json.items;
        // console.log(items);
        let result = "";

        items.map((el)=>{


            let title = el.snippet.title;
            if(title.length>20){
                title = title.substr(0, 20) + "...";
            }
            let des = el.snippet.description;
            if(des.length>100){
                des = des.substr(0, 100) + "...";
            }
            let date = el.snippet.publishedAt;
            date = date.split("T")[0];
        
            result += `
            <article>
                <a href="${el.snippet.resourceId.videoId}" class="pic">
                    <img src="${el.snippet.thumbnails.medium.url}">
                </a>
                <div class="con">
                    <h2>${title}</h2>
                    <p>${des}</p>
                    <span>${date}</span>
                 </div>
            </article>
        `
        })
        vidList.innerHTML = result;
    })

vidList.addEventListener("click", (e)=> {
    e.preventDefault();

    if(!e.target.closest("a")) return;

    const vidId = e.target.closest("article").querySelector("a").getAttribute("href");

    // console.log(vidId);

    let pop = document.createElement("figure");
    pop.classList.add("pop");

    pop.innerHTML = `
        <iframe src="http://www.youtube.com/embed/${vidId}" frameborder = "0" width="100%" height="100%" allowfullscreen></iframe>
        <span class="btnClose">Close</span>
    `;
    vidList.append(pop);
})

//이벤트 위임을 통해서 닫기를 구현
//이유는 닫기 버튼은 미래시에 있는 버튼이기 때문에
//이벤트 위임으로만 해결할 수 있습니다

vidList.addEventListener("click",(e) => {
    const pop = vidList.querySelector(".pop");
    if(pop){
        const close = pop.querySelector('span');
        //위의 이벤트와 이 이벤트가 충돌되는 상황
        //위에서는 pop을 만들고 이 이벤트는 pop을 지우는 이벤트이므로 충돌
        if(e.target == close) pop.remove();
    }
})
