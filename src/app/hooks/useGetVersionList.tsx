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
const useGetVersionList = () => {
    const [versionList, setVersionList] = useState<NamedAPIResource[]>([]);
    const [isVersionListLoading, setIsVersionListLoading] = useState<boolean>(false)
    const [versionListError, setVersionListError] = useState<string | null>(null)
    
    useEffect(() => {
        const getVersionList = async () => {
            setIsVersionListLoading(true)
            setVersionListError(null)
            try {
                const response = await axios.get<APIResourceList>('https://pokeapi.co/api/v2/version?offset=0&limit=100')
                setVersionList(response.data.results);
            } catch (err) {
                setVersionListError('Error fetching data')
            } finally {
                setIsVersionListLoading(false)
            }
        }
        getVersionList()
    }, [])

    return { versionList, isVersionListLoading, versionListError }
}
export default useGetVersionList