// Create a Scope to limit our variables
{

    let navBar = document.querySelector('nav');


    // First create the header
    let newHeader = document.createElement('h4');
    newHeader.id = 'myHeader';
    newHeader.className = 'text-center mt-3';
    newHeader.innerHTML = 'Get the current weather for any city';
    newHeader.style.color = 'black';


    // Add the new header AFTER the row of buttons (vs appending to the end)
    navBar.after(newHeader);

    // change background color
    let body = document.body;
    body.style.background = `#caf0f8`
}

// Create a new scope
{
    // Get the header we created
    let myHeader = document.getElementById('myHeader');
    // console.log(myHeader);

    // Create a function to be executed when our event triggers
    function handleHeaderEvent(event){
        // console.log(event);
        let elementToChange = event.target;
        // console.log(elementToChange);
        if (elementToChange.style.color === 'black'){
            elementToChange.style.color = `#fb5607`;
        } else {
            elementToChange.style.color = 'black';
        }
    }

    // Add the handleHeaderEvent function as an event listener on the header
    myHeader.addEventListener('click', handleHeaderEvent)
}



// Get the country from the form and display on the page
{
    // Grab the form
let form = document.getElementById('cityForm');
// console.log(form);

// create a function to handle submit event
async function handleSubmit(e){
    e.preventDefault(); // Prevent the event from refreshing the page
    let inputCity = e.target.city.value; // Get the input value from the form
    let city = await getWeatherInfo(inputCity); // Call the get country info function with the data from the form
    buildWeatherCard(city);
    console.log(city)
}

// Function that will get the data from the Weather API using lat and long
// async function getWeatherInfo(lat, lon){
// let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
// let data = await res.json()
// return data

// Function that will get the data from the Weather API by city
async function getWeatherInfo(inputCity){
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=imperial`)
    let data = await res.json()
    return data
    }


    // Function that will take the city object from the API and build an HTML card for it
function buildWeatherCard(cityObj){
        // Create a card div
    let card = document.createElement('div');

    ///////////  Image changes depending on skies ///////////////////

    let skies = cityObj.weather[0].main
    console.log(skies)
    
    if (skies == 'Clouds'){
        let image = document.createElement('img');
        image.className = 'card-img-top mt-4';
        image.src = `/static/images/cloudy.png`
        card.append(image);}

    if (skies == 'Clear'){
        let image = document.createElement('img');
        image.className = 'card-img-top mt-4';
        image.src = `/static/images/sunny.png`
        card.append(image);}

    // ///////////////////////   // ///////////////////////

    // Create card body
    
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body mb-4';
    cardBody.style = 'background: #edf6f9'

    // Create city name and current temp elements
    let cityName = document.createElement('h5');
    cityName.className = 'card-title text-center';
    cityName.style = 'color: #00b4d8;'
    cityName.innerHTML = cityObj.name;

    // define a function to capitalize the first letter of the clouds description
    function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);}

    // adding cloudy or clear and current temp to card
    let currentTemp = document.createElement('p');
    clouds = cityObj.weather[0].description
    capitalClouds = capitalizeFirstLetter(clouds)
    temp = cityObj.main.temp.toFixed(0)
    currentTemp.className = 'card-text text-center';
    currentTemp.innerHTML = `${capitalClouds} with a current temp of ${temp} °F`;

    // high temp
    let high = document.createElement('p');
    let highTemp = cityObj.main.temp_max.toFixed(0)
    high.className = 'card-text text-center';
    high.innerHTML = `Today has a high of ${highTemp} °F`;

    // low temp
    let low = document.createElement('p');
    low.className = 'card-text text-center';
    low.innerHTML = `With a low of ${cityObj.main.temp_min.toFixed(0)} °F`;
    
    // feels like
    let feels_like = document.createElement('p');
    feels_like.className = 'card-text text-center';
    feels_like.innerHTML = `It feels like ${cityObj.main.feels_like.toFixed(0)} °F`;


    // Add cityName and currentTemp to the card body
    cardBody.append(cityName);
    cardBody.append(currentTemp);
    cardBody.append(high);
    cardBody.append(low);
    cardBody.append(feels_like);

    // Add the card body to the card
    card.append(cardBody);

    // Create a column for the row
    let col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-3';
    col.append(card);

    // Get the country display row and add our new column
    document.getElementById('weatherDisplay').append(col);
    
}

    // Add handleSubmit function as listener to submit event on form
form.addEventListener('submit', handleSubmit);
}
