import { useState, useEffect } from 'react'
import axios from 'axios'

/** Un Pokédex est un appareil d'encyclopédie électronique portable ; celui qui est capable d'enregistrer
 * et de conserver des informations sur les différents Pokémon dans une région donnée à l'exception du dex
 * national et de certains dex plus petits liés à des parties d'une région. Voir
 * [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Pokedex) pour plus de détails. */

interface NamedAPIResource {
    name: string
    url: string
    [property: string]: any;
}
interface PokedexDescriptions {
    description: string
    language: NamedAPIResource
    [property: string]: any;
}

interface PokedexNames {
    language: NamedAPIResource
    name: string
    [property: string]: any;
}

interface PokedexPokemonEntries {
    entry_number: number
    pokemon_species: NamedAPIResource
    [property: string]: any;
}

interface Pokedex {
    descriptions: PokedexDescriptions[] /** La description de cette ressource répertoriée dans différentes langues. */
    id: number /** L'identifiant de cette ressource. */
    is_main_series: boolean /** Que ce Pokédex soit ou non originaire de la série principale des jeux vidéo. */
    name: string /** Le nom de cette ressource. */
    names: PokedexNames[] /** Le nom de cette ressource répertorié dans différentes langues. */
    pokemon_entries: PokedexPokemonEntries[] /** Une liste des Pokémon catalogués dans ce Pokédex et leurs index. */
    region: null | NamedAPIResource /** La région pour laquelle ce Pokédex catalogue les Pokémon. */
    version_groups: NamedAPIResource[] /** Une liste de groupes de versions pour lesquels ce Pokédex est pertinent. */
    [property: string]: any;
}

const useGetPokedex = (pokedexUrl: string) => {
    const [pokedexDescriptions, setPokedexDescriptions] = useState<PokedexDescriptions[]>([]);
    const [pokedexId, setPokedexId] = useState<number>(0)
    const [pokedexIsMainSeries, setPokedexIsMainSeries] = useState<boolean>(true)
    const [pokedexName, setPokedexName] = useState<string>('')
    const [pokedexNames, setPokedexNames] = useState<PokedexNames[]>([]);
    const [pokedexPokemonEntries, setPokedexPokemonEntries] = useState<PokedexPokemonEntries[]>([]);
    const [pokedexRegion, setPokedexRegion] = useState<null | NamedAPIResource>(null)
    const [pokedexVersionGroup, setPokedexVersionGroup] = useState<NamedAPIResource[]>([]);
    // const [pokedexFrenchName, setPokedexFrenchName] = useState<string | null>(null)
    // const [pokedexFrenchDescription, setPokedexFrenchDescription] = useState<string | null>(null);
    const [isPokedexLoading, setIsPokedexLoading] = useState<boolean>(false)
    const [pokedexError, setPokedexError] = useState<string | null>(null)

    useEffect(() => {
        const getPokedex = async () => {
            setIsPokedexLoading(true)
            setPokedexError(null)
            try {
                const response = await axios.get<Pokedex>(pokedexUrl)
                setPokedexDescriptions(response.data.descriptions);
                setPokedexId(response.data.id)
                setPokedexIsMainSeries(response.data.is_main_series)
                setPokedexName(response.data.name)
                setPokedexNames(response.data.names)
                setPokedexPokemonEntries(response.data.pokemon_entries)
                setPokedexRegion(response.data.region)
                setPokedexVersionGroup(response.data.version_groups)
                // const frenchName = response.data.names.filter(entry => entry.language.name === 'fr')[0].name
                // setPokedexFrenchName(frenchName ? frenchName : null)
                // const frenchDescription = response.data.descriptions.filter(entry => entry.language.name === 'fr')[0].description
                // setPokedexFrenchDescription(frenchDescription ? frenchDescription : null)
            } catch (err) {
                setPokedexError('Error fetching data')
            } finally {
                setIsPokedexLoading(false)
            }
        }
        getPokedex()
    }, [pokedexUrl])

    const getFrenchName = (names: PokedexNames[]) => {
        const frenchName = names.find(entry => entry.language.name === 'fr')
        const englishName = names.find(entry => entry.language.name === 'en')
        return frenchName
            ? frenchName.name
            : englishName
                ? englishName.name + ' (EN)'
                : ''
    }
    const pokedexFrenchName = () => {
        if (pokedexNames) {
            return getFrenchName(pokedexNames)
        }
        return ''
    }
    const getFrenchDescription = (descriptions: PokedexDescriptions[]) => {
        const frenchDescription = descriptions.find(entry => entry.language.name === 'fr')
        const englishDescription = descriptions.find(entry => entry.language.name === 'en')
        return frenchDescription
            ? frenchDescription.description
            : englishDescription
                ? englishDescription.description + ' (EN)'
                : '';
    }
    const pokedexFrenchDescription = () => {
        if (pokedexDescriptions) {
            return getFrenchDescription(pokedexDescriptions)
        }
        return ''
    }

    return {
        pokedexDescriptions,
        pokedexId,
        pokedexIsMainSeries,
        pokedexName,
        pokedexFrenchDescription,
        pokedexNames, pokedexFrenchName,
        pokedexPokemonEntries,
        pokedexRegion,
        pokedexVersionGroup,
        isPokedexLoading, pokedexError
    }
}
export default useGetPokedex