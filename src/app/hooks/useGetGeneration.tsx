import { useState, useEffect } from 'react'
import axios from 'axios'

/** Une génération est un regroupement de jeux Pokémon qui les sépare en fonction des Pokémon qu'ils
 * incluent. À chaque génération, un nouvel ensemble de Pokémon, de capacités, de capacités et de
 * types qui n'existaient pas dans la génération précédente est publié. */

interface NamedAPIResource {
    name: string
    url: string
    [property: string]: any;
}

interface GenerationName {
    language: NamedAPIResource;
    name: string;
    [property: string]: any;
}

interface Generation {
    abilities: NamedAPIResource[]; /** Une liste de capacités introduites dans cette génération. */
    id: number; /** L'identifiant de cette ressource. */
    main_region: NamedAPIResource; /** La principale région parcourue au cours de cette génération. */
    moves: NamedAPIResource[]; /** Une liste des mouvements introduits dans cette génération. */
    name: string; /** Le nom de cette ressource. */
    names: GenerationName[]; /** Le nom de cette ressource répertorié dans différentes langues. */
    pokemon_species: NamedAPIResource[]; /** Une liste des espèces de Pokémon introduites au cours de cette génération. */
    types: NamedAPIResource[]; /** Une liste de types introduits dans cette génération. */
    version_groups: NamedAPIResource[]; /** Une liste des groupes de versions introduits dans cette génération. */
    [property: string]: any;
}
// const [generation, setGeneration] = useState<>()
const useGetGeneration = (generationUrl: string) => {
    const [generationAbilities, setGenerationAbilities] = useState<NamedAPIResource[]>([])
    const [generationId, setGenerationId] = useState<number>(0)
    const [generationMainRegion, setGenerationMainRegion] = useState<NamedAPIResource>()
    const [generationMoves, setGenerationMoves] = useState<NamedAPIResource[]>([])
    const [generationName, setGenerationName] = useState<string>('')
    const [generationNames, setGenerationNames] = useState<GenerationName[]>([])
    const [generationPokemonSpecies, setGenerationPokemonSpecies] = useState<NamedAPIResource[]>([])
    const [generationTypes, setGenerationTypes] = useState<NamedAPIResource[]>([])
    const [generationVersionGroups, setGenerationVersionGroups] = useState<NamedAPIResource[]>([])
    const [isGenerationLoading, setIsGenerationLoading] = useState<boolean>(false)
    const [generationError, setGenerationError] = useState<string | null>(null)

    useEffect(() => {
        const getGeneration = async () => {
            setIsGenerationLoading(true)
            setGenerationError(null)
            try {
                const response = await axios.get<Generation>(generationUrl)
                setGenerationAbilities(response.data.abilities)
                setGenerationId((response.data.id))
                setGenerationMainRegion(response.data.main_region)
                setGenerationMoves(response.data.moves)
                setGenerationName(response.data.name)
                setGenerationNames(response.data.names)
                setGenerationPokemonSpecies(response.data.pokemon_species)
                setGenerationTypes(response.data.types)
                setGenerationVersionGroups(response.data.version_groups)
            } catch (err) {
                setGenerationError('Error fetching data')
            } finally {
                setIsGenerationLoading(false)
            }
        }
        getGeneration()
    }, [generationUrl])

    const getFrenchName = (names: GenerationName[]) => {
        const frenchName = names.find(entry => entry.language.name === 'fr')
        return frenchName ? frenchName.name : ''
    }
    const generationFrenchName = () => {
        if (generationNames) {
            return getFrenchName(generationNames)
        }
        return ''
    }

    return {
        generationAbilities,
        generationId,
        generationMainRegion,
        generationMoves,
        generationName,
        generationNames, generationFrenchName,
        generationPokemonSpecies,
        generationTypes,
        generationVersionGroups,
        isGenerationLoading, generationError
    }
}
export default useGetGeneration