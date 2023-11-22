class ShowFilmsView{
    showFilms(movies, totalResults, response){
        console.log(movies)
        
        const results = document.getElementById("results");

        const films = document.getElementById("films");
        films.innerHTML = "";

        if(response){
            results.textContent = "Total Results: " + totalResults;

            movies.forEach(element => {
                
                const newFilm = document.createElement("div");
                const title = document.createElement("p");
                title.textContent = element.Title;

                newFilm.appendChild(title);
                films.appendChild(newFilm);
            });

        }else{
            results.textContent = "Total Results: 0";
        }
        
        
        
    }
}