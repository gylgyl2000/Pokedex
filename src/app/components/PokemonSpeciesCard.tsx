import Link from "next/link"
import useGetPokemon from "../hooks/useGetPokemon"
import useGetPokemonSpecies from "../hooks/useGetPokemonSpecies"
import Sprites from "./Sprites2"
import Types from "./Types"
import { useEffect, useRef } from "react"

interface NamedAPIResource {
    name: string
    url: any
    [property: string]: any;
}

interface Variety {
    is_default: boolean;
    pokemon: NamedAPIResource;
    [property: string]: any;
}

export default function PokemonSpeciesCard({ index, number, Name, url, isLast, newLimit }: any) {
    const {
        pokemonSpeciesFrenchNames,
        pokemonSpeciesId,
        pokemonSpeciesVarieties,
        isPokemonSpeciesLoading,
        pokemonSpeciesError
    } = useGetPokemonSpecies(url)

    const getPokemonByVariety = (variety: Variety[]) => {
        const pokemonSpecies = variety.find(entry => entry.is_default === true)
        return pokemonSpecies?.pokemon.url
    }

    const { pokemonTypes } = useGetPokemon(getPokemonByVariety(pokemonSpeciesVarieties))

    if (isPokemonSpeciesLoading) {
        return <div>Loading...</div>
    }
    if (pokemonSpeciesError) {
        return <div>{pokemonSpeciesError}</div>
    }

    return (
        // <Link href={`/pokemonSpecies/${name}`} key={index} className='m-2 w-1/6'>
            <div className="bg-white w-full p-4 mb-8 text-slate-900">
                <Sprites
                    id={pokemonSpeciesId}
                    Name={Name}
                    pokemonSpeciesUrl={url}
                />
                {/* <div className="flex flex-row justify-between items-center"> */}
                    <div className="text-sm">
                        {number < 10
                            ? `#00${number}`
                                : number > 9 && number < 100
                                ? `#0${number}`
                            : `#${number}`
                        }
                    </div>
                    <div className="text-2xl">
                        {pokemonSpeciesFrenchNames()
                            ? pokemonSpeciesFrenchNames()
                            : ''
                        }
                    </div>
                {/* </div> */}
                <div className="w-full flex flex-row">
                    <Types PokemonTypes={pokemonTypes} />
                    {/* {pokemonTypes.map((entry, index) => (
                        <span key={index}>{entry.type.name} </span>
                    ))} */}
                </div>
            </div>
        // </Link>
    )
}