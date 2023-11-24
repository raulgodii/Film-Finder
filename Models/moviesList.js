class moviesList{
    movies;
    totalResults;
    pages;
    response = false;
    actualPage = 1;
    executingRequest = false;

    // AJAX request method to the API
    loadDoc(searchInputValue, firstSearch) {
        // Check if there is one request running
        if (this.executingRequest) {
            return Promise.resolve();
        }

        this.executingRequest = true;

        if(firstSearch) this.actualPage = 1;

        return new Promise((resolve) => {
            const xhttp = new XMLHttpRequest();

            xhttp.open("GET", "Controllers/apicontroller.php?s=" + searchInputValue + "&page=" + this.actualPage, true);
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
}