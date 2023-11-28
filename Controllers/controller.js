var moviesList;
var ShowFilms;
var order;
var type;
var piechart;
var table;

window.onload = () =>{
    // OMDb API Model creation
    moviesList = new MoviesList; 

    // ShowFilms View creation
    ShowFilms = new ShowFilmsView;

    //Loader
    var loader = document.getElementById("loader");

    // Google Charts API
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(ShowFilms.drawChart);
    
    searchInput = document.getElementById("search-input");
    order = document.getElementById("order");
    type = document.getElementById("color_mode");
    piechart = document.getElementById("piechart");
    table = document.getElementById("table");

    let debounceTimer;
    // Set Enter Input event to the search input
    searchInput.addEventListener("input", async()=>{
        if(searchInput.value.length<3) return;
        // Clean TimeOut if exists
        clearTimeout(debounceTimer);
        
        document.getElementById("films").innerHTML = '';
        loader.style.display = "block";
        piechart.style.display = "none";
        table.style.display = "none";
        document.getElementById("order").value = "opt1";
        ShowFilms.firstSearch();

        // Set TimeOut
        debounceTimer = setTimeout(async () => {
                // Request Method on OMDb model
                await moviesList.loadDoc(searchInput.value.trim(), true);
                moviesList.loadDoc(searchInput.value.trim(), true).then(()=>{
                    checkType();

                    // View Call
                    ShowFilms.showFilms(moviesList.movies, moviesList.totalResults, moviesList.response);

                    asignDetailsEvent();
                    loader.style.display = "none"; 
                });


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
            //piechart.style.display = "none";
            checkOrder();
            await moviesList.loadDoc(searchInput.value.trim(), false);
            checkType();
            //piechart.style.display = "block";
            ShowFilms.showFilms(moviesList.movies, moviesList.totalResults, moviesList.response);
            asignDetailsEvent();
            loader.style.display = "none";
        }
    });

    document.getElementById("close").addEventListener('click', ()=> {
        ShowFilms.closeDetailPage();
    });

    // Change view depending the Order Selected
    order.addEventListener("change", ()=>{
        loader.style.display = "block";
        piechart.style.display = "none";
        table.style.display = "none";
        document.getElementById("films").innerHTML = '';
        checkOrder();
    });

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
        //loader.style.display = "block";
        //document.getElementById("films").innerHTML = '';
        let movies;
        let moviesID;
        switch(opt){
            case 'opt1': // Order None
                movies = moviesList.movies;
                piechart.style.display = "none";
                table.style.display = "none";
                break;
            case 'opt2': // Order By Idbm Rating
                movies = await moviesList.orderByRating(moviesList.movies);
                piechart.style.display = "block";
                table.style.display = "block";
                moviesID = await getMovies(movies);
                //ShowFilms.drawTable(moviesID, "Ranking");
                ShowFilms.drawChart(moviesID, "Ranking");
                
                // moviesID.slice(0, 5)
                break;
            case 'opt3': // Order by fundraising
                movies = await moviesList.orderByFundraising(moviesList.movies);
                piechart.style.display = "block";
                table.style.display = "block";
                moviesID = await getMovies(movies);
                //ShowFilms.drawTable(moviesID, "Fundraising");
                ShowFilms.drawChart(moviesID, "Fundraising");
                break;
            case 'opt4': // Order by Votes
                movies = await moviesList.orderByVotes(moviesList.movies);
                piechart.style.display = "block";
                table.style.display = "block";
                moviesID = await getMovies(movies);
                //ShowFilms.drawTable(moviesID, "Votes");
                ShowFilms.drawChart(moviesID, "Votes");
                break;
        }
        
        ShowFilms.showFilms(movies, moviesList.totalResults, moviesList.response);

        asignDetailsEvent();
        //loader.style.display = "none";
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

async function getMovies(movies){
    let arr = [];
    cont = 0;

    for(let movie of movies){

        arr.push(await moviesList.loadDocFilm(movie.imdbID));

    }
    return arr;
}