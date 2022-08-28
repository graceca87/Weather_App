// Create a Scope to limit our variables


{
    // set the navbar to dark by replacing the word 'light' with 'dark' in className
    let navBar = document.querySelector('nav');
    navBar.className = navBar.className.replaceAll('light', 'dark');

    // Create an array for the colors
    var buttonColors = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];

    // Get the buttons from the document
    let myButtons = document.querySelectorAll('.col-2 > button');
    // console.log(myButtons);

    // Loop through the buttons and apply a class to each button with the buttonColors
    for (let i=0; i < myButtons.length; i++){
        // console.log(myButtons[i], buttonColors[i]);
        myButtons[i].className = `btn btn-${buttonColors[i]}`;
    }

    // Add a header under the buttons in the container

    // First create the header
    let newHeader = document.createElement('h4');
    newHeader.id = 'myHeader';
    newHeader.className = 'text-center mt-3';
    newHeader.innerHTML = 'Created by Brian with the help of JavaScript';
    newHeader.style.color = 'black';

    // Get the row of buttons
    let allRows = document.getElementsByClassName('row')
    let buttonRow = allRows[0];
    // console.log(buttonRow);

    // Add the new header AFTER the row of buttons (vs appending to the end)
    buttonRow.after(newHeader);

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
            elementToChange.style.color = 'red';
        } else {
            elementToChange.style.color = 'black';
        }
    }


    // Add the handleHeaderEvent function as an event listener on the header
    myHeader.addEventListener('click', handleHeaderEvent)
}

// Create a new scope
// Add event listeners to our buttons -> change the background
{
    let myButtons = document.querySelectorAll('.col-2 > button');

    for (let i = 0; i < myButtons.length; i++){
        let button = myButtons[i];
        // Add an event listener 
        button.addEventListener('click', () => {
            let body = document.body;
            body.className = `bg-${buttonColors[i]}`
        })
    }
}


// Get the country from the form and display on the page
{
    // Grab the form
    let form = document.getElementById('countryForm');
    // console.log(form);

    // create a function to handle submit event
    async function handleSubmit(e){
        e.preventDefault(); // Prevent the event from refreshing the page
        let inputCountry = e.target.countryName.value; // Get the input value from the form
        let country = await getCountryInfo(inputCountry); // Call the get country info function with the data from the form
        buildCountryCard(country);
    }

    // Function that will get the data from the country API
    async function getCountryInfo(countryName){
        let res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        let data = await res.json()
        console.log(data)
        return data[0]
    }
 // Function that will get the data from the Weather API
    async function getWeatherInfo(lat, lon){
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    let data = await res.json()
    return data
}


    // Function that will take the country object from the API and build an HTML card for it
    async function buildCountryCard(countryObj){

        let lat = countryObj.latlng[0]
        let lon = countryObj.latlng[1]
        let weatherInfo = await getWeatherInfo(lat, lon)
        console.log(weatherInfo.main.feels_like)

        // Create a card div
        let card = document.createElement('div');
        card.className = 'card';

        
        // Create a top image
        let image = document.createElement('img');
        image.className = 'card-img-top';
        image.src = countryObj.flags.png;
        // Add image as a child to the card div
        card.append(image);

        // Create card body
        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        // Create country name and population elements
        let countryTitle = document.createElement('h5');
        countryTitle.className = 'card-title';
        countryTitle.innerHTML = countryObj.name.official;

        let population = document.createElement('p');
        population.className = 'card-text';
        population.innerHTML = `Population: ${countryObj.population.toLocaleString('en-US')}`;

        // Add title and population to the card body
        cardBody.append(countryTitle);
        cardBody.append(population);

        // Add the card body to the card
        card.append(cardBody);

        // Create a column for the row
        let col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-3';

        // Add the card as a child to the column
        col.append(card);

        // Get the country display row and add our new column
        document.getElementById('countryDisplay').append(col);
    }
    
    
    // Add handleSubmit function as listener to submit event on form
    form.addEventListener('submit', handleSubmit);
}
