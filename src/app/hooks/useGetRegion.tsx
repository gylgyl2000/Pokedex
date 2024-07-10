import { useState, useEffect } from 'react'
import axios from 'axios'

/** Une région est une zone organisée du monde Pokémon. Le plus souvent, la principale différence
 * entre les régions réside dans les espèces de Pokémon que l’on peut y rencontrer. */

interface NamedAPIResource {
    name: string
    url: string
    [property: string]: any;
}

interface RegionName {
    language: NamedAPIResource;
    name: string;
    [property: string]: any;
}

interface Region {
    id: number; /** L'identifiant de cette ressource. */
    locations: NamedAPIResource[]; /** Une liste des emplacements pouvant être trouvés dans cette région. */
    main_generation: null | NamedAPIResource; /** La génération dans laquelle cette région a été introduite. */
    name: string; /** Le nom de cette ressource. */
    names: RegionName[]; /** Le nom de cette ressource répertorié dans différentes langues. */
    pokedexes: NamedAPIResource[]; /** Une liste de pokédex qui cataloguent les Pokémon de cette région. */
    version_groups: NamedAPIResource[]; /** Une liste de groupes de versions où cette région peut être visitée. */
    [property: string]: any;
}

const useGetRegion = (regionUrl: string) => {
    const [regionId, setRegionId] = useState<number>(0)
    const [regionLocations, setRegionLocations] = useState<NamedAPIResource[]>([])
    const [regionMainGeneration, setRegionMainGeneration] = useState<null | NamedAPIResource>(null)
    const [regionName, setRegionName] = useState<string>('')
    const [regionNames, setRegionNames] = useState<RegionName[]>([]);
    const [regionPokedexes, setRegionPokedexes] = useState<NamedAPIResource[]>([])
    const [regionRegionVersionGroup, setRegionRegionVersionGroup] = useState<NamedAPIResource[]>([]);
    const [isRegionLoading, setIsRegionLoading] = useState<boolean>(false)
    const [regionError, setRegionError] = useState<string | null>(null)

    useEffect(() => {
        const getVersion = async () => {
            setIsRegionLoading(true)
            setRegionError(null)
            try {
                const response = await axios.get<Region>(regionUrl)
                setRegionId(response.data.id)
                setRegionLocations(response.data.locations)
                setRegionMainGeneration(response.data.main_generation)
                setRegionName(response.data.name)
                setRegionNames(response.data.names)
                setRegionPokedexes(response.data.pokedexes)
                setRegionRegionVersionGroup(response.data.version_groups)
            } catch (err) {
                setRegionError('Error fetching data')
            } finally {
                setIsRegionLoading(false)
            }
        }
        getVersion()
    }, [regionUrl])

    const getFrenchName = (names: RegionName[]) => {
        const frenchName = names.find(entry => entry.language.name === 'fr')
        return frenchName ? frenchName.name : ''
    }
    const regionFrenchName = () => {
        if (regionNames) {
            return getFrenchName(regionNames)
        }
        return ''
    }

    return {
        regionId,
        regionLocations,
        regionMainGeneration,
        regionName,
        regionNames, regionFrenchName,
        regionPokedexes,
        regionRegionVersionGroup,
        isRegionLoading, regionError
    }
}
export default useGetRegion