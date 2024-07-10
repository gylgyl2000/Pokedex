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

const useGetPokemonList = () => {
    const [pokemonList, setPokemon] = useState<NamedAPIResource[]>([]);
    const [isPokemonListLoading, setIsPokemonListLoading] = useState<boolean>(false)
    const [pokemonListError, setPokemonListError] = useState<string | null>(null)
    
    useEffect(() => {
        const getPokemonList = async () => {
            setIsPokemonListLoading(true)
            setPokemonListError(null)
            try {
                const response = await axios.get<APIResourceList>('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1400');
                setPokemon(response.data.results);
            } catch (err) {
                setPokemonListError('Error fetching data')
            } finally {
                setIsPokemonListLoading(false)
            }
        }
        getPokemonList()
    }, [])

    return { pokemonList, isPokemonListLoading, pokemonListError }
}
export default useGetPokemonList