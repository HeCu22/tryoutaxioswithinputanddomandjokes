import axios from "axios";

// intialize page message and number of lines on each page
const messageText = document.getElementById("mess-disp");
messageText.textContent = "";
const numberOfLines = 10;

// fetch data
async function fetchJokes(userInput) {

    try {
        // receive the data in response
        const response = await axios.get("https://api.chucknorris.io/jokes/search", {
            params: {
                query: userInput
            }
        });

        // save result constant
        const {result: alljokes} = response.data;

        // create a list with maximum number of lines that uses array of all found
        let firstLine = 0;
        let lastLine = numberOfLines;
        let arrayDisplay = alljokes.slice(firstLine, lastLine);
        console.log('change4', alljokes);
        console.log('change4', firstLine, lastLine, alljokes.length);
        createJokeLines(arrayDisplay);

        // listen whether button is pressed to display next page
        // als de button op zich staat (buiten formulier) dan luister je naar click
        const button = document.getElementById("nextData");
        button.addEventListener("click", (e) => {

            // check display next page possible
            if (lastLine < alljokes.length) {

                // add-up the slice cake and crate next page
                firstLine += numberOfLines;
                lastLine += numberOfLines;
                arrayDisplay = alljokes.slice(firstLine, lastLine);

                console.log('change3', firstLine, lastLine, arrayDisplay.length);
                createJokes(arrayDisplay);

            } else {
                console.log('stop');
                let firstLine = 0;
                let lastLine = numberOfLines;
            }

        })


    } catch (e) {

        console.error(e);
        // fill message text
        messageText.textContent = `For this input no data found.`;
    }

}
// *-----------end of fetch data--------------*/*


// reference save of user input
const userInputfield = document.getElementById("input-field");

const form = document.getElementById("on-submit");
const button = document.getElementById("fetch-data");

// initialize input search field value in message text.
let inputSearching = "";

// button zit in formulier dus ik luister naar submit.
form.addEventListener("submit", (e) => {

    e.preventDefault();
    // keep input search field value in message text
    inputSearching = userInputfield.value;
    if (userInputfield.value > "") {
       fetchJokes(userInputfield.value);
    }

})

// Function to put the jokes found on the DOM screen
function createJokeLines(arrayofjokes) {

// initialize the list
    const jokeList = document.getElementById("joke-list");

// make sure every search leads to corresponding result on the document page
    jokeList.replaceChildren();
    console.log('length', arrayofjokes.length);
    document.getElementById("nextData").disabled = false;
    if (arrayofjokes.length < numberOfLines) {
        messageText.textContent = `Last data found. Press Start to go to first page.`;
        document.getElementById("nextData").disabled = true;
    } else {
        messageText.textContent = `Jokes that contain the word ${inputSearching}:`;
    }
    const listImg = document.createElement('img');
    listImg.setAttribute('src', `https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png`);
    listImg.setAttribute('alt', "avatar");

    jokeList.appendChild(listImg);
    // one or more joke lines are possible
    arrayofjokes.map((joke) => {
        const listItem = document.createElement('li');
        listItem.setAttribute('id', 'list-item');
        listItem.textContent = joke.value;

        jokeList.appendChild(listItem);

        userInputfield.value = '';
    })

// in the old way you had wrap all elements it in a parent container and then delete the children one by one
    // jokeList.innerHTML = jokes.map((joke) => {
    //     return `
    //       <li>${joke.value}</li>
    //     `;
    // }).join("");

}

function handleToetsAanslag (e) {
    console.log('toets',e);
}

const usernameInputField = document.getElementById('input-field');
usernameInputField.addEventListener('keydown', handleToetsAanslag);