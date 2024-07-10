import useGetPokemon from "../hooks/useGetPokemon"
import useGetPokemonSpecies from "../hooks/useGetPokemonSpecies"
import Sprites from "./Sprites2"

interface NamedAPIResource {
    name: string
    url: string
    [property: string]: any;
}

export default function PokemonCard({ number, Name, url }: any) {
    // const {
    //     pokemonSpeciesFrenchNames,
    //     pokemonSpeciesId,
    //     isPokemonSpeciesLoading,
    //     pokemonSpeciesError
    // } = useGetPokemonSpecies(url)

    // if (isPokemonSpeciesLoading) {
    //     return <div>Loading...</div>
    // }
    // if (pokemonSpeciesError) {
    //     return <div>{pokemonSpeciesError}</div>
    // }
    const { pokemonId, pokemonSpecies } = useGetPokemon(url)

    const getPokemonBySpecies = (species: NamedAPIResource[]) => {
        const pokemonSpecies = species.find(entry => entry.name === Name)
        return pokemonSpecies?.url
    }

    return (
        <div className="bg-white w-full h-full p-4 mb-8 text-white bg-slate-800">
            <Sprites
                id={pokemonId}
                Name={Name}
                pokemonUrl={url}
            />
            <div className="text-sm">
                {pokemonId < 10
                    ? `#00${pokemonId}`
                        : pokemonId > 9 && pokemonId < 100
                        ? `#0${pokemonId}`
                    : `#${pokemonId}`
                }
            </div>
            <div className="text-2xl">
                {/* {pokemonSpeciesFrenchNames().length > 0
                    ? pokemonSpeciesFrenchNames()[0].name
                    : ''
                } */}
                {Name}
            </div>
            <div className="w-full flex flex-row">
            typesMiniatures
            </div>
        </div>
    )
}