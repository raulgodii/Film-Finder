class OmdbApi{
    searchRequest(){
        let searchInput = document.getElementById("search-input");

        this.loadDoc(searchInput.value);
        searchInput.textContent = "";

    }

    
    loadDoc(searchInputValue) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            let json = JSON.parse(this.response);

            console.log(json);
        }
        xhttp.open("GET", "Controllers/apicontroller.php?s="+searchInputValue, true);
        xhttp.send();
    }
}