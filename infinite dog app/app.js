let timer
let deleteFirstPhotoDelay

// This function is responsible for fetching the data
async function start(){
    try {
        const response =  await fetch("https://dog.ceo/api/breeds/list/all") //fetch returns a promise, not data
        const data = await response.json();
        createBreedList(data.message);
    } catch(e) {
        console.log("There was a problem fetching the breed list")
    }
} 

start()

// This function is responsible for the select element
function createBreedList(breedList){
    const breed = document.getElementById( 'breed');
    breed.innerHTML = `
    <select onchange="loadByBreed(this.value)">
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map(function (breed){
            return `<option>${breed}</option>`
        }).join("")}
    </select>
    `
}

// This function is responsible for loading the images
async function loadByBreed(breed){
    if(breed != "Choose a dog breed"){
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const data = await response.json();
        createSlideshow(data.message);
    }
}

function createSlideshow(images){
    let currentPosition = 0;
    clearInterval(timer);
    clearTimeout(deleteFirstPhotoDelay);

    if(images.length > 1){
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide" style="background-image: url('${images[1]}')"></div>
        `
        currentPosition += 2;
        if(images == 2) currentPosition
        timer = setInterval(nextSlide, 2000);
    }else{
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide"></div>
        `
    }

    function nextSlide(){
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosiion]}')"></div>`)
        deleteFirstPhotoDelay = setTimeout(function(){
            document.querySelector(".slide").remove();
        }, 1000)
        if(currentPosition + 1 >= images.length){
            currentPosition = 0;
        } else {
            currentPosition++;
        }
    }
}
