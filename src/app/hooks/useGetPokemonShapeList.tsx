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
const useGetPokemonShapeList = () => {
    const [pokemonShapeList, setPokemonShapeList] = useState<NamedAPIResource[]>([]);
    const [isPokemonShapeListLoading, setIsPokemonShapeListLoading] = useState<boolean>(false)
    const [pokemonShapeListError, setPokemonShapeListError] = useState<string | null>(null)
    
    useEffect(() => {
        const getPokemonShapeList = async () => {
            setIsPokemonShapeListLoading(true)
            setPokemonShapeListError(null)
            try {
                const response = await axios.get<APIResourceList>('https://pokeapi.co/api/v2/pokemon-shape/')
                setPokemonShapeList(response.data.results);
            } catch (err) {
                setPokemonShapeListError('Error fetching data')
            } finally {
                setIsPokemonShapeListLoading(false)
            }
        }
        getPokemonShapeList()
    }, [])

    return { pokemonShapeList, isPokemonShapeListLoading, pokemonShapeListError }
}
export default useGetPokemonShapeList