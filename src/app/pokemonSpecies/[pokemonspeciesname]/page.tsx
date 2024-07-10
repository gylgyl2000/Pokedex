"use client"

import GenderRate from "@/app/components/GenderRate"
import Sprites from "@/app/components/Sprites"
import Version from "@/app/components/Version"
import useGetPokemonSpecies from "@/app/hooks/useGetPokemonSpecies"
import useGetPokemonSpeciesList from "@/app/hooks/useGetPokemonSpeciesList"

interface NamedAPIResource {
    name: string
    url: any
    [property: string]: any;
}

export default function PokemonSpeciesHome({
    params : { pokemonspeciesname },
}: {
    params: { pokemonspeciesname: string }
}) {
    const { pokemonSpeciesList } = useGetPokemonSpeciesList()
    
    const getPokemonSpeciesByName = (name: NamedAPIResource[]) => {
        const pokemonSpeciesName = name.find(entry => entry.name === pokemonspeciesname)
        return pokemonSpeciesName?.url
    }
    // console.log(getPokemonSpeciesByName(pokemonSpeciesList))

    const {
        pokemonSpeciesBaseHappiness,
        pokemonSpeciesCaptureRate,
        pokemonSpeciesColor,
        pokemonSpeciesEggGroups,
        pokemonSpeciesEvolutionChain,
        pokemonSpeciesEvolvesFromSpecies,
        pokemonSpeciesFlavorTextEntries,
        pokemonSpeciesFrenchFlavorTextEntries,
        pokemonSpeciesFormDescriptions,
        pokemonSpeciesFormsSwitchable,
        pokemonSpeciesGenderRate,
        pokemonSpeciesGenera,
        pokemonSpeciesFrenchGenera,
        pokemonSpeciesGeneration,
        pokemonSpeciesGrowthRate,
        pokemonSpeciesHabitat,
        pokemonSpeciesHasGenderDifferences,
        pokemonSpeciesHatchCounter,
        pokemonSpeciesId,
        pokemonSpeciesIsBaby,
        pokemonSpeciesIsLegendary,
        pokemonSpeciesIsMythical,
        pokemonSpeciesName,
        pokemonSpeciesNames,
        pokemonSpeciesFrenchNames,
        pokemonSpeciesOrder,
        pokemonSpeciesPalParkEncounters,
        pokemonSpeciesPokedexNumbers,
        pokemonSpeciesShape,
        pokemonSpeciesVarieties,
        isPokemonSpeciesLoading, pokemonSpeciesError
    } = useGetPokemonSpecies(getPokemonSpeciesByName(pokemonSpeciesList))

    if (isPokemonSpeciesLoading) {
        return <div>Loading...</div>
    }
    if (pokemonSpeciesError) {
        return <div>{pokemonSpeciesError}</div>
    }

    return (
        <main className="p-24">
            <div className="w-full font-mono text-sm">
                <h1 className='w-full border border-solid rounded-2xl border-white text-center text-3xl py-5 mb-5'>
                {pokemonSpeciesFrenchNames() ? pokemonSpeciesFrenchNames() : ''}
                </h1>
                <div className='m-2 w-1/6'>
                    <Sprites
                        id={pokemonSpeciesId}
                        Name={pokemonSpeciesName}
                        pokemonSpeciesUrl={getPokemonSpeciesByName(pokemonSpeciesList)}
                    />
                </div>
            <p>id : {pokemonSpeciesId}</p>
            <p>nom : {pokemonSpeciesName}</p>
            <p>bonheur de base : {pokemonSpeciesBaseHappiness}</p>
            <p>taux de capture : {pokemonSpeciesCaptureRate}</p>
            <p>couleur: {pokemonSpeciesColor?.name}</p>
            <p>groupes d&apos;œufs : {pokemonSpeciesEggGroups.map((entry, index) => <span key={index}>{entry.name} </span>)} </p>
            <p>chaîne d&apos;évolution: {pokemonSpeciesEvolutionChain?.url} </p>
            <p>évolue à partir d&apos;une espèce : {pokemonSpeciesEvolvesFromSpecies ? pokemonSpeciesEvolvesFromSpecies.name : 'non'} </p>
            <p>entrées de texte d&apos;ambiance :</p>
                <ul>
                {pokemonSpeciesFrenchFlavorTextEntries().map((entry, index) => (
                    <li key={index}>- <Version url={entry.version.url} /> : {entry.flavor_text} </li>
                ))}
                </ul>
            <p>Descriptions des formes :</p>
                {pokemonSpeciesFormDescriptions
                    ? pokemonSpeciesFormDescriptions.map((entry, index) => (
                        <p key={index}>{entry.description}</p>
                    ))
                    : ''}
            <p>formes commutables : {pokemonSpeciesFormsSwitchable ? 'oui' : 'non'}</p>
            <p>taux de genre :
                {pokemonSpeciesGenderRate === -1
                    ? <span> sans genre</span>
                    : <span> <GenderRate rate={pokemonSpeciesGenderRate} /></span>
                }
            </p>
            <p>espèce : {pokemonSpeciesFrenchGenera()} </p>
            <p>génération d&apos;introduction : {pokemonSpeciesGeneration?.name} </p>
            <p>taux de croissance : {pokemonSpeciesGrowthRate?.name} </p>
            <p>habitat : {pokemonSpeciesHabitat?.name} </p>
            <p>a des différences entre les sexes : {pokemonSpeciesHasGenderDifferences ? 'oui' : 'non'} </p>
            <p>compteur d&apos;éclosion : {pokemonSpeciesHatchCounter} </p>
            <p>bébé Pokémon : {pokemonSpeciesIsBaby ? 'oui' : 'non'} </p>
            <p>Pokémon légendaire : {pokemonSpeciesIsLegendary ? 'oui' : 'non'} </p>
            <p>Pokémon mythique : {pokemonSpeciesIsMythical ? 'oui' : 'non'} </p>
            {/* <p>Noms : {pokemonSpeciesFrenchNames().length > 0 ? pokemonSpeciesFrenchNames()[0].name : ''} </p> */}
            <p>ordre : {pokemonSpeciesOrder} </p>
            <p>rencontres dans le parc d&apos;amis :</p>
                {pokemonSpeciesPalParkEncounters
                    ? pokemonSpeciesPalParkEncounters.map((entry, index) => (
                        <div key={index}>
                            <p>area : {entry.area.name} </p>
                            <p>base_score : {entry.base_score} </p>
                            <p>rate : {entry.rate} </p>
                        </div>
                    ))
                    : ''
                }
            <p>index dans les pokedex :</p>
            <ul>
                {pokemonSpeciesPokedexNumbers.map(((entry, index) => (
                    <li key={index}>#{entry.entry_number} ({entry.pokedex.name})</li>
                )))}
            </ul>
            <p>forme : {pokemonSpeciesShape?.name} </p>
            <p>variétés :</p>
            <ul>
                {pokemonSpeciesVarieties.map((entry, index) => (
                    <li key={index}>
                        {entry.pokemon.name} {entry.is_default ? '(par défaut)' : ''}
                    </li>
                ))}
            </ul>
            </div>
        </main>
    )
}