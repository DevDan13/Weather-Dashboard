# Weather-Dashboard

## Major Progress Block 1

  * Created the skeleton HTML to begin to know what goes where for this project. 

  * A neat nav bar was imported from bootstrap and displayed at the top of the page.

  * Cards were used from bootstrap.  One from the side card and one for the main card.

  * an input field and button were created in order for the user to search for a city.

  * this search would populate the main card and 5day foorecast with data.

  ## Major Block Progress 2

    * created event listener on click for search button

    * in it the presentForecast function is created and takes the users city search as a parameter.

    * The presentForecast function contains the first two ajax calls which are nested.

    * This was to ensure that the lat and lon of the first ajax call are passed to the UVQueryURL.

    * Variables are declared with the respective html location and passed through the .text() method.

    * The first ajax call is made here using the current weather api of openweathermap.

    * console.log(response) is used to find the data in the api.

    * all neccessary data is pulled from the response object in this call. Temp, wind speed, humidity and date.

               //hard code city name, temp, humidity,windspeed, and uvIndex in html for the card.
                    cityName.text(response.name + " " + presentDate);
                    presentTemp.text(fahrenheit + "°F");
                    presentHumid.text(results.humidity + "%");
                    windSpeed.text(response.wind.speed + " MPH")

    * This data is pulled and written to the main card where the data is neatly displayed.

    ## Major Task 3

    * UV index api is used from openweathermap and an ajax call is made with a new response object.

    * the removeClasses function is called and all color classes for the UV index are removed.

          function RemoveClasses() {
            var uvClass = $("#uvIndex");

            uvClass.removeClass("uvLow");
            uvClass.removeClass("uvMod");
            uvClass.removeClass("uvHigh");
            uvClass.removeClass("uvVeryHigh");
            uvClass.removeClass("uvExtreme");
        }

    * an if conditional then checks the value returned from response and sets its color according to the
      the severity of the Ultra Violet rays. The more the worse!

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

## Major Task 4

* created an array of objects to populate the columns. the keys are apporpiately named and the values
  are their respective html locations.

* used a for loop for the date bu using moment.js to loop for the next 5 days.

                //date loop
                for(var i=0; i <futureForecast.length;i++){
                    var nextDay = moment().add(start5Day, "day");
                    nextDay = String(nextDay); 
                    nextDay = nextDay.substr(0, 15);
                    futureForecast[i].date.text(nextDay);
                    start5Day++; 
                }

* a new loop was used to put the temp and humidity to the page.

* this loop needed a different counter rather than use i due to the data returned from the api.

    * the 5 day forecast api returned three hours worth of data at a time. this array was 40 items long.

    * a new counter was used and incremented by 8 at the end of the loop to ensure the same time was grabbed
      for each day.

    * this counter was used while i only was only used to exit the loop after 5 iterations.

* all relevant data was properly displayed under the 5 day forecast.

## Major Task 5

* completed local storage buttons which appear under the search bar with the searched city's name.

* search buttons are dynamically created and the data is appended to the page.

* An array is used and the main card and 5 day forecast data are pushed into searchHistoryArr for 
  local storage,

* the buttons when clicked show the data relevant to that city.

* when the screen is cleared or tab closed the lastest result is displayed onto the screen.


## Project Link

https://devdan13.github.io/Weather-Dashboard/

## Demo Image

![image](https://user-images.githubusercontent.com/69943020/97150997-4b649f80-1745-11eb-98da-54d439ff6030.png)

