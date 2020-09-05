let now = new Date();

let h4 = document.querySelector("h4");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

h4.innerHTML = `${day}, ${month}, ${date}, ${hours}:${minutes}, ${year}`;

function showWeather(response) {
  let h3 = document.querySelector("#temperaturee");
  h3.innerHTML = Math.round(response.data.main.temp);
  let h5 = document.querySelector("#humid");
  let humidity = Math.round(response.data.main.humidity);
  h5.innerHTML = ` ${humidity}%`;
  let h6 = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  h6.innerHTML = ` ${wind}%`;
  let city = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = city;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
  let h2 = document.querySelector("h2");
  h2.innerHTML = city;
}

function searchCity(city) {
  let apiKey = "300911517fb102390670104d7a123f35";
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);

function showPosition(position) {
  let apiKey = "300911517fb102390670104d7a123f35";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather, getCity);
}

function currentLocation() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let getLocation = document.querySelector("#location");
getLocation.addEventListener("click", currentLocation);
