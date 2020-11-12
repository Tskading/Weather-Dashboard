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
        console.log(response.main.temp);

        $("#cityDateEl").text(response.name);

        $("#tempEl").text(response.main.temp);

        $("#humidityEl").text(response.main.humidity);



    })



  
});

