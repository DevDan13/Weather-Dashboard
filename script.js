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


        //our queryURL for current weather 
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=171a41c2a4c3b7c582f7e6e1ed1588c2"

        //console.log(queryURL);


        forecast(citySearch);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                //console.log(response);
                var results = response.main;
                //console.log(results);

                var presentDate = moment().format("l");
                var kelvin = results.temp;
                var fahrenheit = ((kelvin - 273.15) * 9 / 5 + 32).toFixed(2);

                //hard code city name, temp, humidity,windspeed, and uvIndex in html for the card.
                cityName.text(response.name + " " + presentDate);
                presentTemp.text(fahrenheit + "°F");
                presentHumid.text(results.humidity + "%");
                windSpeed.text(response.wind.speed + " MPH")


                //==============================================================================================
                //vars used in UVqueryURL. did not work unless nested in first ajax call. other solution possible?
                var UVlat = response.coord.lat;
                var UVlon = response.coord.lon;
                var UVqueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + UVlat + "&lon=" + UVlon + "&appid=171a41c2a4c3b7c582f7e6e1ed1588c2"
                $.ajax({
                    url: UVqueryURL,
                    method: "GET"
                })
                    .then(function (response) {

                        //  console.log(response);

                        function RemoveClasses() {
                            var uvClass = $("#uvIndex");

                            uvClass.removeClass("uvLow");
                            uvClass.removeClass("uvMod");
                            uvClass.removeClass("uvHigh");
                            uvClass.removeClass("uvVeryHigh");
                            uvClass.removeClass("uvExtreme");
                        }

                        RemoveClasses();
                        uvIndex.text(response.value);
                        var uvValue = Math.round(response.value);

                        if (uvValue <= 2) {
                            uvIndex.addClass("uvLow");
                        }
                        else if (uvValue >= 3 && uvValue <= 5) {
                            uvIndex.addClass("uvMod");
                        }
                        else if (uvValue >= 6 && uvValue <= 7) {
                            uvIndex.addClass("uvHigh");
                        }
                        else if (uvValue >= 8 && uvValue <= 10) {
                            uvIndex.addClass("uvVeryHigh");
                        }
                        else {
                            uvIndex.addClass("uvExtreme");
                        }
                    })
            })






    })

    function forecast(citySearch) {
        //5day forcast goes here
        var fiveDayQueryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=171a41c2a4c3b7c582f7e6e1ed1588c2"

        $.ajax({
            url: fiveDayQueryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log('forecast ', response);
                // for (var i = 0; i < response.list.length; i++) {
                //     if (response.list[i].dt_txt.indexOf('15:00:0')) {

                //         var day1Date = $("#day1Date");
                        

                //         //use two arrays of objects to complete fields for all 5 days?

                //     }
                // }
            })
    }
});
