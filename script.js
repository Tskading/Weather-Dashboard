// Start of main callback function on search click
$("#search").on("click", function(event){
    event.preventDefault();
// getting the text from the search input and console.logging it
    var city = $("#cityInput").val().trim();
    // console.log("form input:", city);
// stringifying city and set to local storage
    JSON.stringify(city);
    localStorage.setItem("city", city);
// last city saved in local storage
    var citySaved = localStorage.getItem("city");
    // console.log("savedCity:", citySaved);
// api key
    var apiKey = "c974faa204b4ad1b94b52e7208baf451";

// api query url 
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" + city + "&units=imperial&appid=" + apiKey;
            
    // console.log("queryURL:", queryURL);

// making a new list button with cities searched    
    $("#listCities").text(citySaved);

// ajax call and filling in main card with response data
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        // console.log("temp" + response.main.temp);
        // console.log("humidity" + response.main.humidity);
        // console.log("wind speed" + response.wind.speed);

        $("#cityDateEl").text(response.name);

        $("#weatherSprite").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

        $("#tempEl").text("Temperature: " + response.main.temp + " °F");
        
        $("#humidityEl").text("Humidity: " + response.main.humidity + "%");

        $("#windSpeedEl").text("Wind Speed: " + response.wind.speed + "mph");

        

            // ajax call for the forecast data cards
            function displayForecast() {

                var apiKey = "c974faa204b4ad1b94b52e7208baf451";
                var query2URL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;
                // console.log(query2URL);

                $.ajax({
                    url: query2URL,
                    method: "GET"
                }).then(function(e) {
            console.log(e);
            // console.log(e.list);
                    // How to identify the 5 index points (from 40) we want to pull from to get the 5 day forecast
                    var forecastPlusOne = 1; 

                    for (var i = 0; i < e.list.length; i++) {
                        var forecastDate = e.list[i].dt_txt.split(" ")[0];
                        var forecastTime = e.list[i].dt_txt.split(" ")[1];

                        if ( forecastTime === "12:00:00") {
                            $("#day" + forecastPlusOne).children(".cardDate").text(forecastDate);
                            $("#weatherImage" + forecastPlusOne).attr("src", "http://openweathermap.org/img/w/" + e.list[i].weather[0].icon + ".png");
                            $("#day" + forecastPlusOne).children(".cardTemp").text("Temperature: " + e.list[i].main.temp + " °F");
                            $("#day" + forecastPlusOne).children(".cardHumidity").text("Humidity: " + e.list[i].main.humidity + " %");
                            $("#day" + forecastPlusOne).children(".cardWindSpeed").text("Wind Speed: " + e.list[i].wind.speed + " mph");
                            forecastPlusOne++;
                        }
                    }

            
                });
            };
            displayForecast(response);
    });
  
});

// function cityButtons(){
//     for ( i = 0; i < cities.length; i++) {
//       var button = $("<button>"); 
//       button.addClass("cityButton");
//       button.attr("data-city", cities[i]);
//       button.text(cities[i]);
//       $("#searchedCities").append(button); 
//     }
// };