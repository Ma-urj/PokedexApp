import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchAllPokedexData, capitalizeWords, findPokemonIndex } from '../api/pokedex';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';

export default function HomeScreen() {
    const [loading, setLoading] = useState(true);
    const [allDexData, setAllDexData] = useState({});
    const pokeImgUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
    const navigation = useNavigation();
    const generations = [
        "kanto",
        "johto",
        "hoenn",
        "sinnoh",
        "unova",
        "kalos",
        "alola",
        "galar",
        "hisui",
        "paldea",
        "alternate-forms"
    ]

    useEffect(()=>{
        fetchAllPokedexDataHome(generations[0]);
    },[])

    const fetchAllPokedexDataHome = async (params) => {
        fetchAllPokedexData(params).then(data=>{
            setAllDexData(data);
            setLoading(false);
        })
    }
    
  return (
    <ScrollView style={{backgroundColor: '#3b4cca'}}>
        <SafeAreaView className="p-3">
            <Text className="font-extrabold text-center text-2xl">Pokedex</Text>
            <ScrollView horizontal={true}>
                <View className="flex flex-row pb-[3vh] pt-[3vh]">
                    {
                        generations.map((gen) => {
                            return(
                                <TouchableOpacity onPress={()=>{
                                    setLoading(true);
                                    fetchAllPokedexDataHome(gen);
                                    }}>
                                    <View className="p-4 border border-white mr-5 rounded-full">
                                        <Text className="text-white">{capitalizeWords(gen)}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
            <View className="flex-1 flex-row flex-wrap justify-center">
                {
                    loading?(
                    <Loading />
                    ):
                    (
                        Object.entries(allDexData.results).map((key) => {
                            return(
                                <TouchableOpacity onPress={()=>navigation.navigate("Info", {url: key[1].url})}
                                className="items-center m-[0.5vw] justify-center p-2 bg-blue-600 rounded-3xl">
                                    <Image className="h-[7vh] w-[7vh]"
                                        source={{uri: pokeImgUrl+(findPokemonIndex(key[1].url))+".png"}} />
                                    <Text className="text-white">{capitalizeWords(key[1].name)}</Text>
                                </TouchableOpacity>
                            )
                        })
                    )
                }
            </View>
        </SafeAreaView>
    </ScrollView>
  )
}