"use client"

import PokemonCard from '@/app/components/PokemonCard';
import PokemonSpeciesCard from '@/app/components/PokemonSpeciesCard';
import useGetPokedex from '@/app/hooks/useGetPokedex';
import useGetPokedexList from '@/app/hooks/useGetPokedexList';
import Link from 'next/link';

interface NamedAPIResource {
    name: string
    url: any
    [property: string]: any;
}

export default function PokedexHome({
    params : { pokedexname },
}: {
    params: { pokedexname: string }
}) {
    const { pokedexList, isPokedexListLoading, pokedexListError } = useGetPokedexList()
    const getPokedexByName = (name: NamedAPIResource[]) => {
        const pokedexName = name.find(entry => entry.name === pokedexname)
        return pokedexName?.url
    }

    const {
        pokedexId,
        pokedexIsMainSeries,
        pokedexName,
        pokedexDescriptions,
        pokedexFrenchDescription,
        pokedexNames,
        pokedexFrenchName,
        pokedexPokemonEntries,
        pokedexRegion,
        pokedexVersionGroup,
        isPokedexLoading, pokedexError
    } = useGetPokedex(getPokedexByName(pokedexList))

    if (isPokedexLoading) {
        return <div>Loading...</div>
    }
    if (pokedexError) {
        return <div>{pokedexError}</div>
    }
    
    return (
        <main className="p-24">
            <h1>Pokedex {pokedexFrenchName()}</h1>
            <div className='flex flex-row flex-wrap justify-start'>

                {pokedexPokemonEntries.slice(0, 20).map((entry, index) => (
                    <Link href={`/pokedex/${pokedexname}/${entry.pokemon_species.name}`} key={index} className='m-2 w-1/6'>
                        <PokemonSpeciesCard number={entry.entry_number} Name={entry.pokemon_species.name} url={entry.pokemon_species.url} />
                        {/* <p key={entry.entry_number}>{entry.entry_number} - {entry.pokemon_species.name}</p> */}
                    </Link>
                ))}
            </div>
        </main>
    )
}