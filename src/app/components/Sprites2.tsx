"use client"

import Image from "next/image"
import useGetPokemon from "../hooks/useGetPokemon"
import useGetPokemonSpecies from "../hooks/useGetPokemonSpecies"
import fond from "../../../public/container_bg.png"

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

export default function Sprites({ id, Name, pokemonUrl, pokemonSpeciesUrl }: any) {
    const { pokemonSpeciesVarieties } = useGetPokemonSpecies(pokemonSpeciesUrl)

    const getPokemonByVariety = (variety: Variety[]) => {
        const pokemonSpecies = variety.find(entry => entry.is_default === true)
        return pokemonSpecies?.pokemon.url
    }
    // console.log(getPokemonByVariety(pokemonSpeciesVarieties))

    const { pokemonSprites, isPokemonLoading, pokemonError } =
        useGetPokemon(pokemonUrl ? pokemonUrl : getPokemonByVariety(pokemonSpeciesVarieties))
    let image: any
    

    if (isPokemonLoading) {
        return <div>Loading...</div>
    }
    if (pokemonError) {
        return <div>{pokemonError}</div>
    }
    // console.log(url)

    if (id < 10000) {
        // image = pokemonSprites?.other["official-artwork"].front_default
        image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    } else if (id === 10001) {
        image = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-b.png'
    } else {
        image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    }
    return (
        <div className="bg-[url('./../../public/container_bg.png')] bg-white">
            <Image
                src={pokemonSprites?.other["official-artwork"].front_default || image}
                alt={Name + '_sprite'}
                width={400}
                height={400}
                quality={75}
            />
        </div>
    )
}