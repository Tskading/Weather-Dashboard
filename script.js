$("#search").on("click", function(event){

    event.preventDefault();
// getting the text from the search input and console.logging it
    var city = $("#cityInput").val().trim();
    console.log("form input:", city);
// stringifying city and set to local storage
    JSON.stringify(city);
    localStorage.setItem("city", city);
// last city saved in local storage
    var citySaved = localStorage.getItem("city");
    console.log("savedCity:", citySaved);
// api key
    var apiKey = "c974faa204b4ad1b94b52e7208baf451";

// api query url 
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" + city + "&units=imperial&appid=" + apiKey;
            
    console.log("queryURL:", queryURL);

// making a new list button with cities searched
    
    $("#listCities").text(citySaved);

// ajax call and filling in main card with response data
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log("temp" + response.main.temp);
        console.log("humidity" + response.main.humidity);
        console.log("wind speed" + response.wind.speed);

        $("#cityDateEl").text(response.name);

        $("#tempEl").text("Temperature: " + response.main.temp + " °F");
        
        $("#humidityEl").text("Humidity: " + response.main.humidity + "%");

        $("#windSpeedEl").text("Wind Speed: " + response.wind.speed + "mph");

        // line for uv index data 

            // ajax call for the forecast data cards
            function displayForecast() {

                var apiKey = "c974faa204b4ad1b94b52e7208baf451";
                var query2URL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;
            
                $.ajax({
                    url: query2URL,
                    method: "GET"
                }).then(function(e) {
            console.log(e);

            // $("#cardDate").text()
                });
            };
            displayForecast(response);
    });
  
});

