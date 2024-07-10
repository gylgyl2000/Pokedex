"use client"

import Abilities from "@/app/components/Abilities";
import PokemonColor from "@/app/components/PokemonColor";
import PokemonHabitat from "@/app/components/PokemonHabitat";
import PokemonShape from "@/app/components/PokemonShape";
import Sprites from "@/app/components/Sprites";
import Types from "@/app/components/Types";
import useGetPokemon from "@/app/hooks/useGetPokemon";
import useGetPokemonList from "@/app/hooks/useGetPokemonList";
import useGetPokemonSpecies from "@/app/hooks/useGetPokemonSpecies";
import useGetPokemonSpeciesList from "@/app/hooks/useGetPokemonSpeciesList";

interface NamedAPIResource {
    name: string
    url: any
    [property: string]: any;
}
interface PokedexNumber {
    entry_number: number;
    pokedex: NamedAPIResource;
    [property: string]: any;
}

export default function PokemonHome({
    params : { pokedexname, pokemonname },
}: {
    params: { pokedexname: string, pokemonname: string }
}) {
    const { pokemonList } = useGetPokemonList()
    const { pokemonSpeciesList } = useGetPokemonSpeciesList()

    const getPokemonByName = (name: NamedAPIResource[]) => {
        const pokemonSpeciesName = name.find(entry => entry.name === pokemonname)
        return pokemonSpeciesName?.url
    }
    const getPokemonSpeciesByName = (name: NamedAPIResource[]) => {
        const pokemonSpeciesName = name.find(entry => entry.name === pokemonname)
        return pokemonSpeciesName?.url
    }
    const getPokemonIdByPokedexName = (name: PokedexNumber[]) => {
        const pokemonId = name.find(entry => entry.pokedex.name === pokedexname)
        return pokemonId?.entry_number
    }
    

    const {
        pokemonAbilities,
        pokemonBaseExperience,
        pokemonCries,
        pokemonForms,
        pokemonGameIndices,
        pokemonHeight,
        pokemonHeldItems,
        pokemonId,
        pokemonIsDefault,
        pokemonLocationAreaEncounters,
        pokemonMoves,
        pokemonName,
        pokemonOrder,
        pokemonPastAbilities,
        pokemonPastTypes,
        pokemonSpecies,
        pokemonSprites,
        pokemonStats,
        pokemonTypes,
        pokemonWeight,
        isPokemonLoading, pokemonError
    } = useGetPokemon(getPokemonByName(pokemonList))

    // console.log(pokemonSprites)

    const {
        pokemonSpeciesColor,
        pokemonSpeciesFrenchGenera,
        pokemonSpeciesName,
        pokemonSpeciesFrenchNames,
        pokemonSpeciesHabitat,
        pokemonSpeciesId,
        pokemonSpeciesPokedexNumbers,
        pokemonSpeciesShape,
    } = useGetPokemonSpecies(getPokemonSpeciesByName(pokemonSpeciesList))

    console.log(pokemonSpeciesHabitat)
    const pokemonIdByPokedexName: any = getPokemonIdByPokedexName(pokemonSpeciesPokedexNumbers)

    if (isPokemonLoading) {
        return <div>Loading...</div>
    }
    if (pokemonError) {
        return <div>{pokemonError}</div>
    }

    return (
        <main className="p-24">
            <div className="w-full font-mono text-sm">
                <h1 className='w-full border border-solid rounded-2xl border-white text-center text-3xl py-5 mb-5'>
                    {pokemonSpeciesFrenchNames() ? pokemonSpeciesFrenchNames() : ''}
                </h1>

                <div className="flex flex-row border border-solid rounded-2xl border-white bg-white text-black">
                    <div className='m-2 w-1/3'>
                        <Sprites
                            // id={pokemonSpeciesId}
                            // Name={pokemonSpeciesName}
                            // url={getPokemonSpeciesByName(pokemonSpeciesList)}
                            url={getPokemonByName(pokemonList)}
                            shiny='false'
                        />
                    </div>

                    <div className='m-12 w-1/3'>
                        <div className="text-sm">
                            {pokemonIdByPokedexName < 10
                                ? `#00${pokemonIdByPokedexName}`
                                    : pokemonIdByPokedexName > 9 && pokemonIdByPokedexName < 100
                                    ? `#0${pokemonIdByPokedexName}`
                                : `#${pokemonIdByPokedexName}`
                            }
                        </div>
                        <div className="w-2/3 flex flex-row">
                            <Types PokemonTypes={pokemonTypes} />
                        </div>
                        <p>poids : {pokemonWeight} hectogrammes</p>
                        <p>hauteur : {pokemonHeight} décimètres</p>
                        <p>genre : {pokemonSpeciesFrenchGenera()}</p>
                        <p>couleur : <PokemonColor url={pokemonSpeciesColor?.url} /></p>
                        <p>espèce : {pokemonSpecies?.name}</p>
                        <div className="w-1/2 border border-solid rounded-2xl border-black text-center">
                            apparence du corps
                            <PokemonShape url={pokemonSpeciesShape?.url} />
                        </div>
                        <div>Talents :
                            <ul>
                                {pokemonAbilities.map((entry, index) => (
                                    <li key={index}>
                                        {entry.slot} : <Abilities url={entry.ability.url} /> {entry.is_hidden ? '(talent caché)' : ''}
                                        {/* ability : {entry.ability.url} - is_hidden : {entry.is_hidden ? 'oui' : 'non'} - slot : {entry.slot} */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='m-12 w-1/3'>
                        <p>expérience de base : {pokemonBaseExperience} </p>
                        <div className='m-2 w-1/3 border border-solid rounded-2xl border-black text-center'>
                            <Sprites
                                url={getPokemonByName(pokemonList)}
                                shiny='true'
                            />
                            <p>{pokemonSpeciesFrenchNames()} chromatique</p>
                        </div>
                        {pokemonSpeciesHabitat !== null ?
                        <div className="w-1/2 border border-solid rounded-2xl border-black text-center">
                            habitat
                            <PokemonHabitat url={pokemonSpeciesHabitat?.url} />
                        </div>
                        : ''}

                    </div>
                </div>

            <p>crie :<br />
            - {pokemonCries?.latest}<br />
            - {pokemonCries?.legacy}</p>
            <p>formes : {pokemonForms.map((entry, index) => (
                <span key={index}>{entry.name} </span>
            ))}</p>
            <p>index dans les jeux :</p>
            {pokemonGameIndices.map((entry, index) => (
                <p key={index}>#{entry.game_index} ({entry.version.name})</p>
            ))}
            <p>objets détenus : {pokemonHeldItems.map((entry, index) => (
                <span key={index}>- {entry.item.name}</span>
            ))} </p>
            <p>id : {pokemonId} </p>
            <p>défaut : {pokemonIsDefault ? 'oui' : 'non'} </p>
            <p>zones de localisation : {pokemonLocationAreaEncounters}</p>
            <p>mouvements : {pokemonMoves.map((entry, index) => (
                <span key={index}>{entry.move.name}, </span>
            ))} </p>
            <p>nom : {pokemonName}</p>
            <p>ordre : {pokemonOrder}</p>
            <p>capacités dans les générations précédentes :</p>
                {pokemonPastAbilities.map((entry, index) => (
                    <p key={index}>{entry.generation.name} : {entry.abilities.map((entry, index) => (<span key={index}>{entry.ability.name} </span>))}</p>
                ))}
            <p>types dans les générations précédentes :</p>
                {pokemonPastTypes.map((entry, index) => (
                    <p key={index}>{entry.generation.name} : {entry.types.map((entry, index) => (<span key={index}>{entry.type.name} </span>))}</p>
                ))}
            {/* <p>sprites : {pokemonSprites?.other["official-artwork"].front_default}</p> */}
            <p>statistiques :</p>
            {pokemonStats.map((entry, index) => (
                <p key={index}>stat : {entry.stat.name}, base_stat : {entry.base_stat}, effort : {entry.effort}</p>
            ))}
            
        </div>
        </main>
    )
}