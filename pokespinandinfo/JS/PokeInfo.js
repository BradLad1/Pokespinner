//===============VARIABLES =================
getpokemonbtn=document.getElementById("pokeget-btn")
showpokemon = false//Decide on if to show the pokemon
dexbody=document.getElementById("dex-body")//Show the info dex box with the pokemon info
poke_ball_top=document.getElementById("poketop-red")//Top part of the pokeball
poke_ball_bottom=document.getElementById("pokebottom-white")//bottom part of the pokeball

//pokeball variables
poke_search_btn=document.getElementById("poke-btn")//the button for searching
pokeball_red =document.querySelector(".top-part")//top part of pokeball
pokeball_white=document.querySelector(".bottom-part")//bottom part of pokeball
hideaway=document.querySelector("hide-away")//hides the og data
pokeicon =document.getElementById("pokemon-icon")//shows the pokemon icon
nopokemon =document.getElementById("no-pokemon")//will show if there is no pokemon
pokemonName=document.getElementById("pokemon-name")
var red_Or_blue=0
origin_game=document.getElementById("origin-game")


//get the abilites
abilitylist=document.getElementById("Abilites-list")
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

    if(pokebutton=""){
        nopokemon.innerText="ENTER A NAME"
    }
        showpokemon = true
        showinfo=false
        if (showpokemon==true){   
            
            pokeball_red.classList.add("animate-topart")
            pokeball_white.classList.add("animate-bottompart")
            poke_search_btn.style.display = "none";
            console.log("done")
                dexbody.classList.add("dex-body") 
                dexbody.classList.add("anim-square")
                dexbody.classList.remove("hide-away")
                
        //function addiconsection(){
       //     dexbody.classList.add("iconsection")
       // }
        //setTimeout(addiconsection, 2000)
        }
        const data =  await response.json()
        console.log(data)
        //get the image
        Img = document.createElement("img")
        pokeicon.appendChild(Img)
        const pokemonSprite = data.sprites.front_default;
        Img.style.scale="2"
        Img.style.scale="2"
        Img.classList.add("icon")
        Img.src=pokemonSprite
        
        //pokemoname
        ///This is done to give the pokemon name
        chosenpokemon_name=data.name
        if(chosenpokemon_name=="keldeo-ordinary"){
           chosenpokemon_name = data.name="Keldo"
        }
        pokemonName.innerText=chosenpokemon_name

        //pokename
data.abilities.forEach( abilityname =>{
    const li = document.createElement("li");
    li.textContent = abilityname.ability.name
    abilitylist.appendChild(li);
    console.log(abilityname)
})
if(data.id >red_Or_blue && red_Or_blue <=151 ){

    origin_game.textContent ="Generation I"
    console.log("worked")
 }
 } catch(error){
        console.error(error)
    }

}
 