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
const useGetPokemonHabitatList = () => {
    const [pokemonHabitatList, setPokemonHabitatList] = useState<NamedAPIResource[]>([]);
    const [isPokemonHabitatListLoading, setIsPokemonHabitatListLoading] = useState<boolean>(false)
    const [pokemonHabitatListError, setPokemonHabitatListError] = useState<string | null>(null)
    
    useEffect(() => {
        const getPokemonHabitatList = async () => {
            setIsPokemonHabitatListLoading(true)
            setPokemonHabitatListError(null)
            try {
                const response = await axios.get<APIResourceList>('https://pokeapi.co/api/v2/pokemon-habitat/')
                setPokemonHabitatList(response.data.results);
            } catch (err) {
                setPokemonHabitatListError('Error fetching data')
            } finally {
                setIsPokemonHabitatListLoading(false)
            }
        }
        getPokemonHabitatList()
    }, [])

    return { pokemonHabitatList, isPokemonHabitatListLoading, pokemonHabitatListError }
}
export default useGetPokemonHabitatList