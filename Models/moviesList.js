class moviesList{
    movies;
    totalResults;
    pages;
    response = false;

    // Search Request to the API
    async searchRequest(searchInput){

        await this.loadDoc(searchInput.value);

    }

    // AJAX request method to the API
    loadDoc(searchInputValue) {
        return new Promise((resolve) => {
            const xhttp = new XMLHttpRequest();

            xhttp.open("GET", "Controllers/apicontroller.php?s=" + searchInputValue, true);
            xhttp.onload = () => {
                // Parse JSON response
                let json = JSON.parse(xhttp.response);
                

                if(json.Response == "True"){
                    this.totalResults = json.totalResults;
                    this.pages = Math.ceil(this.totalResults/10);

                    this.movies = [];
                    json.Search.forEach(movie => {
                        this.movies.push(movie);
                    });

                    this.response = true;
                }else{
                    this.response = false;
                }
                

                // Resolve promise
                resolve();
            };

            // Send AJAX request
            xhttp.send();
        });
    }
    
}