import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { capitalizeWords, fetchPokemonEvolutionInfo } from '../api/pokedex';
import downArrow from '../assets/down-arrow2.png'
import { useNavigation } from '@react-navigation/native';
import Loading from './Loading';

export default function EvolutionsCard({spData}) {
    const [loading, setLoading] = useState(true);
    const [evoChain, setEvoChain] = useState([]);
    const navigation = useNavigation();
    const evoChainUrl = spData.evolution_chain.url;
    let pokeImgUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
    let evoMArray = [];
    let evolveCondtionList = [];
    const redirUrl ="https://pokeapi.co/api/v2/pokemon/"

    useEffect(()=>{
        fetchEvolutionDataHome();
    },[])

    const fetchEvolutionDataHome = async () => {
        fetchPokemonEvolutionInfo(evoChainUrl).then(data=>{
            getEvolutionDetails(data.chain);
            setEvoChain(evoMArray);
            setLoading(false);
        })
    }

    const getEvolutionDetails = async (evoData) => {
        if(evoData.hasOwnProperty("evolves_to")){
            if(evoData.evolves_to[0]==undefined){
                evoMArray.push({name: evoData.species.name, index: ((evoData.species.url).slice(42).replace('/','')), condition: {}, evolves: false});
            }else{
                evoMArray.push({name: evoData.species.name, index: ((evoData.species.url).slice(42).replace('/','')), condition: evoData.evolves_to[0].evolution_details[0], evolves: true});
            }
            getEvolutionDetails(evoData.evolves_to[0]);
        }
    }

  return (
    <View className="p-4">
      <Text className="font-extrabold text-center text-2xl pt-[4vh] pb-[2vh] text-white">Evolution Chain</Text>
      {
        loading?(
            <Loading />
        ):(
            <View>
                {
                    evoChain.map((stage) => {
                        evolveCondtionList=[];
                        if(stage.evolves){
                            for(let [key, value] of Object.entries(stage.condition)){
                                if(value!=null && value!=false && key!="trigger"){
                                    if(typeof(value)=='object'){
                                        evolveCondtionList.push((key+": "+value.name));
                                    }
                                    else if(value==true && value!=1){
                                        evolveCondtionList.push(key);
                                    }
                                    else{
                                        evolveCondtionList.push((key+": "+value));
                                    }
                                }
                            }
                        }
                        return(
                            <View className="items-center">
                                <TouchableOpacity onPress={()=>navigation.push("Info", {url: redirUrl+stage.index})}>
                                    <Image className="h-[20vh] w-[20vh] object-cover"
                                    source={{uri: pokeImgUrl+stage.index+".png"}} />
                                    <Text className="font-extrabold text-center text-xl text-white">{capitalizeWords(stage.name)}</Text>
                                </TouchableOpacity>
                                {
                                    !stage.evolves?(
                                        <View className="w-[100vw] border-black border-4 bg-black"/>
                                    ):(
                                        <View className="flex-1 h-[13vh]">
                                            <ImageBackground source={downArrow} className="flex-1 justify-center items-center bg-opacity-20">
                                                <Text className="font-extrabold text-center text-xl text-white">{capitalizeWords(stage.condition.trigger.name)}</Text>
                                               <View>
                                                {
                                                    evolveCondtionList.map((evolveCondtion)=>{
                                                        return(
                                                            <Text className="text-white font-bold">
                                                                {capitalizeWords(evolveCondtion)}
                                                            </Text>
                                                        )
                                                    })
                                                }
                                               </View>
                                            </ImageBackground>
                                        </View>
                                    )
                                }
                            </View>
                        )
                    })
                }
            </View>
        )
      }
    </View>
  )
}