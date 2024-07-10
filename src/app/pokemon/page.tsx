"use client"

import PokemonCard from '@/app/components/PokemonCard';
import Link from 'next/link';
import useGetPokemonList from '@/app/hooks/useGetPokemonList';

export default function PokemonHome() {
    const { pokemonList, isPokemonListLoading, pokemonListError } = useGetPokemonList()

    if (isPokemonListLoading) {
        return <div>Loading...</div>
    }
    if (pokemonListError) {
        return <div>{pokemonListError}</div>
    }
    
    return (
        <main className="p-24">
            <h1 className='w-full border border-solid rounded-2xl border-white text-white text-center text-3xl py-5 mb-5'>
                Les expèces de Pokémon
            </h1>

            <div className='flex flex-row flex-wrap justify-center'>
                {pokemonList.slice(0, 25).map((entry, index) => (
                    <Link href={`/pokemon/${entry.name}`} key={index} className='m-2 w-1/6 h-1/3'>
                        <PokemonCard
                            number={index + 1}
                            Name={entry.name}
                            url={entry.url} />
                    </Link>
                ))}
            </div>
        </main>
    )
}