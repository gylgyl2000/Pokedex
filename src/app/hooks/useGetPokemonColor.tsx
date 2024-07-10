import { useState, useEffect } from 'react'
import axios from 'axios'

/** Couleurs utilisées pour trier les Pokémon dans un Pokédex. La couleur indiquée dans le Pokédex
 * est généralement la couleur la plus apparente ou celle qui recouvre le corps de chaque Pokémon.
 * Aucune catégorie orange n'existe ; Les Pokémon principalement oranges sont répertoriés comme rouges
 * ou bruns. */

interface NamedAPIResource {
    name: string
    url: string
    [property: string]: any;
}

interface PokemonColorName {
    language: NamedAPIResource;
    name: string;
    [property: string]: any;
}

interface PokemonColor {
    id: number; /** L'identifiant de cette ressource. */
    name: string; /** Le nom de cette ressource. */
    names: PokemonColorName[]; /** Le nom de cette ressource répertorié dans différentes langues. */
    pokemon_species: NamedAPIResource[]; /** Une liste des espèces de Pokémon qui ont cette couleur. */
    [property: string]: any;
}

const useGetPokemonColor = (pokemonColorUrl: string) => {
    const [pokemonColorId, setPokemonColorId] = useState<number>()
    const [pokemonColorName, setPokemonColorName] = useState<string>()
    const [pokemonColorNames, setPokemonColorNames] = useState<PokemonColorName[]>([])
    const [pokemonColorPokemonSpecies, setPokemonColorPokemonSpecies] = useState<NamedAPIResource[]>([])
    const [isPokemonColorLoading, setIsPokemonColorLoading] = useState<boolean>(false)
    const [pokemonColorError, setPokemonColorError] = useState<string | null>(null)

    useEffect(() => {
        const getPokemonColor = async () => {
            setIsPokemonColorLoading(true)
            setPokemonColorError(null)
            try {
                const response = await axios.get<PokemonColor>(pokemonColorUrl)
                setPokemonColorId(response.data.id)
                setPokemonColorName(response.data.name)
                setPokemonColorNames(response.data.names)
                setPokemonColorPokemonSpecies(response.data.pokemon_species)
            } catch (err) {
                setPokemonColorError('Error fetching data')
            } finally {

            }
        }
        getPokemonColor()
    }, [pokemonColorUrl])

    const getFrenchName = (names: PokemonColorName[]) => {
        const frenchName = names.find(entry => entry.language.name === 'fr')
        return frenchName ? frenchName.name : ''
    }
    const pokemonColorFrenchName = () => {
        if (pokemonColorNames) {
            return getFrenchName(pokemonColorNames)
        }
        return ''
    }

    return {
        pokemonColorId,
        pokemonColorName,
        pokemonColorNames, pokemonColorFrenchName,
        pokemonColorPokemonSpecies,
        isPokemonColorLoading, pokemonColorError
    }
}
export default useGetPokemonColor
