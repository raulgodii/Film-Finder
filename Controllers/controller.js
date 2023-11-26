var moviesList;
var ShowFilms;
var order;
var type;

window.onload = () =>{
    // OMDb API Model creation
    moviesList = new MoviesList; 

    // ShowFilms View creation
    ShowFilms = new ShowFilmsView;

    //Loader
    var loader = document.getElementById("loader");
    
    searchInput = document.getElementById("search-input");
    order = document.getElementById("order");
    type = document.getElementById("color_mode");

    let debounceTimer;
    // Set Enter Input event to the search input
    searchInput.addEventListener("input", async ()=>{
        if(searchInput.value.length<3) return;
        // Clean TimeOut if exists
        clearTimeout(debounceTimer);
        loader.style.display = "block";
        document.getElementById("order").value = "opt1";
        ShowFilms.firstSearch();

        // Set TimeOut
        debounceTimer = setTimeout(async () => {
            // Request Method on OMDb model
            await moviesList.loadDoc(searchInput.value.trim(), true);

            
            checkType();

            // View Call
            ShowFilms.showFilms(moviesList.movies, moviesList.totalResults, moviesList.response);

            asignDetailsEvent();
            loader.style.display = "none"; 
        }, 300);
    });

    // Asign scroll loader
    window.addEventListener('scroll', async ()=> {
        const {scrollHeight, clientHeight, scrollTop} = document.documentElement
    
        // console.log(`scrollTop + clientHeight = ${scrollTop + clientHeight}  | Altura personalizada = ${scrollHeight - 3}`)
        if(scrollTop + clientHeight > scrollHeight - 300 && moviesList.actualPage<=moviesList.pages && !moviesList.executingRequest){
            loader.style.display = "block";
            checkOrder();
            await moviesList.loadDoc(searchInput.value.trim(), false);
            checkType();
            ShowFilms.showFilms(moviesList.movies, moviesList.totalResults, moviesList.response);
            asignDetailsEvent();
            loader.style.display = "none";
        }
    });

    document.getElementById("close").addEventListener('click', ()=> {
        ShowFilms.closeDetailPage();
    });

    // Change view depending the Order Selected
    order.addEventListener("change", checkOrder);

    // Type of search event - Movies/Series
    type.addEventListener("change", ()=>{
        checkType();
        ShowFilms.showFilms(moviesList.movies, moviesList.totalResults, moviesList.response);
        asignDetailsEvent();
    });

}

// Asign click event to show details of the Film
function asignDetailsEvent(){
    films = document.getElementById("films").querySelectorAll("div");
    films.forEach(film => {
        film.addEventListener("click", async ()=> {
            filmDetails = await moviesList.loadDocFilm(film.imdbID);
            console.log(filmDetails)

            ShowFilms.showFilm(filmDetails);
        });
    });
}

async function checkOrder(){
        let opt = order.value;
        loader.style.display = "block";
        document.getElementById("films").innerHTML = '';
        let movies;
        switch(opt){
            case 'opt1': // Order None
                movies = moviesList.movies;
                break;
            case 'opt2': // Order By Idbm Rating
                movies = await moviesList.orderByRating(moviesList.movies);
                break;
            case 'opt3': // Order by fundraising
                movies = await moviesList.orderByFundraising(moviesList.movies);
                break;
            case 'opt4': // Order by Votes
                movies = await moviesList.orderByVotes(moviesList.movies);
                break;
        }
        
        ShowFilms.showFilms(movies, moviesList.totalResults, moviesList.response);

        asignDetailsEvent();
        loader.style.display = "none";
}

function checkType(){
    
    moviesList.movies.forEach(movie => {
        if(!type.checked && (movie.Type == "series" || movie.Type == "game")){
            movie.show = "no";
        } else if (type.checked && (movie.Type == "movie")){
            movie.show = "no";
        } else {
            movie.show = "yes";
        }
    });

    
}