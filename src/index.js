import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const body = document.querySelector('body');
const select = document.querySelector('.select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
 
select.style.display = 'none';

document.addEventListener("DOMContentLoaded", markupCreate)
select.addEventListener('change', selectionHandler);

async function selectionHandler(){
    const selectelem = select.children.selectElement; 
    const selectedOption = selectelem.options[selectelem.selectedIndex].value;
        try {
            catInfo.style.display = 'none';           
            loader.style.display = 'block';           
            const breed = await fetchCatByBreed(selectedOption);    
            loader.style.display = 'none';    
            renderCatInfo(breed)             
     } catch (error) {       
            body.innerHTML = `Oops! Something went wrong! Try reloading the page!`;
            body.style.color = '#ff0000';
        iziToast.error({
            message: `Error fetching cat information! Try again!`,
            position: 'topRight',
            color: '#ff0000',
          });  
          console.log(`${error.message}`)
     }
     
}

async function markupCreate(){
    try {
        const breeds = await fetchBreeds();    
        loader.style.display = 'none';        
        renderBreeds(breeds);                
        select.style.display = 'flex';      
    } catch (error) {   
        body.innerHTML = `Oops! Something went wrong! Try reloading the page!`;
        body.style.color = '#ff0000';
        iziToast.error({
            message: `Error fetching cat information! Try again!`,
            position: 'topRight',
            color: '#ff0000',
          });
          console.log(`${error.message}`)
    }
}

function renderBreeds(breeds){
    const markup = breeds.map(({id,name})=>{
        return `<option value="${id}">${name}</option>`;
    }).join("");
select.innerHTML = `<select class="breed-select" id="selectElement">${markup}</select>`

}

function renderCatInfo(breed){
    catInfo.style.display = 'flex';
    const markup = `<img class="cat-img" src="${breed[0].url}" alt="${breed[0].breeds[0].name}"  />
    <div class="breed-info">
      <h1 class="cat-name">${breed[0].breeds[0].name}</h1>
      <p class="description">${breed[0].breeds[0].description}</p>
      <h2 class="temperament">Temperament:</h2>
      <p class="temp-descr">${breed[0].breeds[0].temperament}</p>
    </div>
    `
    return catInfo.innerHTML = markup
}