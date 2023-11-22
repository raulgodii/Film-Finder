var omdbApi;

window.onload = () =>{
    // OMDb API Model creation
    moviesList = new moviesList; 

    // ShowFilms View creation
    var ShowFilms = new ShowFilmsView;

    // Set Enter Input event to the search input
    document.getElementById("search-input").addEventListener("input", async (e)=>{

        // Request Method on OMDb model
        await moviesList.searchRequest(e.target);

        // LLAMADA VISTA CAMBIAR
        ShowFilms.showFilms(moviesList.movies, moviesList.totalResults, moviesList.response);
    });

    // Asign scroll loader
    window.addEventListener("scroll", async (e)=>{
        if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
            // Request Method on OMDb model
            await omdbApi.searchRequest(e.target);
        }
    });

}


