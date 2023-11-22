var json = "hola";
window.onload = () =>{
    // OMDb API Model creation
    var omdbApi = new OmdbApi; 

    // Set Enter Input event to the search input
    document.getElementById("search-input").addEventListener("input", async (e)=>{

        // Request Method on OMDb model
        await omdbApi.searchRequest(e.target);
        
        console.log(json);
    });
}


