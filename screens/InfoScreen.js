import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchPokedexData, findPokemonIndex } from '../api/pokedex';
import SpeciesCard from '../components/SpeciesCard';
import PokedexDataCard from '../components/pokedexDataCard';
import { useEffect, useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { typeColor } from '../constants';
import Loading from '../components/Loading';
import backBtn from '../assets/down-arrow.png';

export default function InfoScreen() {
    const [loading, setLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState({});
    const [pokemonType1, setType1] = useState("");
    const [pokemonType2, setType2] = useState("");
    const params = useRoute();
    const navigation = useNavigation();
    const pokeUrl = params.params.url;
    const pokeIndex = findPokemonIndex(pokeUrl);

    useEffect(()=>{
        fetchPokedexDataHome();
    },[])

    const fetchPokedexDataHome = async () => {
        fetchPokedexData(pokeUrl).then(data=>{
            setPokemonData(data);
            if(data.types.length<2){
                setType1(data.types[0].type.name);
                setType2(data.types[0].type.name);
            }else{
                setType1(data.types[0].type.name);
                setType2(data.types[1].type.name);
            }
            setLoading(false);
        })
    }

    
  return (
    <View>
        {
            loading?(
                <Loading />
            ):(
                <ScrollView>
                    <LinearGradient
                        className="absolute left-0 top-0 right-0 h-[100%]"
                        colors={[typeColor[pokemonType1]['typeColor'], typeColor[pokemonType2]['typeColor']]}
                        start={{x:0, y:0}}
                        end={{x:1, y:1}}
                        useAngle={true} angle={45} angleCenter={{ x: 0.5, y: 0.5 }}
                    />
                    <SafeAreaView className="relative">
                        <TouchableOpacity onPress={() => navigation.navigate('Home')} className="p-3">
                            <View className="bg-white rounded-full h-[5vh] w-[5vh] items-center justify-center p-3 border boder-black">
                                <Image source={backBtn} className="h-[4vh] w-[4vh]"/>
                            </View>
                        </TouchableOpacity>
                        <PokedexDataCard pokeParamUrl={pokeUrl}/>
                        <SpeciesCard pokeIndex={((pokemonData.species.url).slice(42).replace('/',''))} />
                    </SafeAreaView>
                </ScrollView>
            )
        }
    </View>
  )
}
