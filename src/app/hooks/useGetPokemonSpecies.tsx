import { useState, useEffect } from 'react'
import axios from 'axios'

/** Une espèce de Pokémon constitue la base d'au moins un Pokémon. Les attributs d'une espèce
 * de Pokémon sont partagés par toutes les variétés de Pokémon au sein de l'espèce. Un bon
 * exemple est Wormadam ; Wormadam est l'espèce que l'on peut trouver en trois variétés différentes,
 * Wormadam-Trash, Wormadam-Sandy et Wormadam-Plant. */

interface APIResource {
    url: string; /** L'URL de la ressource référencée. */
    [property: string]: any;
}

interface NamedAPIResource {
    name: string
    url: string
    [property: string]: any;
}

interface PokemonSpeciesFlavorTextEntry {
    flavor_text: string;
    language: NamedAPIResource;
    version: NamedAPIResource;
    [property: string]: any;
}

interface FormDescription {
    description: string;
    language: NamedAPIResource;
    [property: string]: any;
}

interface Genus {
    genus: string; /** Le genre localisé pour les espèces de Pokémon référencées */
    language: NamedAPIResource; /** La langue dans laquelle se trouve ce genre. */
    [property: string]: any;
}

interface PokemonSpeciesName {
    language: NamedAPIResource;
    name: string;
    [property: string]: any;
}

interface PalParkEncounter {
    area: NamedAPIResource;
    base_score: number;
    rate: number;
    [property: string]: any;
}

interface PokedexNumber {
    entry_number: number;
    pokedex: NamedAPIResource;
    [property: string]: any;
}

interface Variety {
    is_default: boolean;
    pokemon: NamedAPIResource;
    [property: string]: any;
}

interface PokemonSpecies {
    base_happiness: number | null; /** Le bonheur d'être attrapé par une Pokéball normale ; jusqu'à 255. Plus le nombre est élevé, plus le Pokémon est heureux. */
    capture_rate: number; /** Le taux de capture de base ; jusqu'à 255. Plus le nombre est élevé, plus la capture est facile. */
    color: NamedAPIResource; /** La couleur de ce Pokémon pour la recherche Pokédex. */
    egg_groups: NamedAPIResource[]; /** Une liste de groupes d'œufs dont cette espèce de Pokémon est membre. */
    evolution_chain: APIResource; /** La chaîne d'évolution dont cette espèce de Pokémon est membre. */
    evolves_from_species: null | NamedAPIResource; /** L'espèce Pokémon qui évolue vers cette espèce de Pokémon. */
    flavor_text_entries: PokemonSpeciesFlavorTextEntry[]; /** Une liste d'entrées de texte d'ambiance pour cette espèce de Pokémon. */
    form_descriptions: FormDescription[]; /** Descriptions des différentes formes que prennent les Pokémon au sein des espèces Pokémon. */
    forms_switchable: boolean; /** Que ce Pokémon ait ou non plusieurs formes et puisse basculer entre elles. */
    gender_rate: number; /** La chance que ce Pokémon soit une femme, en huitièmes ; ou -1 pour sans genre. */
    genera: Genus[]; /** Le genre de cette espèce de Pokémon répertorié en plusieurs langues. */
    generation: NamedAPIResource; /** La génération dans laquelle cette espèce de Pokémon a été introduite. */
    growth_rate: NamedAPIResource; /** La vitesse à laquelle cette espèce de Pokémon gagne des niveaux. */
    habitat: null | NamedAPIResource; /** L'habitat dans lequel cette espèce de Pokémon peut être rencontrée. */
    has_gender_differences: boolean; /** Que ce Pokémon présente ou non des différences visuelles entre les sexes. */
    hatch_counter: number | null; /** Compteur d'éclosion initial : il faut parcourir 255 × (hatch_counter + 1) pas avant que l'œuf de ce Pokémon n'éclot, à moins d'utiliser des bonus comme celui de Flame Body. */
    id: number; /** L'identifiant de cette ressource. */
    is_baby: boolean; /** Qu'il s'agisse ou non d'un bébé Pokémon. */
    is_legendary: boolean; /** Qu'il s'agisse ou non d'un Pokémon légendaire. */
    is_mythical: boolean; /** Qu'il s'agisse ou non d'un Pokémon mythique. */
    name: string; /** Le nom de cette ressource. */
    names: PokemonSpeciesName[]; /** Le nom de cette ressource répertorié dans différentes langues. */
    order: number; /** L'ordre dans lequel les espèces doivent être triées. Basé sur l'ordre National Dex, sauf que les familles sont regroupées et triées par étape. */
    pal_park_encounters: PalParkEncounter[]; /** Une liste de rencontres pouvant être faites avec cette espèce de Pokémon dans le parc des amis. */
    pokedex_numbers: PokedexNumber[]; /** Une liste de Pokedex et les index réservés en leur sein pour cette espèce de Pokémon. */
    shape: null | NamedAPIResource; /** La forme de ce Pokémon pour la recherche Pokédex. */
    varieties: Variety[]; /** Une liste des Pokémon qui existent au sein de cette espèce de Pokémon. */
    [property: string]: any;
}

const useGetPokemonSpecies = (pokemonSpeciesUrl: string) => {
    const [pokemonSpeciesBaseHappiness, setPokemonSpeciesBaseHappiness] = useState<number | null>(null)
    const [pokemonSpeciesCaptureRate, setPokemonSpeciesCaptureRate] = useState<number>(0)
    const [pokemonSpeciesColor, setPokemonSpeciesColor] = useState<NamedAPIResource>()
    const [pokemonSpeciesEggGroups, setPokemonSpeciesEggGroups] = useState<NamedAPIResource[]>([])
    const [pokemonSpeciesEvolutionChain, setPokemonSpeciesEvolutionChain] = useState<APIResource>()
    const [pokemonSpeciesEvolvesFromSpecies, setPokemonSpeciesEvolvesFromSpecies] = useState<null | NamedAPIResource>(null)
    const [pokemonSpeciesFlavorTextEntries, setPokemonSpeciesFlavorTextEntries] = useState<PokemonSpeciesFlavorTextEntry[]>([])
    const [pokemonSpeciesFormDescriptions, setPokemonSpeciesFormDescriptions] = useState<FormDescription[]>([])
    const [pokemonSpeciesFormsSwitchable, setPokemonSpeciesFormsSwitchable] = useState<boolean>()
    const [pokemonSpeciesGenderRate, setPokemonSpeciesGenderRate] = useState<number>(0)
    const [pokemonSpeciesGenera, setPokemonSpeciesGenera] = useState<Genus[]>([])
    const [pokemonSpeciesGeneration, setPokemonSpeciesGeneration] = useState<NamedAPIResource>()
    const [pokemonSpeciesGrowthRate, setPokemonSpeciesGrowthRate] = useState<NamedAPIResource>()
    const [pokemonSpeciesHabitat, setPokemonSpeciesHabitat] = useState<null | NamedAPIResource>(null)
    const [pokemonSpeciesHasGenderDifferences, setPokemonSpeciesHasGenderDifferences] = useState<boolean>()
    const [pokemonSpeciesHatchCounter, setPokemonSpeciesHatchCounter] = useState<number | null>(null)
    const [pokemonSpeciesId, setPokemonSpeciesId] = useState<number>(0)
    const [pokemonSpeciesIsBaby, setPokemonSpeciesIsBaby] = useState<boolean>()
    const [pokemonSpeciesIsLegendary, setPokemonSpeciesIsLegendary] = useState<boolean>()
    const [pokemonSpeciesIsMythical, setPokemonSpeciesIsMythical] = useState<boolean>()
    const [pokemonSpeciesName, setPokemonSpeciesName] = useState<string>()
    const [pokemonSpeciesNames, setPokemonSpeciesNames] = useState<PokemonSpeciesName[]>([])
    const [pokemonSpeciesOrder, setPokemonSpeciesOrder] = useState<number>()
    const [pokemonSpeciesPalParkEncounters, setPokemonSpeciesPalParkEncounters] = useState<PalParkEncounter[]>([])
    const [pokemonSpeciesPokedexNumbers, setPokemonSpeciesPokedexNumbers] = useState<PokedexNumber[]>([])
    const [pokemonSpeciesShape, setPokemonSpeciesShape] = useState<null | NamedAPIResource>(null)
    const [pokemonSpeciesVarieties, setPokemonSpeciesVarieties] = useState<Variety[]>([])
    const [isPokemonSpeciesLoading, setIsPokemonSpeciesLoading] = useState<boolean>(false)
    const [pokemonSpeciesError, setPokemonSpeciesError] = useState<string | null>(null)

    useEffect(() => {
        const getPokemonSpecies = async () => {
            setIsPokemonSpeciesLoading(true)
            setPokemonSpeciesError(null)
            try {
                const response = await axios.get<PokemonSpecies>(pokemonSpeciesUrl)
                setPokemonSpeciesBaseHappiness(response.data.base_happiness)
                setPokemonSpeciesCaptureRate(response.data.capture_rate)
                setPokemonSpeciesColor(response.data.color)
                setPokemonSpeciesEggGroups(response.data.egg_groups)
                setPokemonSpeciesEvolutionChain(response.data.evolution_chain)
                setPokemonSpeciesEvolvesFromSpecies(response.data.evolves_from_species)
                setPokemonSpeciesFlavorTextEntries(response.data.flavor_text_entries)
                setPokemonSpeciesFormDescriptions(response.data.form_descriptions)
                setPokemonSpeciesFormsSwitchable(response.data.forms_switchable)
                setPokemonSpeciesGenderRate(response.data.gender_rate)
                setPokemonSpeciesGenera(response.data.genera)
                setPokemonSpeciesGeneration(response.data.generation)
                setPokemonSpeciesGrowthRate(response.data.growth_rate)
                setPokemonSpeciesHabitat(response.data.habitat)
                setPokemonSpeciesHasGenderDifferences(response.data.has_gender_differences)
                setPokemonSpeciesHatchCounter(response.data.hatch_counter)
                setPokemonSpeciesId(response.data.id)
                setPokemonSpeciesIsBaby(response.data.is_baby)
                setPokemonSpeciesIsLegendary(response.data.is_legendary)
                setPokemonSpeciesIsMythical(response.data.is_mythical)
                setPokemonSpeciesName(response.data.name)
                setPokemonSpeciesNames(response.data.names)
                setPokemonSpeciesOrder(response.data.order)
                setPokemonSpeciesPalParkEncounters(response.data.pal_park_encounters)
                setPokemonSpeciesPokedexNumbers(response.data.pokedex_numbers)
                setPokemonSpeciesShape(response.data.shape)
                setPokemonSpeciesVarieties(response.data.varieties)
            } catch (err) {
                setPokemonSpeciesError('Error fetching data')
            } finally {
                setIsPokemonSpeciesLoading(false)
            }
        }
        getPokemonSpecies()
    }, [pokemonSpeciesUrl])

    // const getFrenchFlavorTextEntries = (flavor_text: PokemonSpeciesFlavorTextEntry[]) => {
    //     return flavor_text
    //         .filter(entry => entry.language.name === 'fr')
    //         .map(entry => ({
    //             text: entry.flavor_text,
    //             version: entry.version.name
    //         }))
    // }
    const getFrenchFlavorTextEntries = (names: PokemonSpeciesFlavorTextEntry[]) => {
        const frenchFlavorTextEntries = names.filter(entry => entry.language.name === 'fr')
        return frenchFlavorTextEntries
    }
    const pokemonSpeciesFrenchFlavorTextEntries = () => {
        // if (pokemonSpeciesFlavorTextEntries) {
            return getFrenchFlavorTextEntries(pokemonSpeciesFlavorTextEntries)
        // }
        // return ''
    }
    const getFrenchGenera = (genus: Genus[]) => {
        const frenchGenera = genus.find(entry => entry.language.name === 'fr')
        return frenchGenera?.genus
    }
    const pokemonSpeciesFrenchGenera = () => {
        return getFrenchGenera(pokemonSpeciesGenera)
    }
    const getFrenchNames = (names: PokemonSpeciesName[]) => {
        const frenchNames = names.find(entry => entry.language.name === 'fr')
        return frenchNames?.name
    }
    const pokemonSpeciesFrenchNames = () => {
        return getFrenchNames(pokemonSpeciesNames)
    }

    return {
        pokemonSpeciesBaseHappiness,
        pokemonSpeciesCaptureRate,
        pokemonSpeciesColor,
        pokemonSpeciesEggGroups,
        pokemonSpeciesEvolutionChain,
        pokemonSpeciesEvolvesFromSpecies,
        pokemonSpeciesFlavorTextEntries, pokemonSpeciesFrenchFlavorTextEntries,
        pokemonSpeciesFormDescriptions,
        pokemonSpeciesFormsSwitchable,
        pokemonSpeciesGenderRate,
        pokemonSpeciesGenera, pokemonSpeciesFrenchGenera,
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
        pokemonSpeciesNames, pokemonSpeciesFrenchNames,
        pokemonSpeciesOrder,
        pokemonSpeciesPalParkEncounters,
        pokemonSpeciesPokedexNumbers,
        pokemonSpeciesShape,
        pokemonSpeciesVarieties,
        isPokemonSpeciesLoading, pokemonSpeciesError
    }
}
export default useGetPokemonSpecies