
//===============================================================================================
// DEBOUCING FUNCTION 
//===============================================================================================

const debounce = (func, delay = 1000) => {
    let timeoutId;
    // return (arg1, arg2, arg3) => { // same thing as line below
    return (...args) => {
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout( () => {
            // func.apply(arg1, arg2, arg3); // same thing as line below
            func.apply(null, args);
        }, delay);
    }
};


//===============================================================================================
// ON MOVIE SELECT FUNCTION TO MAKE FOLLOWUP REQUESTS 
//===============================================================================================

let leftMovie;
let rightMovie;

const onMovieSelect= async (movie, summaryElement, side) => {
    //makes a http request to the same api but with i: instead of s: (see API documentation)
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: '4124222a',
            i: movie.imdbID
        }
    });

    //grabs div #summary and sets it`s innerHTML to be the movieTemplate Function with the response.data argument from the onMovieSelect function 
    summaryElement.innerHTML = movieTemplate(response.data);

    if(side === 'left'){
        leftMovie = response.data;
    } else {
        rightMovie = response.data;
    }

    if(leftMovie && rightMovie){
        runComparison();
    }
};

//===============================================================================================
//HELPER FUNCTION RUNCOMPARISON 

const runComparison = () => {
    const leftSideStats = document.querySelectorAll('#left-summary .notification');
    const rightSideStats = document.querySelectorAll('#right-summary .notification');

    leftSideStats.forEach( (leftStat, index)=> {
        const rightStat = rightSideStats[index];

        const leftSideValue = parseInt(leftStat.dataset.value);
        const rightSideValue = parseInt(rightStat.dataset.value);

        if(rightSideValue > leftSideValue){
            leftStat.classList.remove('is-primary');
            leftStat.classList.add('is-warning');
        } else {
            rightStat.classList.remove('is-primary');
            rightStat.classList.add('is-warning');
        }
    })
};



//===============================================================================================

//===============================================================================================

//helper function to get details from the second http request (onMovieSelect function) and creates HTML with it`s details.
const movieTemplate = (movieDetail) => {
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
    const meta = parseInt(movieDetail.Metascore);
    const rating = parseFloat(movieDetail.imdbRating);
    const votes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
    let count = 0;

    //====================================================
    //using forEach
    // const awards = movieDetail.Awards.split(' ').forEach((word) => {
    //     const value = parseInt(word);

    //     if(isNaN(value)){
    //         return;
    //     }else {
    //         count += value;
    //     }

    // });
    //===========================================================
    //using reduce
    const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
        const value = parseInt(word);

        if(isNaN(value)){
            return prev;
        } else {
            return prev + value;
        }

    }, 0);

    console.log(awards);
    //=================================================================
 

    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}<p>
                </div>
            </div>
        </article>
        <article data-value=${awards} class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article data-value=${dollars} class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article data-value=${meta} class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article data-value=${rating} class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article data-value=${votes} class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>

    `;
};
