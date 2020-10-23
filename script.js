$(document).ready(function () {
    var searchButton = $("#searchBtn");

    searchButton.on("click", function (event) {
        event.preventDefault();

        //variables to fill the main weather card
        var citySearch = $(this).siblings("#citySearch").val();
        var cityName = $("#cityName");
        var presentIcon = $("#presentIcon");
        var presentTemp = $("#presentTemp");
        var presentHumid = $("#presentHumid");
        var windSpeed = $("#windSpeed");
        var uvIndex = $("#uvIndex");

        //variables to fill the 5 day forcast section
        //var futureDate = $("#citySearch");

        //our queryURL for current weather 
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=171a41c2a4c3b7c582f7e6e1ed1588c2"

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                var results = response.main;
                console.log(results);

                var presentDate = moment().format("l");
                var kelvin = results.temp;
                var fahrenheit = ((kelvin - 273.15) * 9 / 5 + 32).toFixed(2);

                //hard code city name, temp, humidity,windspeed, and uvIndex in html for the card.
                cityName.text("City: " + response.name + " " + presentDate);
                presentTemp.text("Temperature: " + fahrenheit + "°F");
                presentHumid.text("Humidity: " + results.humidity + "%");
                windSpeed.text("Wind Speed: " + response.wind.speed + " MPH")


                //vars used in UVqueryURL. did not work unless nested in first ajax call. other solution possible?
                var UVlat = response.coord.lat;
                var UVlon = response.coord.lon;
                var UVqueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + UVlat + "&lon=" + UVlon + "&appid=171a41c2a4c3b7c582f7e6e1ed1588c2"
                $.ajax({
                    url: UVqueryURL,
                    method: "GET"
                })
                    .then(function (response) {
                        console.log(response);
                       
                        function RemoveClasses() {
                            var uvClass = $(".uvColor");

                            uvClass.removeClass("uvLow");
                            uvClass.removeClass("uvMod");
                            uvClass.removeClass("uvHigh");
                            uvClass.removeClass("uvVeryHigh");
                            uvClass.removeClass("uvExtreme");
                        }

                        //value contains the UV index obtained from the lattitude and longitude.
                        RemoveClasses();
                        uvIndex.text("UV Index: " + response.value);
                        var uvColor = $(".uvColor");
                        var uvValue = Math.round(response.value);

                            if (uvValue <= 2) {
                             uvColor.addClass("uvLow");
                            }
                            else if (uvValue >= 3 && uvValue <= 5) {
                             uvColor.addClass("uvLow");
                            }
                            else if (uvValue >= 6 && uvValue <= 7) {
                             uvColor.addClass("uvHigh");
                            }
                            else if (uvValue >= 8 && uvValue <= 10) {
                             uvColor.addClass("uvVeryHigh");
                            }
                            else {
                             uvColor.addClass("uvExtreme");
                            }
                    })

                //5day forcast goes here 
            })




    })
});
