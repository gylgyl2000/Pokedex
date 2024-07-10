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

const useGetPokemonSpeciesList = () => {
    const [pokemonSpeciesListCount, setPokemonSpeciesCount] = useState<number>();
    const [pokemonSpeciesListNext, setPokemonSpeciesNext] = useState<null | string>();
    const [pokemonSpeciesListPrevious, setPokemonSpeciesPrevious] = useState<null | string>();
    const [pokemonSpeciesList, setPokemonSpeciesList] = useState<NamedAPIResource[]>([]);
    const [isPokemonSpeciesListLoading, setIsPokemonSpeciesListLoading] = useState<boolean>(false)
    const [pokemonSpeciesListError, setPokemonSpeciesListError] = useState<string | null>(null)
    
    useEffect(() => {
        const getPokemonSpeciesList = async () => {
            setIsPokemonSpeciesListLoading(true)
            setPokemonSpeciesListError(null)
            try {
                const response = await axios.get<APIResourceList>('https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=1100');
                setPokemonSpeciesList(response.data.results);
                setPokemonSpeciesNext(response.data.next)
            } catch (err) {
                setPokemonSpeciesListError('Error fetching data')
            } finally {
                setIsPokemonSpeciesListLoading(false)
            }
        }
        getPokemonSpeciesList()
    }, [])

    return { pokemonSpeciesList, pokemonSpeciesListNext, isPokemonSpeciesListLoading, pokemonSpeciesListError }
}
export default useGetPokemonSpeciesList