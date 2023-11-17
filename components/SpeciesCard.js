import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { capitalizeWords, fetchPokemonSpeciesInfo, removeLineBreaks } from '../api/pokedex';
import EvolutionsCard from './evolutionsCard';
import Loading from './Loading';

export default function SpeciesCard({pokeIndex}) {
    const [loading, setLoading] = useState(true);
    const [speciesData, setSpeciesData] = useState({});
    const [version, setVersion] = useState("");

    useEffect(()=>{
        fetchSpeciesDataHome();
    },[])

    const fetchSpeciesDataHome = async () => {
        fetchPokemonSpeciesInfo(pokeIndex).then(data=>{
            setSpeciesData(data);
            setVersion(data.flavor_text_entries[0].version.name);
            setLoading(false);
        })
    }

    const changeVersion = async (cVersion) => {
        setVersion(cVersion);
    }
  return (
    <View>
        {
            loading?(
                <Loading />
            ):(
                <View>
                    <View className="w-[100vw] border-black border-4 bg-black mt-[4vh]"/>
                    <Text className="font-extrabold text-center text-2xl text-white pt-[2vh]">Dex Entry</Text>
                    <ScrollView horizontal={true} className="ml-3 mr-3">
                        <View className="flex flex-row">
                            {
                                speciesData.flavor_text_entries.map((entry)=>{
                                    if(entry.language.name=="en"){
                                        return(
                                            <TouchableOpacity onPress={()=>changeVersion(entry.version.name)}>
                                                <View className="p-3 border border-white m-2 rounded-2xl">
                                                    <Text className="text-white">{capitalizeWords(entry.version.name)}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }
                                })
                            }
                        </View>
                    </ScrollView>
                    <View className="p-4">
                        {
                            (!speciesData.flavor_text_entries.length<2)?(
                                speciesData.flavor_text_entries.map((entry)=>{
                                    if(entry.version.name==version && entry.language.name=="en"){
                                        return(
                                            <Text className="text-white">{removeLineBreaks(entry.flavor_text)}</Text>
                                        )
                                    }
                                })
                            ):(<Text className="text-white">No Data Available</Text>)
                            
                        }
                    </View>
                    <View className="w-[100vw] border-black border-4 bg-black"/>
                    <EvolutionsCard spData={speciesData}/>
                </View>
            )
        }
    </View>
  )
}