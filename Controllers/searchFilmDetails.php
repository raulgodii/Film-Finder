<?php
    // API key
    $apiKey = "3da0e6a9";
    
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        $i = $_GET["i"]; // Movie ID to search for

        // URL of the API
        $url = "https://www.omdbapi.com/?apikey=$apiKey&i=$i";

        echo file_get_contents($url);
    }
?>