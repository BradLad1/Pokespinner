const Colours = ["Green", "Black", "Pink", "Yellow", "Red", "Blue", "Orange", "Purple"];
const wheelCover = document.getElementById("wheelCover");
const wheel = document.getElementById('wheel');
const numberOfWheelClips = [];
const addingTheRotationValues =[]
const currentHeight = 100;

const Enterbtn = document.getElementById("EnterButton")

// Spinning function variable
const wheelspinner = document.querySelector('.wheel');
let spinBtn = document.querySelector('.spinBtn');

let value = Math.ceil(Math.random() * 3600);




// Function to spin the wheel
function spinWheel() {
    wheelspinner.style.transition = "transform 5s ease-in-out";
    value += Math.ceil(Math.random() * 4600);
    wheel.style.transform = "rotate(" + value + "deg)";
    console.log("click");
}

// Add event listener to spin button

spinBtn.addEventListener("click", spinWheel);
Enterbtn.addEventListener("click", handleNameChange);

async function fetchPokemonData(nameOrId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
        numberOfWheelClips.push(response);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            wheelCover.remove();
            console.log(numberOfWheelClips);
            let colourSelect = Math.floor(Math.random() * Colours.length);
       
            const div = document.createElement("div");
            const span = document.createElement("span");
            const img = document.createElement("img");
          
            
            span.setAttribute("class", "PokeTextName");
            div.appendChild(span);
            div.classList.add("number");


            
            span.innerText = data.name;
            img.src = data.sprites.front_default;

            const divlength = numberOfWheelClips.length;

            const number = document.querySelector('.number');

            div.style.background = Colours[colourSelect];


            const divWidth = div.getBoundingClientRect().width;
            console.log('Width of the new div:', divWidth);

            div.style.setProperty('--i', divlength ); // Set --i for each div
           
            span.append(img);
            wheel.append(div);
          
         
            
        } else {
            console.error(`Failed to fetch Pokémon data for ${nameOrId}`);
        }
    } catch (error) {
        console.error(`Error fetching Pokémon data for ${nameOrId}:`, error);
    }
}

function handleNameChange() {
    const EnterPokeName = document.getElementById("EnterName");
    const EnterPokeNameval = EnterPokeName.value;
    
    const NameSeparated = EnterPokeNameval.split('\n').map(name => name.trim()).filter(name => name !== '');

    divSection = document.querySelectorAll('.number');
    const scaleUp = 50 ; // Adjust the scaling factor as needed
    const divlength = numberOfWheelClips.length;

    console.log(NameSeparated);
    wheel.innerHTML=""

    divSection.forEach(div => {
        div.style.width = scaleUp*divlength +"%";
        div.style.marginTop="60%"
      });
      console.log("Scaled up", );
    NameSeparated.forEach((nameOrIdd, index) => {
        setTimeout(() => {
         
            fetchPokemonData(nameOrIdd);

        }, 100 * index);
    });
}





