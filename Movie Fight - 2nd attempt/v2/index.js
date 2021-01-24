
//step 1
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/' ,  {
        params: {
            apikey: '4124222a',
            s: searchTerm
            // i: 'tt0848228'
        }
    });

    console.log(response.data);
};


//step 2 
const input = document.querySelector('input');



let timeoutId;
const onInput = event => {
    if(timeoutId){
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout( () => {
        fetchData(event.target.value);
    }, 1000)
};



input.addEventListener('input', onInput);;














