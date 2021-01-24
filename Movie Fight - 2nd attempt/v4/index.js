//make http request to API
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/' ,  {
        params: {
            apikey: '4124222a',
            s: searchTerm
            // i: 'tt0848228'
        }
    });


    return response.data.Search;
};

//get input from html
const input = document.querySelector('input');

//define onInput function 
//make it an async 
const onInput = async event => {
    //set fetchData as await
    const movies = await fetchData(event.target.value);
    
    for(let movie of movies){
        const div = document.createElement('div');
        div.innerHTML = `
        <img src="${movie.Poster}" />
        <h1>${movie.Title}</h1>
        <p>(${movie.Year})</p>
        `
        document.querySelector('#target').appendChild(div);
    
    }
};


//add listener to input 
input.addEventListener('input', debounce(onInput, 500));












