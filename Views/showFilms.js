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
                newFilm.className = "film-item";

                let img = document.createElement("img");
                
                if(element.Poster == "N/A"){
                    img.src = "Assets/NA.jpg";
                } else {
                    img.src = element.Poster;
                }

                let title = document.createElement("p");
                title.className = "title";
                title.textContent = element.Title;
                newFilm.imdbID = element.imdbID;

                let type = document.createElement("p");
                type.className = "type";
                type.textContent = element.Type;

                newFilm.appendChild(img);
                newFilm.appendChild(title);
                newFilm.appendChild(type);
                films.appendChild(newFilm);

                if(element.show == "no") newFilm.style.display = "none";
            });

        }else{
            results.textContent = "Total Results: 0";
        }
        
    }

    firstSearch() {
        document.getElementById("center").style.display = "none";
        document.getElementById("main-films").style.display = "block";
    }
    

    showFilm(filmDetails){
        let details = document.getElementById("details-film");
        details.style.transform = "translate(-50%, -50%)";

        document.body.style.overflow = "hidden";

        // Title
        let title = details.getElementsByClassName("header-detail-title")[0];
        title.textContent = filmDetails.Title;

        // IMG
        let img = details.querySelector(".main-detail-section img");
        if(filmDetails.Poster == "N/A"){
            img.src = "Assets/NA.jpg";
        } else {
            img.src = filmDetails.Poster;
        }

        // Plot
        let plot = details.querySelector(".detail-plot");
        plot.textContent = filmDetails.Plot;

        // Release
        let release = details.querySelector(".detail-release");
        release.innerHTML = "<b>Released: </b>" + filmDetails.Released;

        // Genre
        let genre = details.querySelector(".detail-genre");
        genre.innerHTML = "<b>Genre: </b>" + filmDetails.Genre;

        // Rating
        let rating = details.querySelector(".detail-rating");
        rating.innerHTML = "<b>Rating: </b>" + filmDetails.imdbRating;

        // Director
        let director = details.querySelector(".detail-director");
        director.innerHTML = "<b>Director: </b>" + filmDetails.Director;

        // Actors
        let actors = details.querySelector(".detail-actors");
        actors.innerHTML = "<b>Actors: </b>" + filmDetails.Actors;

        // Fundraising
        let fundraising = details.querySelector(".detail-fundraising");
        fundraising.innerHTML = "<b>Fundraising: </b>" + filmDetails.BoxOffice;

        // Votes
        let votes = details.querySelector(".detail-votes");
        votes.innerHTML = "<b>Votes: </b>" + filmDetails.imdbVotes;
        
    }

    // Change the landing page when there is a search
    changeLandingPage(){
        document.getElementById("center").style.display = "none";
    }

    closeDetailPage(){
        let details = document.getElementById("details-film");
        details.style.transform = "translate(-50%, -150%)";
        document.body.style.overflow = "visible";
    }

    drawChart(movies = [], order = "Ranking"){

        var dataTable = [['Title', 'Data']];
        var title = "No Title";

        if(order == "Ranking"){
            title = "Ranking - Analytics";
            for(let movie of movies){
                if(movie && movie.imdbRating && movie.imdbRating != "N/A"){
                    dataTable.push([movie.Title, parseFloat(movie.imdbRating)]);
                } else{
                    dataTable.push([movie.Title, 0]);
                }
            }
        }

        if(order == "Fundraising"){
            title = "Fundraising - Analytics";
            function convertToFloat(currencyString) {
                const cleanNumberString = currencyString.replace(/[^\d.]/g, '');
            
                const floatValue = parseFloat(cleanNumberString);
            
                return floatValue;
            }

            for(let movie of movies){
                if(movie && movie.BoxOffice && movie.BoxOffice != "N/A"){
                    dataTable.push([movie.Title, convertToFloat(movie.BoxOffice)]);
                } else{
                    dataTable.push([movie.Title, 0]);
                }
            }
        }

        if(order == "Votes"){
            title = "Votes - Analytics";

            for(let movie of movies){
                if(movie && movie.imdbVotes && movie.imdbVotes != "N/A"){
                    dataTable.push([movie.Title, parseFloat(movie.imdbVotes)]);
                } else{
                    dataTable.push([movie.Title, 0]);
                }
            }
        }

        console.log(dataTable)


        var data = google.visualization.arrayToDataTable(dataTable);

        var options = {
            title: title,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }
}