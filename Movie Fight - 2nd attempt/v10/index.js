
//================================================================
//MAKING FOLLOW UP REQUEST WHEN USER CLICKS ON A MOVIE
//================================================================

//make http request to API
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/' ,  {
        params: {
            apikey: '4124222a',
            s: searchTerm
            // i: 'tt0848228'
        }
    });
     if(response.data.Error){
        return [];
    }

    return response.data.Search;
};



//get div .autocomplete from HTML and generate HTML from JavaScript
const root = document.querySelector('.autocomplete');
root.innerHTML = `
<label><b>Search For a Movie</b></label>
<input class="input" /> 
<div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
    </div>
</div>
`;

//Get elements from HTML 
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');
const input = document.querySelector('input');



//define onInput function 
//make it an async 
const onInput = async event => {
    //set fetchData as await
    const movies = await fetchData(event.target.value);


    //checks if fetchData returns anything from the search, otherwise just hide the dropdown menu
    if(!movies.length){
        dropdown.classList.remove('is-active');
        return;
    }

    //sets the innerHtml of the .results element to be an empty string
    resultsWrapper.innerHTML = '';
    //add class is active to dropdown element
    dropdown.classList.add('is-active');

    for(let movie of movies){
        //change div to create <a> instead
        const option = document.createElement('a');
        //if statement to check if the movie has a Poster img from the API
        const imgSRC = movie.Poster === 'N/A' ? '' : movie.Poster;
        //add the dropdown-item class to the <a>
        option.classList.add('dropdown-item');

        option.innerHTML = `
        <img src="${imgSRC}" />
        ${movie.Title}
        (${movie.Year})
        `

        
        //listen for a click on the movie option then close the dropdown menu and update input text value.
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            onMovieSelect(movie);
        })

        


        resultsWrapper.appendChild(option);
    
    }
     
};


//add listener to input 
input.addEventListener('input', debounce(onInput, 500));



//listen for an click on the entire document, and if it doesn`t contain any elements of the root variable, close the dropdown menu
document.addEventListener('click', event => {
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active');
    }
});

//create a onMovieSelect funtcion to handle user click on menu 
//=====================================================

const onMovieSelect = async movie => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '4124222a',
            i: movie.imdbID
        }
    });
    console.log(response.data);
};

//=====================================================















