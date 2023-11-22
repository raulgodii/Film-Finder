window.onload = () =>{
    var omdbApi = new OmdbApi; 

    document.getElementById("search-input").addEventListener("keypress", (e)=>{
        if(e.key === "Enter"){
            omdbApi.searchRequest();
        }
    });
}
