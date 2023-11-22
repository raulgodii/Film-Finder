var omdbApi;

window.onload = () =>{
    // OMDb API Model creation
    moviesList = new moviesList; 

    // ShowFilms View creation
    var ShowFilms = new ShowFilmsView;

    
    searchInput = document.getElementById("search-input");

    // Set Enter Input event to the search input
    searchInput.addEventListener("input", async (e)=>{

        // Request Method on OMDb model
        await moviesList.loadDoc(searchInput.value);

        // LLAMADA VISTA CAMBIAR
        ShowFilms.showFilms(moviesList.movies, moviesList.totalResults, moviesList.response);
    });

    // Asign scroll loader
    window.addEventListener("scroll", async ()=>{
        if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
            // Request Method on OMDb model
            console.log("FIn")
            moviesList.loadNewPage();
            await moviesList.loadDoc(searchInput.value);
            ShowFilms.showFilms(moviesList.movies, moviesList.totalResults, moviesList.response);
        }
    });

}


