// Create a Scope to limit our variables


{
    // set the navbar to dark by replacing the word 'light' with 'dark' in className
    let navBar = document.querySelector('nav');


    // First create the header
    let newHeader = document.createElement('h4');
    newHeader.id = 'myHeader';
    newHeader.className = 'text-center mt-3';
    newHeader.innerHTML = 'Find the current weather for any location ';
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

        // let lat = countryObj.latlng[0]
        // let lon = countryObj.latlng[1]
        // let weatherInfo = await getWeatherInfo(lat, lon)
        // console.log(weatherInfo)
        // console.log(weatherInfo.main.feels_like)
        // let inputCity = city
        // let weatherInfo =  getWeatherInfo(inputCity)
        // console.log(weatherInfo);

        // Create a card div

    let card = document.createElement('div');
    card.className = 'card';
    console.log(cityObj.main.feels_like)

    // Create a top image
    let image = document.createElement('img');
    image.className = 'card-img-top';
    image.src = `https://www.ksnt.com/wp-content/uploads/sites/86/2016/03/sunshine_36360441_ver1.0-1.jpg?w=500&h=375&crop=1`
    // Add image as a child to the card div
    card.append(image);

    // Create card body
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Create city name and current temp elements
    let cityName = document.createElement('h5');
    cityName.className = 'card-title';
    cityName.innerHTML = cityObj.name;

    let currentTemp = document.createElement('p');
    currentTemp.className = 'card-text';
    currentTemp.innerHTML = `The current temperature in ${cityObj.name} is ${cityObj.main.temp} °F`;

    let high = document.createElement('p');
    high.className = 'card-text';
    high.innerHTML = `Today has a high of ${cityObj.main.temp_max} °F`;


    let hello = document.createElement('p');
    hello.className = 'card-text';
    hello.innerHTML = `It feels like ${cityObj.main.feels_like} °F`;

    let feels_like = document.createElement('p');
    low.className = 'card-text';
    low.innerHTML = `It feels like ${cityObj.main.feels_like} °F`;


    // Add cityName and currentTemp to the card body
    cardBody.append(cityName);
    cardBody.append(currentTemp);
    cardBody.append(high);
    cardBody.append(hello);
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
