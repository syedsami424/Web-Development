fetch('city_coordinates.json')
    .then(response => response.json())
    .then(data=>{
        const dropdown=document.getElementById("select-city");
        let l=data.city_coordinates.length;

        for(let i=1; i<l; i++){
            const city=`${data.city_coordinates[i].city}`;
            const country=`${data.city_coordinates[i].country}`
            const option_text=city+", "+country;
            const option=document.createElement("option");
            option.innerHTML=option_text;
            dropdown.appendChild(option);
        }

        dropdown.addEventListener("change", function(){
            const selectedOption= dropdown.value;
            console.log(selectedOption);

            if(selectedOption=="None"){
                alert("Please pick a place");
            }
            else if(selectedOption!="None"){
                const [selectedCity, selectedCountry] = selectedOption.split(", ");
                const cityData = data.city_coordinates.find((item)=> item.city === selectedCity && item.country === selectedCountry);

                if(cityData){
                    const {latitude, longitude} = cityData;
                    var lat=`${latitude}`;
                    var lon=`${longitude}`;
                    console.log(lat);
                    console.log(lon);
                    /*const coords={
                        latitude: lati,
                        longitude: long
                    };*/
                    window.lon = lon;
                    window.lat = lat;
                    console.log("here");
 
                    fetch(`http://localhost:5500/getWeather?lon=${lon}&lat=${lat}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    });
                }
            }
        })
    })


const weatherButton=document.getElementById("getWeather");
weatherButton.addEventListener("click",()=>{
    fetch(`http://localhost:5500/getWeather?lon=${lon}&lat=${lat}`)
    .then(response => response.json())
    .then(data => {
        let l=data.weatherData.dataseries.length
        let lon=data.longitude;
        let lat=data.latitude;
        console.log(lon);
        console.log(lat);
        const img_element=document.getElementById("icon");
        const tableBody=document.getElementById("tableBody");
        img_element.src=`http://www.7timer.info/bin/astro.php?lon=${lon}&lat=${lat}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`;
        console.log(l);

        const days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let dayIndex=0;
        let counter=0;

        for(let i=0; i<=l; i++){
            const dataPoint=data.weatherData.dataseries[i];
            const newRow=document.createElement("tr");

            if(counter == 0){
                const newRow=document.createElement("tr");
                const dayHeader=document.createElement("th");
                dayHeader.textContent=days[dayIndex++];
                newRow.appendChild(dayHeader);
                tableBody.appendChild(newRow);
            }

            const timepoint_Cell = document.createElement("td");
            timepoint_Cell.innerHTML = `Timepoint: ${dataPoint.timepoint}`;
            newRow.appendChild(timepoint_Cell);

            const cloudcover_Cell = document.createElement("td");
            cloudcover_Cell.innerHTML = `Cloud cover: ${dataPoint.cloudcover}`;
            newRow.appendChild(cloudcover_Cell);

            const liftedIndex_Cell = document.createElement("td");
            liftedIndex_Cell.innerHTML = `Lifted index: ${dataPoint.lifted_index}`;
            newRow.appendChild(liftedIndex_Cell);

            const precipitation_Cell1 = document.createElement("td");
            precipitation_Cell1.innerHTML = `Precipitation type: ${dataPoint.prec_type}`;
            newRow.appendChild(precipitation_Cell1);

            const precipitation_Cell2 = document.createElement("td");
            precipitation_Cell2.innerHTML = `Precipitation amount: ${dataPoint.prec_amount}`;
            newRow.appendChild(precipitation_Cell2);

            const temperature_cell = document.createElement("td");
            temperature_cell.innerHTML = `Temperature: ${dataPoint.temp2m}°C`;
            newRow.appendChild(temperature_cell);

            const relativeHum_cell = document.createElement("td");
            relativeHum_cell.innerHTML = `Relative humidity: ${dataPoint.rh2m}`;
            newRow.appendChild(relativeHum_cell);

            const wind_cell = document.createElement("td");
            wind_cell.innerHTML = `Wind: ${JSON.stringify(dataPoint.wind10m)}`;
            newRow.appendChild(wind_cell);

            const weather_cell = document.createElement("td");
            weather_cell.innerHTML = `Weather: ${dataPoint.weather}`;
            newRow.appendChild(weather_cell);

            tableBody.appendChild(newRow);
            counter++;

            if(counter == 8){
                counter=0;
            }
        }
    })
    .catch(error => {
        console.error(error);
    });
});

/*fetch('http://localhost:5500/getimage')
    .then(response => response.blob())
    .then(blob => {
        const img_element=document.getElementById("icon");
        img_element.src=`http://www.7timer.info/bin/astro.php?lon=${lon}&lat=${lat}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`;
    });
*/