
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

input.addEventListener('input', event => {
    fetchData(event.target.value);
})






//debounce
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout( () => {
            func().apply(null, args);
        }, delay);
    }
};














