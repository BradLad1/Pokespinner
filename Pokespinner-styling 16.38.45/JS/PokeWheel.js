async function fetchPokemonData(nameOrId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            
            const div = document.createElement("div");
            div.classList.add("number-intial")
            div.innerText = data.name; // Example: Display Pokémon name
         
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
    const NameSeparated = EnterPokeNameval.split('\n').map(name => name.trim()).filter(name => name !== ''); //Used to read each line of the text area

    console.log(NameSeparated);

    NameSeparated.forEach((nameOrIdd, index) => {
        setTimeout(() => {
            fetchPokemonData(nameOrIdd);//We call the async function in here 
        }, 100); // Delay each call by 1 second (1000 milliseconds)
    });
}

