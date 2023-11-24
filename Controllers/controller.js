var omdbApi;
var ShowFilms;

window.onload = () =>{
    // OMDb API Model creation
    moviesList = new moviesList; 

    // ShowFilms View creation
    var ShowFilms = new ShowFilmsView;

    
    searchInput = document.getElementById("search-input");

    let debounceTimer;
    // Set Enter Input event to the search input
    searchInput.addEventListener("input", async ()=>{

        // Clean TimeOut
        clearTimeout(debounceTimer);

        // Set TimeOut
        debounceTimer = setTimeout(async () => {
            // Request Method on OMDb model
            await moviesList.loadDoc(searchInput.value, true);

            // LLAMADA VISTA CAMBIAR
            ShowFilms.showFilms(moviesList.movies, moviesList.totalResults, moviesList.response);
        }, 300);
    });

    // Asign scroll loader
    window.addEventListener('scroll', async ()=> {

        const {scrollHeight, clientHeight, scrollTop} = document.documentElement
    
        // console.log(`scrollTop + clientHeight = ${scrollTop + clientHeight}  | Altura personalizada = ${scrollHeight - 3}`)
        if(scrollTop + clientHeight > scrollHeight - 3 && moviesList.actualPage<=moviesList.pages && !moviesList.executingRequest){
            await moviesList.loadDoc(searchInput.value, false);
            ShowFilms.showFilms(moviesList.movies, moviesList.totalResults, moviesList.response);
        }
    });

}