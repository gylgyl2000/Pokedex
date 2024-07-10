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
const useGetGenerationList = () => {
    const [generationList, setGenerationList] = useState<NamedAPIResource[]>([]);
    const [isGenerationListLoading, setIsGenerationListLoading] = useState<boolean>(false)
    const [generationListError, setGenerationListError] = useState<string | null>(null)
    
    useEffect(() => {
        const getGenerationList = async () => {
            setIsGenerationListLoading(true)
            setGenerationListError(null)
            try {
                const response = await axios.get<APIResourceList>('https://pokeapi.co/api/v2/generation/')
                setGenerationList(response.data.results);
            } catch (err) {
                setGenerationListError('Error fetching data')
            } finally {
                setIsGenerationListLoading(false)
            }
        }
        getGenerationList()
    }, [])

    return { generationList, isGenerationListLoading, generationListError }
}
export default useGetGenerationList