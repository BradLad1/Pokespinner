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
pokeicon=document.getElementById("pokemon-icon")//shows the pokemon icon
nopokemon=document.getElementById("no-pokemon")//will show if there is no pokemon
pokemonName=document.getElementById("pokemon-name")
poketype =document.getElementById("poke-type")
origin_game=document.getElementById("origin-game")
//get the abilites
abilitylist=document.getElementById("Abilites-list")
//pokeball variables


//stat variables
hp=document.getElementById("hp")
atk=document.getElementById("attack")
def =document.getElementById("def")
special_atk=document.getElementById("special-atk")
special_def=document.getElementById("special-def")
speed=document.getElementById("speed")
baseaddtotal =document.getElementById("basetotal")
statpercentage=document.querySelector("stat-percent")


///Number of the stat
num_hp=document.getElementById("num-hp")
num_atk=document.getElementById("num-atk")
num_def=document.getElementById("num-def")
num_specialatk=document.getElementById("num-specialatk")
num_specialdef=document.getElementById("num-specialdef")
num_speed=document.getElementById("num-speed")

///Number of the stat

stat_list= []
base_total=0
percentinum=0
//stat variables

Helditems=document.getElementById("Helditem")
functionpressed =0
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

    if(pokebutton==""){
        nopokemon.innerText="ENTER A NAME"
        showpokemon = false
        //This code is meant to not let the application work unless a name is entered
    }
        
    if (showpokemon==true){   
        nopokemon.innerText=""
        pokeball_red.classList.add("animate-topart")
        pokeball_white.classList.add("animate-bottompart")
        poke_search_btn.style.display = "none";
        console.log("done")
        dexbody.classList.add("dex-body") 
        dexbody.classList.add("anim-square")
        dexbody.classList.remove("hide-away")
        getpokemonbtn.remove()

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
           //Chnaging keldo name to just keldo
        }
        pokemonName.innerText=chosenpokemon_name
        //pokename


//Get abilites
/*How this code section will work is that it will get the abilites of the pokemon then add them to an li that will be created and appeneded to a list*/
data.abilities.forEach( abilityname =>{
    const li = document.createElement("li");
    li.textContent = abilityname.ability.name
    abilitylist.appendChild(li);
    console.log(abilityname)
})
//Get abilites

//Get Type
//Type section 
/*How this code section will work is that it will the type that the pokemon is and add it in a p element*/
data.types.forEach(PokemonType =>{
    const p = document.createElement("p");
    p.textContent=PokemonType.type.name
    poketype.append(p)
    console.log(PokemonType)
})
//Get Type

//progress section 
/*How this code section will work is that it will get the total base total of a pokemon's stats then after that
will give the percentage that each stat makes on the base stat and it will show it on a progress bar*/
console.log(data.stats)
data.stats.forEach(stats =>{
    added_stat= stats.base_stat //getting the base stat
    stat_list.push(added_stat)

    base_total = base_total+added_stat
    baseaddtotal.innerText=base_total
    
}
)

for (let i = 0; i < stat_list.length; i++) {
    console.log(stat_list[i] + "stat"); // Log the value in stat_list at index i along with "stat"


    switch (i) {
        case 0:
             num_hp.textContent=stat_list[i] ;
            break;
        case 1:
            num_hp.textContent=stat_list[i];
            break;
        case 2:
            num_def.textContent=stat_list[i]; // This should set the statElement to the "def" element
            break;
        case 3:
            num_specialatk.textContent=stat_list[i];
            break;
        case 4:
            num_specialdef.textContent=stat_list[i];
            break;
        case 5:
            num_speed.textContent=stat_list[i];
            break;
        default:
            break;
    }
 

}


console.log(stat_list)
console.log(base_total)
for (let i = 0; i < stat_list.length; i++) {
    percent_of_stat = stat_list[i] / base_total * 100;
    roundnum = percent_of_stat.toFixed(2);
    console.log(roundnum);

    // Get the corresponding stat element based on the loop index
    let statElement;

    switch (i) {
        case 0:
            statElement = hp;
            break;
        case 1:
            statElement = atk;
            break;
        case 2:
            statElement = def; // This should set the statElement to the "def" element
            break;
        case 3:
            statElement = special_atk;
            break;
        case 4:
            statElement = special_def;
            break;
        case 5:
            statElement = speed;
            break;
        default:
            break;
    }
 

    // Add the progresss class and set the width
if (statElement) {
    statElement.classList.add("progresss");
    statElement.style.width = roundnum + "%";
} 
}
//HELD ITEMS
data.held_items.forEach(Helditem=>{
    li=document.createElement("li")
    li.innerText=Helditem.item.name
    Helditems.appendChild(li)
})

//HELD ITEMS

//MOVES
moveslist = document.getElementById("moves-list")
data.moves.forEach(Move=>{
    li = document.createElement("li")
    moveslist.appendChild(li)
    li.innerText=Move.move.name
    console.log(Move.move)
})


//MOVES


//progress section 
//Generation of pokemon
//This will give the genartion of a pokemon depending on the id
if(data.id >0 && data.id <=151 ){
    origin_game.textContent ="Generation I"
    console.log("worked")
 } else if(data.id >=152 && data.id <=251){
    origin_game.textContent ="Generation II"
    console.log("worked")
} else if(data.id >=252 && data.id <=386){
    origin_game.textContent ="Generation III"
    console.log("worked")
}else if(data.id >=387 && data.id <=493){
    origin_game.textContent ="Generation IV"
    console.log("worked")
}else if(data.id >=494 && data.id <=649){
    origin_game.textContent ="Generation V"
    console.log("worked")
}else if(data.id >=650 && data.id <=721){
    origin_game.textContent ="Generation VI"
    console.log("worked")
}else if(data.id >=722 && data.id <=807){
    //MELTAN CODE
    if(data.id ==808 ){
        origin_game.textContent =" Pokémon: Let's Go Pikachu/Eevee"
        console.log("worked")
    }if(data.id ==809 ){
        origin_game.textContent =" Pokémon: Let's Go Pikachu/Eevee"
        console.log("worked")
    //MELTAN CODE
}else if(data.id >=810 && data.id <=905){
    origin_game.textContent ="Generation VII"
    console.log("worked")
}else if(data.id >=906 && data.id <=1025){
    origin_game.textContent ="Generation VIII"
    console.log("worked")
}//This code will give the genaration of the pokemon depending on their id

}
 } catch(error){
        console.error(error)
    }
} 
getpokemonbtn.addEventListener("click", Show_that_pokemon);
