import { useState, useEffect } from 'react'
import axios from 'axios'

/** Formes utilisées pour trier les Pokémon dans un Pokédex. */

interface NamedAPIResource {
    name: string
    url: string
    [property: string]: any;
}

interface AwesomeName {
    awesome_name: string; /** Le nom « scientifique » localisé d'une ressource API dans une langue spécifique. */
    language: NamedAPIResource; /** La langue dans laquelle se trouve ce nom « scientifique ». */
    [property: string]: any;
}

interface PokemonShapeName {
    language: NamedAPIResource;
    name: string;
    [property: string]: any;
}

interface PokemonShape {
    awesome_names: AwesomeName[]; /** Le nom « scientifique » de cette forme Pokémon répertorié dans différentes langues. */
    id: number; /** L'identifiant de cette ressource. */
    name: string; /** Le nom de cette ressource. */
    names: PokemonShapeName[]; /** Le nom de cette ressource répertorié dans différentes langues. */
    pokemon_species: NamedAPIResource[]; /** Une liste des espèces de Pokémon qui ont cette forme. */
    [property: string]: any;
}

const useGetPokemonShape = (pokemonShapeUrl: string) => {
    const [pokemonShapeAwesomeNames, setPokemonShapeAwesomeNames] = useState<AwesomeName[]>([])
    const [pokemonShapeId, setPokemonShapeId] = useState<number>()
    const [pokemonShapeName, setPokemonShapeName] = useState<string>()
    const [pokemonShapeNames, setPokemonShapeNames] = useState<PokemonShapeName[]>([])
    const [pokemonShapePokemonSpecies, setPokemonShapePokemonSpecies] = useState<NamedAPIResource[]>([])
    const [isPokemonShapeLoading, setIsPokemonShapeLoading] = useState<boolean>(false)
    const [pokemonShapeError, setPokemonShapeError] = useState<string | null>(null)

    useEffect(() => {
        const getPokemonShape = async () => {
            setIsPokemonShapeLoading(true)
            setPokemonShapeError(null)
            try {
                const response = await axios.get<PokemonShape>(pokemonShapeUrl)
                setPokemonShapeAwesomeNames(response.data.awesome_names)
                setPokemonShapeId(response.data.id)
                setPokemonShapeName(response.data.name)
                setPokemonShapeNames(response.data.names)
                setPokemonShapePokemonSpecies(response.data.pokemon_species)
            } catch (err) {
                setPokemonShapeError('Error fetching data')
            } finally {

            }
        }
        getPokemonShape()
    }, [pokemonShapeUrl])

    const getFrenchName = (names: PokemonShapeName[]) => {
        const frenchName = names.find(entry => entry.language.name === 'fr')
        return frenchName ? frenchName.name : ''
    }
    const pokemonShapeFrenchName = () => {
        if (pokemonShapeNames) {
            return getFrenchName(pokemonShapeNames)
        }
        return ''
    }

    return {
        pokemonShapeAwesomeNames,
        pokemonShapeId,
        pokemonShapeName,
        pokemonShapeNames, pokemonShapeFrenchName,
        pokemonShapePokemonSpecies,
        isPokemonShapeLoading, pokemonShapeError
    }
}
export default useGetPokemonShape
