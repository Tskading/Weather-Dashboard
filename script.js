$("#search").on("click", function(event){

    event.preventDefault();

    var city = $("#cityInput").val().trim();
    console.log("form input:", city);

    JSON.stringify(city);
    localStorage.setItem("city", city);

    var citySaved = localStorage.getItem("city");
    console.log("savedCity:", citySaved);

    var apiKey = "c974faa204b4ad1b94b52e7208baf451";

    $("#list-home-list").text(citySaved);
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" + city + "&appid=" + apiKey;

        
    console.log("queryURL:", queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log("temp" + response.main.temp);
        console.log("humidity" + response.main.humidity);
        console.log("wind speed" + response.wind.speed);

        $("#cityDateEl").text(response.name);

        $("#tempEl").text("Temperature: " + response.main.temp);
        console.log(response.main.temp - 273.15) * 1.80 + 32;

        $("#humidityEl").text("Humidity: " + response.main.humidity);

        $("#windSpeedEl").text("Wind Speed: " + response.wind.speed);

        // line for uv index data 

    })
  
});

