const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value; 
    pokeName = pokeName.toLowerCase(); 
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./public/img/pikachuSleeping.png");
            pokeNameF("Pokémon no encontrado");
        } 
        else {
            return res.json();
        }

    }).then((data) => {
        console.log(data);
        let pokeImg = data.sprites.front_default;
        pokeImage(pokeImg);
        console.log(pokeImg);  
        pokeNameF(pokeName); 
        pokeType(data["types"][0].type["name"]);
        pokeStat(data);
            // movimientos
        // pokeMove(data);
        for (let moveElement = 0; moveElement < data["moves"].length; moveElement++) {
            if (moveElement < 6) {
                pokeMove(data["moves"][moveElement].move["name"],"pokeMoveName"+moveElement);
            }
            
        }
        // console.log(data["moves"][0].move["name"]);
        // pokeMove(data["moves"][0].move["name"])
        hideMidContainer();
        modifyBottomContainer();
    });
}
const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const pokeNameF = (url) => {
    const pokeNameOutput = document.getElementById("pokeNames");
    pokeNameOutput.innerHTML = url;
}

const pokeType = (url) => {
    const pokeTypeOutput = document.getElementById("pokeTypes");
    pokeTypeOutput.innerHTML = url;
}

const pokeStatName = (url,statElement) => {
    return(url["stats"][statElement].stat["name"]);
}
const pokeStatBase = (url,statElement) => {
    return "Base: "+url["stats"][statElement].base_stat;
}
const pokeStatEffort = (url,statElement) => {
    return "Effort: "+url["stats"][statElement].effort;
}

const pokeStatO = (url,idName) => {
    const pokeStatOutput = document.getElementById(idName);
    pokeStatOutput.innerHTML = url;
}
const pokeStat = (url) => {
    for (let statElement = 0; statElement < url["stats"].length; statElement++) {
        // Stat name
        pokeStatO(pokeStatName(url,statElement),"pokeStatName"+statElement);
        // Base stat
        pokeStatO(pokeStatBase(url,statElement),"pokeStatBase"+statElement);
        // // effort stat
        pokeStatO(pokeStatEffort(url,statElement),"pokeStatEffort"+statElement);
    }
}
const pokeMove = (url,idName) => {
    const pokeMoveOutput = document.getElementById(idName);
    pokeMoveOutput.innerHTML = url;
}

const hideMidContainer = () => {
    const hideElement = document.getElementById("midContainer");
    hideElement.style.display = "flex";
}
const modifyBottomContainer = () => {
    const modifyBotContainer = document.getElementById("botContainer");
    modifyBotContainer.style.height = "15%";
}