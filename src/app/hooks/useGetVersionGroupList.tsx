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
const useGetVersionGroupList = () => {
    const [versionGroupList, setVersionGroup] = useState<NamedAPIResource[]>([]);
    const [isVersionGroupListLoading, setIsVersionGroupListLoading] = useState<boolean>(false)
    const [versionGroupListError, setVersionGroupListError] = useState<string | null>(null)
    
    useEffect(() => {
        const getVersionList = async () => {
            setIsVersionGroupListLoading(true)
            setVersionGroupListError(null)
            try {
                const response = await axios.get<APIResourceList>('https://pokeapi.co/api/v2/version-group?offset=0&limit=30')
                setVersionGroup(response.data.results);
            } catch (err) {
                setVersionGroupListError('Error fetching data')
            } finally {
                setIsVersionGroupListLoading(false)
            }
        }
        getVersionList()
    }, [])

    return { versionGroupList, isVersionGroupListLoading, versionGroupListError }
}
export default useGetVersionGroupList