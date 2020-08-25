$(document).ready(function () {




  var APIKey = "95363c9ba847c3bf4a8dc87b81f4d40f";
  var cityArray = [];


  

  function displayCurrentWeather(city) {
     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey + "&units=imperial";
      console.log(queryURL);

      $.ajax({
          url: queryURL,
          method: "GET"
      })
          .then(function (response) {
              console.log(queryURL);

              $(".weather-info").empty();
              $(".condition-image").empty();
              console.log(response);
              
              var weatherInfo = $(".weather-info");
              console.log(weatherInfo);
              
              var tempResponse = response.main.temp;
              var temperature = $("<div>").text("Temperature: " + tempResponse + "℉");
              weatherInfo.append(temperature)

              var humidityResponse = response.main.humidity;
              var humidity = $("<div>").text("Humidity: " + humidityResponse + "%");
              weatherInfo.append(humidity);

             
              var windResponse = response.wind.speed;
              console.log("response is: ", response)
              
              var wind = $("<div>").text("Wind Speed: " + windResponse + " MPH");
              weatherInfo.append(wind);
              
              var iconcodeCurrent = response.weather[0].icon
              console.log(iconcodeCurrent);

              var iconurlCurrent = "http://openweathermap.org/img/w/" + iconcodeCurrent + ".png";

              $(".condition-image").append('<img src="' + iconurlCurrent + '" />');
          });
  }

  function displaySearchedCity(newCity) {

      $(".city-card-body").empty();

      console.log(cityArray);

      localStorage.setItem("searchedCity", JSON.stringify(cityArray))

      for (var i = 0; i < cityArray.length; i++) {
          var cityName = $("<p>");
          cityName.addClass("new-city-p");
          cityName.attr(cityArray[i]);
          cityName.text(cityArray[i]);
          $(".city-card-body").append(cityName);
      }
  }

  function fiveDayForecast(inputCityName) {
      var queryTemp = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputCityName + "&APPID=" + APIKey + "&units=imperial";
      var queryConditionImage =
          $.ajax({
              url: queryTemp,
              method: "GET"
          })
              .then(function (responseTemp) {

                  console.log(responseTemp)

                  $(".forecastCards").empty();

                  for (var i = 0; i < 5; i++) {

                      console.log(responseTemp.list[i].main.temp);

                      var forecastDate = responseTemp.list[i].dt_txt.slice(0, 10);
                      console.log(forecastDate);
                      var forecastTemp = responseTemp.list[i].main.temp;
                      var forecastHumidity = responseTemp.list[i].main.humidity;
                      var iconcode = responseTemp.list[i].weather[0].icon;
                      console.log(iconcode);
                      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

                      var cardContent =
                          "<div class='col-sm-2 cardDay'><p class='dateForecast'>" +
                          forecastDate +
                          "</p><p>" +
                          '<img src="' + iconurl + '" />' +
                          "</p><p>" +
                          "Temp: " +
                          forecastTemp +
                          '℉' +
                          "</p><p>" +
                          'Humidity: ' +
                          forecastHumidity +
                          '%' +
                          "</p></div>";
                      $(".forecastCards").append(cardContent);





                  }
              })
  }


  $("#search-button").on("click", function (event) {

      event.preventDefault();

      var inputCityName = $("#city-input").val().trim();
      cityArray.push(inputCityName);

      $(".city").text((inputCityName))
      var todayDate = $('.today-date');
      console.log(todayDate)
      $(todayDate).text("(" + (moment().format('MM/DD/YYYY')) + ")")

      var fiveDayText = $('#five-day-text')
      console.log(fiveDayText)
      $(fiveDayText).text("3-Hour Forecast: ")

      displayCurrentWeather(inputCityName);
      displaySearchedCity(inputCityName);
      fiveDayForecast(inputCityName)
      console.log(cityArray)

  });

  $(".city-card-body").on("click", ".new-city-p", function (event) {

      console.log(event.currentTarget.innerText);

      event.preventDefault();
      $(".city").text(event.currentTarget.innerText);
      displayCurrentWeather(event.currentTarget.innerText);

  })

})