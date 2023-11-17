import axios from "axios";

//https://pokeapi.co/api/v2/
//gen1{offset:0, limit:151}
//gen2{offset:151, limit:100}
//gen3{offset:251, limit:135}
//gen4{offset:386, limit:107}
//gen5{offset:493, limit:156}
//gen6{offset:649, limit:72}
//gen7{offset:721, limit:88}
//gen8{offset:809, limit:89}
//genhisue{offset:898, limit:7}
//gen9{offset:905, limit:103}
//alternateforms{offset:1008, limit:284}

const genLimits = {
    "kanto":{offset:0, limit:151},
    "johto":{offset:151, limit:100},
    "hoenn":{offset:251, limit:135},
    "sinnoh":{offset:386, limit:107},
    "unova":{offset:493, limit:156},
    "kalos":{offset:649, limit:72},
    "alola":{offset:721, limit:88},
    "galar":{offset:809, limit:89},
    "hisui":{offset:898, limit:7},
    "paldea":{offset:905, limit:103},
    "alternate-forms":{offset:1008, limit:284},
}

const allPokedexOptions = (params) =>`https://pokeapi.co/api/v2/pokemon?offset=${params.offset}&limit=${params.limit}`;

const pokemonSpeciesInfo = params => `https://pokeapi.co/api/v2/pokemon-species/${params}`

const apiCall = async (endpoint)=>{
    const options = {
        method: 'GET',
        url: endpoint,
    };

      try{
        const response = await axios.request(options);
        return response.data;
      }catch(error){
        console.log('error: ',error);
        return {};
    }
}

export const fetchAllPokedexData = (generation)=>{
    let pokedexAllUrl = allPokedexOptions(genLimits[generation]);
    return apiCall(pokedexAllUrl);
}

export const fetchPokemonSpeciesInfo = params => {
    let speciesUrl = pokemonSpeciesInfo(params);
    return apiCall(speciesUrl)
}

export const fetchPokemonEvolutionInfo = params => {
    return apiCall(params);
}

export const fetchPokedexData = params=>{
    let pokemonUrl = params;
    return apiCall(pokemonUrl);
}

export const capitalizeWords = params => {
    let listWords = params.split('-')
    let word = "";
    for(i in listWords){
        if(i==0){
            word = ((listWords[0]).charAt(0).toUpperCase()+(listWords[0]).slice(1));
        }else{
            word=word+ " " + ((listWords[i]).charAt(0).toUpperCase()+(listWords[i]).slice(1))
        }
    }
    listWords = word.split(' ')
    word = "";
    for(i in listWords){
        if(i==0){
            word = ((listWords[0]).charAt(0).toUpperCase()+(listWords[0]).slice(1));
        }else{
            word=word+ " " + ((listWords[i]).charAt(0).toUpperCase()+(listWords[i]).slice(1))
        }
    }
    listWords = word.split('_')
    word = "";
    for(i in listWords){
        if(i==0){
            word = ((listWords[0]).charAt(0).toUpperCase()+(listWords[0]).slice(1));
        }else{
            word=word+ " " + ((listWords[i]).charAt(0).toUpperCase()+(listWords[i]).slice(1))
        }
    }
    return(word)
}

export const removeLineBreaks = params =>{
    let listWords = params.split('\n');
    let word = "";
    for(i in listWords){
        word+=" "+listWords[i];
    }
    return(word);
}

export const findPokemonIndex = params =>{
    return((params).slice(34).replace('/',''));
}
