document.getElementById("weatherSubmit").addEventListener("click", event => {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
      return;
    console.log(value);
    // GET CURRENT WEATHER IN GIVEN CITY (NAME)
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=6cb68e866fb8a28497eb7120da1d1ba2";
    fetch(url)
        .then(response => {
            return response.json();
        }).then(json => {
            console.log(json);
            // test
            let sunrise = new Date((json.sys.sunrise) * 1000);
            let sunset = new Date((json.sys.sunset) * 1000);
            console.log(moment(sunrise).format('h:mm a'));
            // end test
            let results = "";
            results += '<div class="signup-header2"><h1 class="header2">Weather in ' + json.name + "</h1>";
            for (let i=0; i < json.weather.length; i++) {
                results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
            }
            results += '<h2>Currently ' + json.main.temp + " &deg;F</h2>";
            results += "<p>";
            for (let i = 0; i < json.weather.length; i++) {
                results += json.weather[i].description;
                if (i !== json.weather.length - 1) {
                    results += ", ";
                } 
            }
            results += "</p>";
            results += "<hr>";
            results += "<ul class='force-bullet'><li>Feels like: " + json.main.feels_like + 
            " &deg;F</li><li>High: " + json.main.temp_max + " &deg;F</li><li>Low: " + 
            json.main.temp_min + "&deg;F</li><li>Sunrise: " + moment(json.sys.sunrise * 1000).format('h:mm a') + 
            "</li><li>Sunset: " + moment(json.sys.sunset * 1000).format('h:mm a') + "</li><li>Wind: " + json.wind.speed + " mph</li></ul></div>";
            document.getElementById("weatherResults").innerHTML = results;
        }).catch(error => {
            console.log(error);
        });
    // GET FORECASTED WEATHER IN GIVEN CITY (NAME)
    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=6cb68e866fb8a28497eb7120da1d1ba2";
    fetch(url2)
        .then(response => {
        return response.json();
        }).then(json => {
        console.log(json);
        let forecast = "";
        for (let i = 0; i < json.list.length; i++) {
            if (i % 8 == 0) {
                forecast += "<div class='threeday signup-header2'>";
            }
            forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do, h:mm a') + "</h2>";
            forecast += "<p>" + json.list[i].main.temp + " &deg;F, " + json.list[i].weather[0].description + "</p>";
            forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
            forecast += "<hr>";
            forecast += "<ul class='force-bullet'><li>Feels like: " + json.list[i].main.feels_like + 
            " &deg;F</li><li>3-hr High: " + json.list[i].main.temp_max + " &deg;F</li><li>3-hr Low: " + 
            json.list[i].main.temp_min + "</li><li>Wind: " + json.list[i].wind.speed + " mph</li></ul>";
            if (i % 8 == 7) {
                forecast += "</div>";
            }
        }
        document.getElementById("forecastResults").innerHTML = forecast;
        });
  });