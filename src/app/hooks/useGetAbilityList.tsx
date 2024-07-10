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
const useGetAbilityList = () => {
    const [AbilityList, setAbilityList] = useState<NamedAPIResource[]>([]);
    const [isAbilityListLoading, setIsAbilityListLoading] = useState<boolean>(false)
    const [abilityListError, setAbilityListError] = useState<string | null>(null)
    
    useEffect(() => {
        const getAbilityList = async () => {
            setIsAbilityListLoading(true)
            setAbilityListError(null)
            try {
                const response = await axios.get<APIResourceList>('https://pokeapi.co/api/v2/ability?offset=0&limit=400')
                setAbilityList(response.data.results);
            } catch (err) {
                setAbilityListError('Error fetching data')
            } finally {
                setIsAbilityListLoading(false)
            }
        }
        getAbilityList()
    }, [])

    return { AbilityList, isAbilityListLoading, abilityListError }
}
export default useGetAbilityList