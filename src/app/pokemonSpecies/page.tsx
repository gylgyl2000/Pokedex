"use client"

import PokemonSpeciesCard from '@/app/components/PokemonSpeciesCard';
import Link from 'next/link';
import useGetPokemonSpeciesList from '@/app/hooks/useGetPokemonSpeciesList';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import getPokemonSpeciesList from './getPokemonSpeciesList';

interface NamedAPIResource {
    name: string
    url: string
    [property: string]: any;
}

interface APIResourceList {
    count: number
    next: null | string
    previous: null | string
    results: NamedAPIResource[]
    [property: string]: any;
}

export default function PokemonSpeciesHome() {
    const [loadedData, setLoadedData] = useState<NamedAPIResource[]>([]);
    const [offset, setOffset] = useState<number>(20)
    const [limit, setLimit] = useState<number>(20)
    const [loading, setLoading] = useState<boolean>(false);
    const [moreData, setMoreData] = useState<boolean>(true);
    // console.log(loadedData)
    const { pokemonSpeciesList, pokemonSpeciesListNext, isPokemonSpeciesListLoading, pokemonSpeciesListError } = useGetPokemonSpeciesList()
    console.log(pokemonSpeciesListNext)
    // const loadMoreData = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await axios.get<APIResourceList>(`
    //             https://pokeapi.co/api/v2/pokemon-species/?offset=${offset}&limit=${limit}
    //         `);
    //         const results = response.data.results
    //         setLoadedData(prevPosts => [...prevPosts, ...results])
    //         setMoreData(results.length > 0);
    //     }
    //     catch (error) {
    //         console.error('Error fetching data:', error);
    //         // setMoreData(false);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     loadMoreData
    // }, [offset]);

    // if (moreData && !loading) {
    //     loadMoreData();
    // }

    // const handleScroll = () => {
    //     if (!loading && moreData &&
    //         window.innerHeight +
    //         document.documentElement.scrollTop >=
    //         document.documentElement.offsetHeight - 20
    //     ) {
    //         setOffset(prevPage => prevPage + 5);
    //     }
    // };

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, [loading, moreData]);
        
    if (isPokemonSpeciesListLoading) {
        return <div>Loading...</div>
    }
    if (pokemonSpeciesListError) {
        return <div>{pokemonSpeciesListError}</div>
    }

    return (
        <main className="p-24">
            <h1>Les expèces de Pokémon</h1>
            <div className='flex flex-row flex-wrap justify-start'>

                {pokemonSpeciesList.slice(0, 20).map((entry, index) => (
                    // <>
                    <Link href={`/pokemonSpecies/${entry.name}`} key={index} className='m-2 w-1/6'>
                        <PokemonSpeciesCard
                            index={index}
                            number={index + 1}
                            name={entry.name}
                            url={entry.url}
                            // isLast={index === pokemonSpeciesList.length - 1}
                            // newLimit={() => setLimit(limit + 10)}
                        />
                    </Link>
                    // </>
                ))}
            </div>
                {loading && <div>Loading...</div> }
                {!loading && !moreData && <div>No more data</div>}
        </main>
    )
}