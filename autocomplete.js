const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue, fetchData}) => {
root.innerHTML = `
 <label><b>Search</b></label>
 <input class="input" />
 <div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
    </div>
</div>
`;

const input = root.querySelector('input');
const dropdown = root.querySelector('.dropdown');
const resultsWrapper = root.querySelector('.results');

//--------------------------------------------------------

const onInput = async event => {
    //make the http request
        const items = await fetchData(event.target.value);
        //checks if there anything typed in the input tag
        if(!items.length){
            //closes the dropdown menu
            dropdown.classList.remove('is-active');
            return;
        }

        //sets the wrapper html to be an empty string
        resultsWrapper.innerHTML = "";
        //add is-active class from BULMA CSS Library 
        dropdown.classList.add('is-active');

        for(let item of items){
            const option = document.createElement('a');
            // const imgSrc = item.Poster === 'N/A' ? '' : item.Poster;
            
            option.classList.add('dropdown-item');
            //generate HTML for each item 
            option.innerHTML = renderOption(item);


            //listen for a click on the dropdown menu 
            option.addEventListener('click', () => {
                //closes dropdown menu 
                dropdown.classList.remove('is-active');
                //updates value of input to be the title of item clicked
                input.value = inputValue(item);

                onOptionSelect(item);
            })
            //appends all items creates inside the loop to the wrapper div
            resultsWrapper.appendChild(option);
        }
};

//listen for a input change and triggers the debounce function on onInput();
input.addEventListener('input', debounce(onInput, 500));


//listen for a click on the window to close the dropdown menu
document.addEventListener('click', event => {
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active');
    }
});
}