// /API KEY: 4124222a


//Function that puts together 3 arguments for the CreateAutoComplete function, se it can be called as many times we want
//OBS1: the root argument has been moved to the call of createAutoComplete so it can be referenced to different object 
//OBS2: the onOptionSelect argument has been moved to the call of createAutoComplete so it can be referenced to different object 
const autoCompleteConfig = {
    //how to show an individual item 
    renderOption,
    //what to do when user clicks on one option
    inputValue,
    //How and Where to fetch the data from
    async fetchData(searchTerm) {
            const response = await axios.get('https://www.omdbapi.com/', {
                params: {
                    apikey: '4124222a',
                    // s: 'avengers',
                    s: searchTerm
                }
            });
            if(response.data.Error){
                return [];
            }
            console.log(response.data);
            return response.data.Search;
        }
}



// Reusable Function that creates the html automatically 
createAutoComplete({
    ...autoCompleteConfig,
    //define root element to be the div where you want the generated html to be append to
    root: document.querySelector('#left-autocomplete'),
    //Third argument to the autocomplete function that decided what to do when the user clicks on a movie on the dropdown menu
    //it is a reusable function since it extracts the function create inside the autocomplete.js and can be used if the website is about movies,recipes,blog, whatever... just have to change the onMovieSelect(movie) function to return whatever value you want.    
    onOptionSelect(movie){
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
}
});

// Reusable Function that creates the html automatically 
createAutoComplete({
    ...autoCompleteConfig,
    //define root element to be the div where you want the generated html to be append to
    root: document.querySelector('#right-autocomplete'),
    //Third argument to the autocomplete function that decided what to do when the user clicks on a movie on the dropdown menu
    //it is a reusable function since it extracts the function create inside the autocomplete.js and can be used if the website is about movies,recipes,blog, whatever... just have to change the onMovieSelect(movie) function to return whatever value you want.    
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
    }
});




//Second argument to the autocomplete function where it generates the html to be shown in the dropdown menu
function renderOption(movie) {
    return `
    <img src="${movie.Poster}" />
    ${movie.Title} (${movie.Year})
    `;
}



//Fourth argument to the aucomplete function that return the value that should be returned inside the input after user has clicked on the selection on the dropdown menu.
function inputValue(movie){
    return movie.Title;
};




//===============================================================================================
//First way of writting the Debounce code below
//===============================================================================================

//Setting up the text input to fetch only when it goes (delay) seconds without typing.
//assign a variable
// let timeoutId;
// //declare a function with an event argument to check if setTimeout is defined ===meaning id=1>..
// const onInput = event => {
//     //if ID is defined, it clears the id
//     if(timeoutId){
//         clearTimeout(timeoutId);
//     }
//     //sets up a new timeoutId to be passed on as a argument to the onInput function.
//     timeoutId = setTimeout( () => {
//         fetchData(event.target.value)
//     }, 500);
// };
//===============================================================================================




