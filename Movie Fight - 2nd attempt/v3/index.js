
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

const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        console.log(args);
      if(timeoutId){
          clearTimeout(timeoutId);
      }
      timeoutId = setTimeout( () => {
          func.apply(null, args);
      },delay);  
    }
};


const onInput = event => {
    fetchData(event.target.value);
};

input.addEventListener('input', debounce(onInput, 500));












