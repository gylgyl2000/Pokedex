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
const useGetRegionList = () => {
    const [regionList, setRegionList] = useState<NamedAPIResource[]>([]);
    const [isRegionListLoading, setIsRegionListLoading] = useState<boolean>(false)
    const [regionListError, setRegionListError] = useState<string | null>(null)
    
    useEffect(() => {
        const getRegionList = async () => {
            setIsRegionListLoading(true)
            setRegionListError(null)
            try {
                const response = await axios.get<APIResourceList>('https://pokeapi.co/api/v2/region/')
                setRegionList(response.data.results);
            } catch (err) {
                setRegionListError('Error fetching data')
            } finally {
                setIsRegionListLoading(false)
            }
        }
        getRegionList()
    }, [])

    return { regionList, isRegionListLoading, regionListError }
}
export default useGetRegionList