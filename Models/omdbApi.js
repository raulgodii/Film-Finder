class OmdbApi{
    // Search Request to the API
    async searchRequest(searchInput){

        await this.loadDoc(searchInput.value);

    }

    // AJAX request method to the API
    loadDoc(searchInputValue) {
        return new Promise((resolve) => {
            const xhttp = new XMLHttpRequest();

            xhttp.open("GET", "Controllers/apicontroller.php?s=" + searchInputValue, true);
            xhttp.onload = function () {
                // Parse JSON response
                json = JSON.parse(this.response);

                // Resolve promise
                resolve();
            };

            // Send AJAX request
            xhttp.send();
        });
    }
    
}