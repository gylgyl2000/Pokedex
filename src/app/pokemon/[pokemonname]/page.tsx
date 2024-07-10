"use client"

import useGetPokemon from "@/app/hooks/useGetPokemon";
import useGetPokemonList from "@/app/hooks/useGetPokemonList";

interface NamedAPIResource {
    name: string
    url: any
    [property: string]: any;
}

export default function PokemonHome({
    params : { pokemonname },
}: {
    params: { pokemonname: string }
}) {
    const { pokemonList } = useGetPokemonList()

    const getPokemonByName = (name: NamedAPIResource[]) => {
        const pokemonSpeciesName = name.find(entry => entry.name === pokemonname)
        return pokemonSpeciesName?.url
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

    // console.log(pokemonTypes)

    if (isPokemonLoading) {
        return <div>Loading...</div>
    }
    if (pokemonError) {
        return <div>{pokemonError}</div>
    }

    return (
        <div>
            <div>capacités :
                <ul>
                    {pokemonAbilities.map((entry, index) => (
                        <li key={index}>
                            ability : {entry.ability.name} - is_hidden : {entry.is_hidden ? 'oui' : 'non'} - slot : {entry.slot}
                        </li>
                    ))}
                </ul>
            </div>
            <p>expérience de base : {pokemonBaseExperience} </p>
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
            <p>hauteur : {pokemonHeight} décimètres</p>
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
            <p>espèce : {pokemonSpecies?.name}</p>
            <p>sprites : {pokemonSprites?.other["official-artwork"].front_default}</p>
            <p>statistiques :</p>
            {pokemonStats.map((entry, index) => (
                <p key={index}>stat : {entry.stat.name}, base_stat : {entry.base_stat}, effort : {entry.effort}</p>
            ))}
            <p>type :</p>
            {pokemonTypes.map((entry, index) => (
                <p key={index}>slot : {entry.slot} - type : {entry.type.name}</p>
            ))}
            <p>poids : {pokemonWeight} hectogrammes</p>
        </div>
    )
}