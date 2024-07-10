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

const useGetPokedexList = () => {
    const [pokedexList, setPokedexList] = useState<NamedAPIResource[]>([]);
    const [isPokedexListLoading, setIsPokedexListLoading] = useState<boolean>(false)
    const [pokedexListError, setPokedexListError] = useState<string | null>(null)
    
    useEffect(() => {
        const getPokedexList = async () => {
            setIsPokedexListLoading(true)
            setPokedexListError(null)
            try {
                const response = await axios.get<APIResourceList>('https://pokeapi.co/api/v2/pokedex/?offset=0&limit=120');
                setPokedexList(response.data.results);
            } catch (err) {
                setPokedexListError('Error fetching data')
            } finally {
                setIsPokedexListLoading(false)
            }
        }
        getPokedexList()
    }, [])

    return { pokedexList, isPokedexListLoading, pokedexListError }
}
export default useGetPokedexList