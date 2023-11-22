class OmdbApi{
    // Search Request to the API
    async searchRequest(searchInput){

        await this.loadDoc(searchInput.value);

    }

    // AJAX request method to the API
    loadDoc(searchInputValue) {
        return new Promise((resolve, reject) => {
            const xhttp = new XMLHttpRequest();

            xhttp.open("GET", "Controllers/apicontroller.php?s=" + searchInputValue, true);
            xhttp.onload = function () {
                // Parsear la respuesta JSON
                json = JSON.parse(this.response);

                // Resolver la promesa
                resolve();
            };

            // Manejar posibles errores en la solicitud AJAX
            xhttp.onerror = function () {
                console.error("Error en la solicitud AJAX");
                
                // Rechazar la promesa en caso de error
                reject();
            };

            // Enviar la solicitud AJAX
            xhttp.send();
        });
    }
    
}