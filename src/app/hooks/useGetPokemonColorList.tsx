import { useState, useEffect } from 'react'
import axios from 'axios'

interface NamedAPIResource {
    name: string
    url: string
    [property: string]: any;
}

interface APIResourceList {
    count: number
    next: null | string
    previous: null | string
    results: NamedAPIResource[]
    [property: string]: any;
}
const useGetPokemonColorList = () => {
    const [pokemonColorList, setPokemonColorList] = useState<NamedAPIResource[]>([]);
    const [isPokemonColorListLoading, setIsPokemonColorListLoading] = useState<boolean>(false)
    const [pokemonColorListError, setPokemonColorListError] = useState<string | null>(null)
    
    useEffect(() => {
        const getPokemonColorList = async () => {
            setIsPokemonColorListLoading(true)
            setPokemonColorListError(null)
            try {
                const response = await axios.get<APIResourceList>('https://pokeapi.co/api/v2/pokemon-color/')
                setPokemonColorList(response.data.results);
            } catch (err) {
                setPokemonColorListError('Error fetching data')
            } finally {
                setIsPokemonColorListLoading(false)
            }
        }
        getPokemonColorList()
    }, [])

    return { pokemonColorList, isPokemonColorListLoading, pokemonColorListError }
}
export default useGetPokemonColorList