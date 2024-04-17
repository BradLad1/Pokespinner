//===============VARIABLES =================
getpokemonbtn=document.getElementById("pokeget-btn")
showpokemon = false//Decide on if to show the pokemon
dexbody=document.getElementById("dex-body")//Show the info dex box with the pokemon info
poke_ball_top=document.getElementById("poketop-red")//Top part of the pokeball
poke_ball_bottom=document.getElementById("pokebottom-white")//bottom part of the pokeball

//pokeball variables
poke_search_btn=document.getElementById("poke-btn")
pokeball_red =document.querySelector(".top-part")
pokeball_white=document.querySelector(".bottom-part")
//pokeball variables

//===============VARIABLES =================

async function Show_that_pokemon(){
    var pokebutton = document.getElementById("poke-btn").value//Takes in a pokemon name or id
    var chosenpokemon = pokebutton.toLowerCase()
    try{

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${chosenpokemon}`);

        if(!response.ok){
            throw new Error("Could not fetch resource");
    } 

        showpokemon = true
        if (showpokemon==true){   
            
            pokeball_red.classList.add("animate-topart")
            pokeball_white.classList.add("animate-bottompart")
            poke_search_btn.style.display = "none";
            console.log("done")
            setTimeout(()=>{
                dexbody.classList.add("dex-body") & dexbody.classList.add("anim-square") 

                

        },1000)
    }

        const data =  await response.json()

        const pokemonSprite = data;
 
        
      
        console.log(pokemonSprite)
    }   
    catch(error){
        console.error(error)
    }

}

