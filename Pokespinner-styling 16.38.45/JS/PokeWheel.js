const Colours = ["Green", "Black", "Pink", "Yellow", "Red", "Blue", "Orange", "Purple"];
const wheelCover = document.getElementById("wheelCover");
const wheel = document.getElementById('wheel');
const numberOfWheelClips = [];
const currentHeight = 100;

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
            div.style.background = Colours[colourSelect];
            span.append(img);
            wheel.append(div);

           // let rotation = (360 / divlength) * (divlength - 1);
            div.style.transform = `rotate(${90}deg) translateX(-50%)`;

            if (divlength === 1) {
                div.style.height = "100%";
                div.style.width = "100%";
                div.style.clipPath = "circle(50% at 50% 50%)";
                div.style.position = "absolute";
                div.style.left = "300px";
                div.style.top = "0px";
            } else if (divlength === 2) {

                div.style.clipPath = `clip-path: circle(50% at 50% 96%);`;
                div.style.transform = `rotate(${90}deg) translateX(-50%) translateY(-50%)`;
            } else{
                div.style.clipPath = `polygon(0 0, 56% 0, 100% 100%, 0 56%)`;
                div.style.transform = `rotate(${rotation}deg) translateX(-50%) translateY(-50%)`;
            }

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
    console.log(NameSeparated);
    
    NameSeparated.forEach((nameOrIdd, index) => {
        setTimeout(() => {
            fetchPokemonData(nameOrIdd);
        }, 100 * index);
    });
}
