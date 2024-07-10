"use client"

import React from 'react';
import useGetPokedexList from '@/app/hooks/useGetPokedexList'
import Pokedex from '@/app/components/Pokedex';
import Link from 'next/link';

const PokedexList: React.FC = () => {
    const { pokedexList, isPokedexListLoading, pokedexListError } = useGetPokedexList()
    // console.log(pokedexList)
    if (isPokedexListLoading) {
        return <div>Loading...</div>
    }
    if (pokedexListError) {
        return <div>{pokedexListError}</div>
    }
    return (
        <main className="p-24">
            <h1 className='w-full border border-solid rounded-2xl border-white text-center text-3xl py-5 mb-5'>
                Les Pokédex
            </h1>
            <div className='w-full flex flex-row flex-wrap justify-between'>
                {pokedexList.map((entry, index) => (
                    <Link
                        href={`/pokedex/${entry.name}`}
                        key={index}
                        className='w-2/6  pb-10'>
                        <Pokedex pokedexUrl={entry.url} />
                    </Link>
                ))}
            </div>
        </main>
    )
}
export default PokedexList