document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search").addEventListener("click", () => {
    let action = document.getElementById("action"); 
    action.textContent = "Searching ...";
    //  IIFE to create an asynchronous context
    (async function () {
      try {
        const data = await queryData();
        if (data) {
          action.innerText = "";
        }
        const address = data.resolvedAddress.toLowerCase().split(",");
        if (address[0] !== searchInput.value.toLowerCase()) {
          document.getElementById("notfound").innerText =
            "Weather data not found for the specified location.";
          let related = document.getElementById("related");
          related.style.display = "block";
        }
        displayData(data);
      } catch (error) {
        document.getElementById("notfound").innerText =
          "Invalid Search";
        action.innerText = "";
        console.error("Error:", error.message);
      }
    })();
  });
  async function queryData() {
    const searchInput = document
      .getElementById("searchInput")
      .value.toLowerCase();
    document.getElementById("notfound").innerText = "";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchInput}?unitGroup=metric&key=G7BFEZR7DZM5CDVAVZMJN4VTF&contentType=json`;
    const response = await fetch(url);
    if (!response.ok) {
      action.textContent = "";
      document.getElementById("notfound").textContent = "Bad Request.";
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  }
  function displayData(data) {
    // Clear any previous results
    document
      .querySelectorAll("#display div span")
      .forEach((element) => (element.textContent = ""));
    document.getElementById("resolvedAddress").textContent =
      `${data.resolvedAddress}`;
    document.getElementById("latitude").textContent =`${data.latitude}` ;
    document.getElementById("longitude").textContent =`${data.longitude}` ;
    document.getElementById("timezone").textContent = `${data.timezone}`;
    const {
      datetime: currentDatetime,
      temp: currentTemp,
      humidity: currentHumidity,
      pressure: currentPressure,
      windspeed: currentWindspeed,
      visibility: currentVisibility,
      cloudcover: currentCloudcover,
      solarradiation: currentSolarradiation,
      solarenergy: currentSolarenergy,
      conditions: currentConditions,
      sunrise: currentSunrise,
      sunset: currentSunset,
    } = data.currentConditions;
    document.getElementById("datetime").textContent = currentDatetime;
    document.getElementById("temp").textContent = currentTemp;
    document.getElementById("humidity").textContent = currentHumidity;
    document.getElementById("pressure").textContent = currentPressure ;
    document.getElementById("windspeed").textContent = currentWindspeed ;
    document.getElementById("visibility").textContent = currentVisibility;
    document.getElementById("cloudcover").textContent = currentCloudcover;
    document.getElementById("solarradiation").textContent =
      currentSolarradiation;
    document.getElementById("solarenergy").textContent = currentSolarenergy;
    document.getElementById("conditions").textContent = currentConditions;
    document.getElementById("sunrise").textContent = currentSunrise;
    document.getElementById("sunset").textContent = currentSunset
    // Daily forecast
    const dailyForecastSection = document.getElementById("forecast");
    data.days.forEach((day) => {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day-forecast"); // Add CSS class for styling
      const { datetime, tempmax, tempmin, conditions } = day;
      dayElement.innerHTML = `${datetime} => MaxTemp: ${tempmax}16&#176C , MinTemp: ${tempmin}12&#176C - ${conditions}`;
      dailyForecastSection.appendChild(dayElement);
    });
  }
});
