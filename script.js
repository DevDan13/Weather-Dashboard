$(document).ready(function () {

    var searchButton = $("#searchBtn");

    var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory")) || [];
    showSearchHistory();

    var lastSearched = (searchHistoryArr[searchHistoryArr.length - 1]);
    presentForecast(lastSearched);

    searchButton.on("click", function (event) {
        event.preventDefault();
        var citySearch = $(this).siblings("#citySearch").val();
        presentForecast(citySearch);

        if (citySearch === "") {
            return;
        } else {
            searchHistoryArr.push(citySearch);
            localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
            showSearchHistory();
        }
    })

    function showSearchHistory(){
        var searchHistory = $(".search-history");

        searchHistory.empty();

        for(var i = 0; i < searchHistoryArr.length; i++){
            var historyButton = $("<button class= 'list-group-item'>").text(searchHistoryArr[i]);
            
            searchHistory.prepend(historyButton);
        }

        var citySearch = $("#citySearch");
        citySearch.val("");
    }

    $(document).on("click", ".list-group-item", function () {
        var citySearch = $(this).text();
        presentForecast(citySearch);
    });
    function presentForecast(citySearch){


            //variables to fill the main weather card
            var cityName = $("#cityName");
            //var presentIcon = $("#presentIcon");
            var presentTemp = $("#presentTemp");
            var presentHumid = $("#presentHumid");
            var windSpeed = $("#windSpeed");
            var uvIndex = $("#uvIndex");


            //our queryURL for current weather 
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=171a41c2a4c3b7c582f7e6e1ed1588c2"

            //console.log(queryURL);


            futureForecast(citySearch);

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

                        console.log(response);

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
    }

    function futureForecast(citySearch) {
        //5day forcast goes here
        var fiveDayQueryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=171a41c2a4c3b7c582f7e6e1ed1588c2"

        $.ajax({
            url: fiveDayQueryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log('forecast ', response);
                var start5Day= 1;
                var futureForecast = [
                    {
                        date: $("#day1Date"),
                        temp: $("#day1Temp"),
                        humid: $("#day1Humidity")
                    },
                    {
                        date: $("#day2Date"),
                        temp: $("#day2Temp"),
                        humid: $("#day2Humidity")
                    },
                    {
                        date: $("#day3Date"),
                        temp: $("#day3Temp"),
                        humid: $("#day3Humidity")
                    },
                    {
                        date: $("#day4Date"),
                        temp: $("#day4Temp"),
                        humid: $("#day4Humidity")
                    },
                    {
                        date: $("#day5Date"),
                        temp: $("#day5Temp"),
                        humid: $("#day5Humidity")
                    },
                ]
                //date loop
                for(var i=0; i <futureForecast.length;i++){
                    var nextDay = moment().add(start5Day, "day");
                    nextDay = String(nextDay); 
                    nextDay = nextDay.substr(0, 15);
                    futureForecast[i].date.text(nextDay);
                    start5Day++;
                }

                var timeFilter = 0;

                //temp and humidity loop
                for (var i = 0; i < response.list.length; i++) {
                    if (response.list[i].dt_txt.indexOf('15:00:0')) {
                        
                        var kelvin = response.list[timeFilter].main.temp;
                        var fahrenheit = ((kelvin - 273.15) * 9 / 5 + 32).toFixed(2);
                        futureForecast[i].temp.text("Temperature: " + fahrenheit + "°F");
                        futureForecast[i].humid.text("Humidity: " + response.list[timeFilter].main.humidity + "%");
                        
                        timeFilter += 8;
                    }
                }
            })
    }
});
