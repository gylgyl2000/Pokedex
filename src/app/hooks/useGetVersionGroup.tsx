import { useState, useEffect } from 'react'
import axios from 'axios'

/** Les groupes de versions catégorisent les versions très similaires des jeux. */

interface NamedAPIResource {
    name: string
    url: string
    [property: string]: any;
}

interface VersionGroup {
    generation: NamedAPIResource; /** La génération dans laquelle cette version a été introduite. */
    id: number; /** L'identifiant de cette ressource. */
    move_learn_methods: NamedAPIResource[]; /** Une liste de méthodes par lesquelles les Pokémon peuvent apprendre des mouvements dans ce groupe de versions. */
    name: string; /** Le nom de cette ressource. */
    order: number; /** Ordre de tri. Presque par date de sortie, sauf que les versions similaires sont regroupées. */
    pokedexes: NamedAPIResource[]; /** Une liste de Pokédex introduits dans ce groupe de versions. */
    regions: NamedAPIResource[]; /** Une liste des régions qui peuvent être visitées dans ce groupe de versions. */
    versions: NamedAPIResource[]; /** Les versions que possède ce groupe de versions. */
    [property: string]: any;
}

const useGetVersionGroup = (versionGroupUrl: string) => {
    const [versionGroupGeneration, setVersionGroupGeneration] = useState<NamedAPIResource>()
    const [versionGroupId, setVersionGroupId] = useState<number>()
    const [versionGroupMoveLearnMethods, setVersionGroupMoveLearnMethods] = useState<NamedAPIResource[]>([])
    const [versionGroupName, setVersionGroupName] = useState<string>()
    const [versionGroupOrder, setVersionGroupOrder] = useState<number>()
    const [versionGroupPokedexes, setVersionGroupPokedexes] = useState<NamedAPIResource[]>([])
    const [versionGroupRegions, setVersionGroupRegions] = useState<NamedAPIResource[]>([])
    const [versionGroupVersions, setVersionGroupVersions] = useState<NamedAPIResource[]>([])
    const [isVersionGroupLoading, setIsVersionGroupLoading] = useState<boolean>(false)
    const [versionGroupError, setVersionGroupError] = useState<string | null>(null)

    useEffect(() => {
        const getVersionGroup = async () => {
            setIsVersionGroupLoading(true)
            setVersionGroupError(null)
            try {
                const response = await axios.get<VersionGroup>(versionGroupUrl)
                setVersionGroupGeneration(response.data.generation)
                setVersionGroupId(response.data.id)
                setVersionGroupMoveLearnMethods(response.data.move_learn_methods)
                setVersionGroupName(response.data.name)
                setVersionGroupOrder(response.data.order)
                setVersionGroupPokedexes(response.data.pokedexes)
                setVersionGroupRegions(response.data.regions)
                setVersionGroupVersions(response.data.versions)
            } catch (err) {
                setVersionGroupError('Error fetching data')
            } finally {
                setIsVersionGroupLoading(false)
            }
        }
        getVersionGroup()
    }, [versionGroupUrl])

    return {
        versionGroupGeneration,
        versionGroupId,
        versionGroupMoveLearnMethods,
        versionGroupName,
        versionGroupOrder,
        versionGroupPokedexes,
        versionGroupRegions,
        versionGroupVersions,
        isVersionGroupLoading, versionGroupError
    }
}
export default useGetVersionGroup