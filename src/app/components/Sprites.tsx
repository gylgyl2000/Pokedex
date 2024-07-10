"use client"

import Image from "next/image"
import useGetPokemon from "@/app/hooks/useGetPokemon"

export default function Sprites({ url, shiny }: any) {
    const {
        pokemonName,
        pokemonSprites,
        isPokemonLoading, pokemonError
    } = useGetPokemon(url)
    // console.log(url)

    // if (isPokemonLoading) {
    //     return <div>Loading...</div>
    // }
    // if (pokemonError) {
    //     return <div>{pokemonError} ben ça alors</div>
    // }
    return (
        <div className="bg-[url('./../../public/container_bg.png')]">
            <Image
                src={
                    shiny === 'false'
                        ? pokemonSprites?.other["official-artwork"].front_default
                            ? pokemonSprites?.other["official-artwork"].front_default
                            : 'https://www.pokepedia.fr/images/archive/7/7f/20220220194445%21Loupe.png'
                        : pokemonSprites?.other["official-artwork"].front_shiny
                            ? pokemonSprites?.other["official-artwork"].front_shiny
                            : 'https://www.pokepedia.fr/images/archive/7/7f/20220220194445%21Loupe.png'
                }
                // placeholder='data:image/ https://www.pokepedia.fr/images/archive/7/7f/20220220194445%21Loupe.png'
                alt={pokemonName + '_sprite'}
                width={400}
                height={400}
                quality={75}
            />
        </div>
    )
}