import { useState, useEffect } from 'react'
import axios from 'axios'

/** Les habitats sont généralement des terrains différents dans lesquels les Pokémon
 * peuvent être trouvés, mais peuvent également être des zones désignées pour des Pokémon
 * rares ou légendaires. */

interface NamedAPIResource {
    name: string
    url: string
    [property: string]: any;
}

interface PokemonHabitatName {
    language: NamedAPIResource;
    name: string;
    [property: string]: any;
}

interface PokemonHabitat {
    id: number; /** L'identifiant de cette ressource. */
    name: string; /** Le nom de cette ressource. */
    names: PokemonHabitatName[]; /** Le nom de cette ressource répertorié dans différentes langues. */
    pokemon_species: NamedAPIResource[]; /** Une liste des espèces de Pokémon pouvant être trouvées dans cet habitat. */
    [property: string]: any;
}

const useGetPokemonHabitat = (pokemonHabitatUrl: string) =>  {
    const [pokemonHabitatId, setPokemonHabitatId] = useState<number>()
    const [pokemonHabitatName, setPokemonHabitatName] = useState<string>()
    const [pokemonHabitatNames, setPokemonHabitatNames] = useState<PokemonHabitatName[]>([])
    const [pokemonHabitatPokemonSpecies, setPokemonHabitatPokemonSpecies] = useState<NamedAPIResource[]>([])
    const [isPokemonHabitatLoading, setIsPokemonHabitatLoading] = useState<boolean>(false)
    const [pokemonHabitatError, setPokemonHabitatError] = useState<string | null>(null)

    useEffect(() => {
        const getPokemonHabitat = async () => {
            setIsPokemonHabitatLoading(true)
            setPokemonHabitatError(null)
            try {
                const response = await axios.get<PokemonHabitat>(pokemonHabitatUrl)
                setPokemonHabitatId(response.data.id)
                setPokemonHabitatName(response.data.name)
                setPokemonHabitatNames(response.data.names)
                setPokemonHabitatPokemonSpecies(response.data.pokemon_species)
            } catch (err) {
                setPokemonHabitatError('Error fetching data')
            } finally {

            }
        }
        getPokemonHabitat()
    }, [pokemonHabitatUrl])

    const getFrenchName = (names: PokemonHabitatName[]) => {
        const frenchName = names.find(entry => entry.language.name === 'fr')
        return frenchName ? frenchName.name : ''
    }
    const pokemonHabitatFrenchName = () => {
        if (pokemonHabitatNames) {
            return getFrenchName(pokemonHabitatNames)
        }
        return ''
    }

    return {
        pokemonHabitatId,
        pokemonHabitatName,
        pokemonHabitatNames, pokemonHabitatFrenchName,
        pokemonHabitatPokemonSpecies,
        isPokemonHabitatLoading, pokemonHabitatError
    }
}
export default useGetPokemonHabitat
