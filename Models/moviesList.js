class moviesList{
    movies;
    totalResults;
    pages;
    response = false;
    actualPage = 1;
    executingRequest = false;

    // AJAX request method to the API - Search Films
    loadDoc(searchInputValue, firstSearch) {
        // Check if there is one request running
        if (this.executingRequest) {
            return Promise.resolve();
        }

        this.executingRequest = true;

        if(firstSearch) this.actualPage = 1;

        return new Promise((resolve) => {
            const xhttp = new XMLHttpRequest();

            xhttp.open("GET", "Controllers/searchFilms.php?s=" + searchInputValue + "&page=" + this.actualPage, true);
            xhttp.onload = () => {
                // Parse JSON response
                let json = JSON.parse(xhttp.response);

                if(firstSearch) this.searchFirstPage(json.Response, json.Search, json.totalResults);
                else{
                    let res = this.searchNextPage(json.Response, json.Search);
                    if(res ==="error") return;
                }

                this.executingRequest = false;

                // Resolve promise
                resolve();
            };

            // Send AJAX request
            xhttp.send();
        });
    }

    searchFirstPage(response, jsonSearch, totalResults){
        if(response == "True"){
            this.totalResults = totalResults;
            this.pages = Math.ceil(this.totalResults/10);
    
            this.movies = [];
            jsonSearch.forEach(movie => {
                this.movies.push(movie);
            });
            // this.actualPage = 1;
            this.actualPage++;
    
            this.response = true;
        }else{
            this.response = false;
        }
    }

    searchNextPage(response, jsonSearch){
        if(response == "True"){
            this.actualPage++;
            jsonSearch.forEach(movie => {
                this.movies.push(movie);
            });
    
            this.response = true;
        }else{
            return "error";
        }
    }   

    // AJAX request method to the API - Search Film Details
    loadDocFilm(imdbID) {

        return new Promise((resolve) => {
            const xhttp = new XMLHttpRequest();

            xhttp.open("GET", "Controllers/searchFilmDetails.php?i=" + imdbID, true);
            xhttp.onload = () => {
                // Parse JSON response
                let json = JSON.parse(xhttp.response);
                
                // Resolve promise
                resolve(json);
            };

            // Send AJAX request
            xhttp.send();
        });
    }

    async orderByRating(films) {
        const detailsArray = await Promise.all(films.map(movie => this.loadDocFilm(movie.imdbID)));
    
        const getImdbRating = (details) => {
            if (details.imdbRating === 'N/A') {
                return 0;
            }
            return parseFloat(details.imdbRating);
        };

        const filmsCopy = [...films];

        filmsCopy.sort((a, b) => {
            const detailsA = detailsArray.find(details => details.imdbID === a.imdbID);
            const detailsB = detailsArray.find(details => details.imdbID === b.imdbID);

            const ratingA = getImdbRating(detailsA);
            const ratingB = getImdbRating(detailsB);

            return ratingB - ratingA;
        });

        return filmsCopy;
    }

    async orderByFundraising(films) {
        const detailsArray = await Promise.all(films.map(movie => this.loadDocFilm(movie.BoxOffice)));
    
        const getImdbRating = (details) => {
            if (details.imdbRating === 'N/A') {
                return 0;
            }
            return parseFloat(details.imdbRating);
        };

        const filmsCopy = [...films];

        filmsCopy.sort((a, b) => {
            const detailsA = detailsArray.find(details => details.imdbID === a.imdbID);
            const detailsB = detailsArray.find(details => details.imdbID === b.imdbID);

            const ratingA = getImdbRating(detailsA);
            const ratingB = getImdbRating(detailsB);

            return ratingB - ratingA;
        });

        return filmsCopy;
    }
    
}