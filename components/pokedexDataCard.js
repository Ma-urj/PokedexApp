import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Progress from 'react-native-progress';
import { fetchPokedexData, capitalizeWords, findPokemonIndex } from '../api/pokedex';
import { typeColor } from '../constants';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';

export default function PokedexDataCard({pokeParamUrl}) {
    const [loading, setLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState({});
    const navigation = useNavigation();
    const pokeUrl = pokeParamUrl;
    const pokeIndex = findPokemonIndex(pokeUrl)
    let pokeImgUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+pokeIndex+".png";
    const redirUrl ="https://pokeapi.co/api/v2/pokemon/"

    useEffect(()=>{
        fetchPokedexDataHome();
    },[])

    const fetchPokedexDataHome = async () => {
        fetchPokedexData(pokeUrl).then(data=>{
            setPokemonData(data);
            setLoading(false);
        })
    }
  return (
    <View>
        {
            loading?(
                <Loading />
        ):(
            <View>
                <View className="flex flex-row justify-between items-center">
                    <TouchableOpacity onPress={()=>navigation.push("Info", {url: redirUrl+Math.max(Number(pokeIndex)-1,1)})}>
                        <Image source={require('../assets/left.png')} className="w-[15vw] h-[5vh]"/>
                    </TouchableOpacity>
                    <Image className="min-h-[30vh] w-[63vw]"
                        source={{uri: pokeImgUrl}} />
                     <TouchableOpacity onPress={()=>navigation.push("Info", {url: redirUrl+Math.max(Number(pokeIndex)+1,0)})}>
                        <Image source={require('../assets/right.png')} className="w-[15vw] h-[5vh]"/>
                    </TouchableOpacity>
                </View>
                <View className="flex flex-row items-center justify-center pt-[4vh] pl-[4vw]">
                    <Text className="font-extrabold text-center text-xl text-white">{"#"+pokeIndex+" "}</Text>
                    <Text className="font-extrabold text-center text-2xl text-white">{capitalizeWords(pokemonData.name)}</Text>
                </View>
                <View className="flex flex-row items-center justify-evenly">
                    <View className="flex flex-row items-center pb-[2vh] pl-[3vw]">
                        {
                            pokemonData.types.map((type) => {
                                return(
                                    <Text className='text-white p-4 m-1 rounded-lg border border-white' style={{backgroundColor: typeColor[type.type.name]['typeColor']}}>{capitalizeWords(type.type.name)}</Text>
                                )
                            })
                        }
                    </View>
                    <View className="flex flex-row">
                        <View className="mr-5">
                            <Text className="text-white">Height</Text>
                            <Text className="text-white">{pokemonData.height+"cm"}</Text>
                        </View>
                        <View>
                            <Text className="text-white">Weight</Text>
                            <Text className="text-white">{pokemonData.weight+"cm"}</Text>
                        </View>
                    </View>
                </View>
                {
                    pokemonData.stats.map((stat) =>{
                        return(
                                <View className="flex flex-row items-center justify-evenly">
                                    <View className="flex flex-row items-center justify-around w-[40vw]">
                                        <View className="justify-start w-[80%]">
                                            <Text className="text-white">{capitalizeWords(stat.stat.name)}</Text>
                                        </View>
                                        <View>
                                            <Text className="text-white">{stat.base_stat}</Text>
                                        </View>
                                    </View>
                                    <Progress.Bar progress={stat.base_stat/252} />
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