import { useState, useEffect } from 'react'
import axios from 'axios'

/** Les Pokémon sont les créatures qui habitent le monde des jeux Pokémon. Ils
 * peuvent être attrapés à l'aide de Pokéballs et entraînés en combattant d'autres
 * Pokémon. Chaque Pokémon appartient à une espèce spécifique mais peut adopter
 * une variante qui le différencie des autres Pokémon de la même espèce, comme
 * les statistiques de base, les capacités disponibles et les types. Voir
 * [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_(species))
 * pour plus de détails. */

interface NamedAPIResource {
    name: string
    url: string
    [property: string]: any;
}

interface PokemonAbility {
    ability: NamedAPIResource; /** La capacité que le Pokémon peut avoir. */
    is_hidden: boolean; /** Qu'il s'agisse ou non d'une capacité cachée. */
    slot: number; /** L'emplacement qu'occupe cette capacité dans cette espèce de Pokémon. */
    [property: string]: any;
}

interface Cries {
    latest: string
    legacy: string
    [property: string]: any;
}

interface PokemonGameIndex {
    game_index: number;
    version: NamedAPIResource;
    [property: string]: any;
}

interface HeldItemVersionDetail {
    rarity: number;
    version: NamedAPIResource;
    [property: string]: any;
}

interface HeldItem {
    item: NamedAPIResource;
    version_details: HeldItemVersionDetail[];
    [property: string]: any;
}

interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: NamedAPIResource;
    version_group: NamedAPIResource;
    [property: string]: any;
}

interface MoveElement {
    move: NamedAPIResource;
    version_group_details: VersionGroupDetail[];
    [property: string]: any;
}

interface PastAbilityAbility {
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
    [property: string]: any;
}

interface PastAbility {
    abilities: PastAbilityAbility[];
    generation: NamedAPIResource;
    [property: string]: any;
}

interface PastTypeType {
    slot: number;
    type: NamedAPIResource;
    [property: string]: any;
}

interface PastType {
    generation: NamedAPIResource;
    types: PastTypeType[];
    [property: string]: any;
}

interface Home {
    front_default: null | string;
    front_female: null | string;
    front_shiny: null | string;
    front_shiny_female: null | string;
    [property: string]: any;
}

interface OfficialArtwork {
    front_default: null | string;
    front_shiny: null | string;
    [property: string]: any;
}

interface Showdown {
    back_default: null | string;
    back_female: null | string;
    back_shiny: null | string;
    back_shiny_female: null;
    front_default: null | string;
    front_female: null | string;
    front_shiny: null | string;
    front_shiny_female: null | string;
    [property: string]: any;
}

interface DreamWorld {
    front_default: null | string;
    front_female: null | string;
    [property: string]: any;
}

interface Other {
    dream_world: DreamWorld;
    home: Home;
    "official-artwork": OfficialArtwork;
    showdown: Showdown;
    [property: string]: any;
}

interface GenerationI {
    "red-blue": RedBlue;
    yellow: Yellow;
    [property: string]: any;
}

interface RedBlue {
    back_default: null | string;
    back_gray: null | string;
    back_transparent: null | string;
    front_default: null | string;
    front_gray: null | string;
    front_transparent: null | string;
    [property: string]: any;
}

interface Yellow {
    back_default: null | string;
    back_gray: null | string;
    back_transparent: null | string;
    front_default: null | string;
    front_gray: null | string;
    front_transparent: null | string;
    [property: string]: any;
}

interface GenerationIi {
    crystal: Crystal;
    gold: Gold;
    silver: Silver;
    [property: string]: any;
}

interface Crystal {
    back_default: null | string;
    back_shiny: null | string;
    back_shiny_transparent: null | string;
    back_transparent: null | string;
    front_default: null | string;
    front_shiny: null | string;
    front_shiny_transparent: null | string;
    front_transparent: null | string;
    [property: string]: any;
}

interface Gold {
    back_default: null | string;
    back_shiny: null | string;
    front_default: null | string;
    front_shiny: null | string;
    front_transparent: null | string;
    [property: string]: any;
}

interface Silver {
    back_default: null | string;
    back_shiny: null | string;
    front_default: null | string;
    front_shiny: null | string;
    front_transparent: null | string;
    [property: string]: any;
}

interface GenerationIii {
    emerald: Emerald;
    "firered-leafgreen": FireredLeafgreen;
    "ruby-sapphire": RubySapphire;
    [property: string]: any;
}

interface Emerald {
    front_default: null | string;
    front_shiny: null | string;
    [property: string]: any;
}

interface FireredLeafgreen {
    back_default: null | string;
    back_shiny: null | string;
    front_default: null | string;
    front_shiny: null | string;
    [property: string]: any;
}

interface RubySapphire {
    back_default: null | string;
    back_shiny: null | string;
    front_default: null | string;
    front_shiny: null | string;
    [property: string]: any;
}

interface GenerationIv {
    "diamond-pearl": DiamondPearl;
    "heartgold-soulsilver": HeartgoldSoulsilver;
    platinum: Platinum;
    [property: string]: any;
}

interface DiamondPearl {
    back_default: null | string;
    back_female: null | string;
    back_shiny: null | string;
    back_shiny_female: null | string;
    front_default: null | string;
    front_female: null | string;
    front_shiny: null | string;
    front_shiny_female: null | string;
    [property: string]: any;
}

interface HeartgoldSoulsilver {
    back_default: null | string;
    back_female: null | string;
    back_shiny: null | string;
    back_shiny_female: null | string;
    front_default: null | string;
    front_female: null | string;
    front_shiny: null | string;
    front_shiny_female: null | string;
    [property: string]: any;
}

interface Platinum {
    back_default: null | string;
    back_female: null | string;
    back_shiny: null | string;
    back_shiny_female: null | string;
    front_default: null | string;
    front_female: null | string;
    front_shiny: null | string;
    front_shiny_female: null | string;
    [property: string]: any;
}

interface GenerationV {
    "black-white": BlackWhite;
    [property: string]: any;
}

interface BlackWhite {
    animated: Animated;
    back_default: null | string;
    back_female: null | string;
    back_shiny: null | string;
    back_shiny_female: null | string;
    front_default: null | string;
    front_female: null | string;
    front_shiny: null | string;
    front_shiny_female: null | string;
    [property: string]: any;
}

interface Animated {
    back_default: null | string;
    back_female: null | string;
    back_shiny: null | string;
    back_shiny_female: null | string;
    front_default: null | string;
    front_female: null | string;
    front_shiny: null | string;
    front_shiny_female: null | string;
    [property: string]: any;
}

interface GenerationVi {
    "omegaruby-alphasapphire": OmegarubyAlphasapphire;
    "x-y": XY;
    [property: string]: any;
}

interface OmegarubyAlphasapphire {
    front_default: null | string;
    front_female: null | string;
    front_shiny: null | string;
    front_shiny_female: null | string;
    [property: string]: any;
}

interface XY {
    front_default: null | string;
    front_female: null | string;
    front_shiny: null | string;
    front_shiny_female: null | string;
    [property: string]: any;
}

interface GenerationVii {
    icons: GenerationViiIcons;
    "ultra-sun-ultra-moon": UltraSunUltraMoon;
    [property: string]: any;
}

interface GenerationViiIcons {
    front_default: null | string;
    front_female: null | string;
    [property: string]: any;
}

interface UltraSunUltraMoon {
    front_default: null | string;
    front_female: null | string;
    front_shiny: null | string;
    front_shiny_female: null | string;
    [property: string]: any;
}

interface GenerationViii {
    icons: GenerationViiiIcons;
    [property: string]: any;
}

interface GenerationViiiIcons {
    front_default: null | string;
    front_female: null | string;
    [property: string]: any;
}

interface Versions {
    "generation-i": GenerationI;
    "generation-ii": GenerationIi;
    "generation-iii": GenerationIii;
    "generation-iv": GenerationIv;
    "generation-v": GenerationV;
    "generation-vi": GenerationVi;
    "generation-vii": GenerationVii;
    "generation-viii": GenerationViii;
    [property: string]: any;
}

interface PokemonSprites {
    back_default: null | string; /** La représentation par défaut de ce Pokémon de dos en combat. */
    back_female: null | string; /** La représentation féminine de ce Pokémon de dos en combat. */
    back_shiny: null | string; /** La représentation brillante de ce Pokémon de dos en combat. */
    back_shiny_female: null | string; /** La représentation féminine brillante de ce Pokémon de dos en combat. */
    front_default: null | string; /** La représentation par défaut de ce Pokémon vu de face en combat. */
    front_female: null | string; /** La représentation féminine de ce Pokémon vu de front en combat. */
    front_shiny: null | string; /** La représentation brillante de ce Pokémon vu de front en combat. */
    front_shiny_female: null | string; /** La représentation féminine brillante de ce Pokémon vu de front en combat. */
    other: Other;
    versions: Versions;
    [property: string]: any;
}

interface StatElement {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
    [property: string]: any;
}

interface PokemonType {
    slot: number; /** L'ordre dans lequel les types de Pokémon sont répertoriés. */
    type: NamedAPIResource; /** Le type du Pokémon référencé. */
    [property: string]: any;
}

interface Pokemon {
    abilities: PokemonAbility[]; /** Une liste de capacités que ce Pokémon pourrait potentiellement avoir. */
    base_experience: number | null; /** L'expérience de base acquise en battant ce Pokémon. */
    cries: Cries;
    forms: NamedAPIResource[]; /** Une liste des formes que ce Pokémon peut prendre. */
    game_indices: PokemonGameIndex[]; /** Une liste d'indices de jeu relatifs aux objets Pokémon par génération. */
    height: number; /** La hauteur de ce Pokémon en décimètres. */
    held_items: HeldItem[]; /** Une liste d'objets que ce Pokémon peut détenir lorsqu'il est rencontré. */
    id: number; /** L'identifiant de cette ressource. */
    is_default: boolean; /** Défini pour exactement un Pokémon utilisé par défaut pour chaque espèce. */
    location_area_encounters: string; /** Un lien vers une liste de zones de localisation, ainsi que des détails de rencontre relatifs à des versions spécifiques. */
    moves: MoveElement[]; /** Une liste de mouvements ainsi que des méthodes d'apprentissage et des détails de niveau relatifs à des groupes de versions spécifiques. */
    name: string; /** Le nom de cette ressource. */
    order: number; /** Ordre de tri. Ordre quasi national, sauf que les familles sont regroupées. */
    past_abilities: PastAbility[];
    past_types: PastType[]; /** Une liste de détails montrant les types que ce pokémon avait dans les générations précédentes */
    species: NamedAPIResource; /** L'espèce à laquelle appartient ce Pokémon. */
    sprites: PokemonSprites; /** Un ensemble de sprites utilisés pour représenter ce Pokémon dans le jeu. Une représentation visuelle des différents sprites peut être trouvée sur a href='https://github.com/PokeAPI/sprites#sprites'PokeAPI/sprites/a */
    stats: StatElement[]; /** Une liste de valeurs de statistiques de base pour ce Pokémon. */
    types: PokemonType[]; /** Une liste de détails montrant les types de ce Pokémon. */
    weight: number; /** Le poids de ce Pokémon en hectogrammes. */
    [property: string]: any;
}

// const [pokemon, setPokemon] = useState<>()

const useGetPokemon = (pokemonUrl: string) => {
    const [pokemonAbilities, setPokemonAbilities] = useState<PokemonAbility[]>([])
    const [pokemonBaseExperience, setPokemonBaseExperience] = useState<number | null>(null)
    const [pokemonCries, setPokemonCries] = useState<Cries>()
    const [pokemonForms, setPokemonForms] = useState<NamedAPIResource[]>([])
    const [pokemonGameIndices, setPokemonGameIndices] = useState<PokemonGameIndex[]>([])
    const [pokemonHeight, setPokemonHeight] = useState<number>()
    const [pokemonHeldItems, setPokemonHeldItems] = useState<HeldItem[]>([])
    const [pokemonId, setPokemonId] = useState<number>(0)
    const [pokemonIsDefault, setPokemonIsDefault] = useState<boolean>()
    const [pokemonLocationAreaEncounters, setPokemonLocationAreaEncounters] = useState<string>()
    const [pokemonMoves, setPokemonMoves] = useState<MoveElement[]>([])
    const [pokemonName, setPokemonName] = useState<string>()
    const [pokemonOrder, setPokemonOrder] = useState<number>()
    const [pokemonPastAbilities, setPokemonPastAbilities] = useState<PastAbility[]>([])
    const [pokemonPastTypes, setPokemonPastTypes] = useState<PastType[]>([])
    const [pokemonSpecies, setPokemonSpecies] = useState<NamedAPIResource>()
    const [pokemonSprites, setPokemonSprites] = useState<PokemonSprites>()
    const [pokemonStats, setpokemonStats] = useState<StatElement[]>([])
    const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([])
    const [pokemonWeight, setPokemonWeight] = useState<number>()

    const [isPokemonLoading, setIsPokemonLoading] = useState<boolean>(false)
    const [pokemonError, setPokemonError] = useState<string | null>(null)

    useEffect(() => {
        const getPokemon = async () => {
            setIsPokemonLoading(true)
            setPokemonError(null)
            try {
                const response = await axios.get<Pokemon>(pokemonUrl)
                setPokemonAbilities(response.data.abilities)
                setPokemonBaseExperience(response.data.base_experience)
                setPokemonCries(response.data.cries)
                setPokemonForms(response.data.forms)
                setPokemonGameIndices(response.data.game_indices)
                setPokemonHeight(response.data.height)
                setPokemonHeldItems(response.data.held_items)
                setPokemonId(response.data.id)
                setPokemonIsDefault(response.data.is_default)
                setPokemonLocationAreaEncounters(response.data.location_area_encounters)
                setPokemonMoves(response.data.moves)
                setPokemonName(response.data.name)
                setPokemonOrder(response.data.order)
                setPokemonPastAbilities(response.data.past_abilities)
                setPokemonPastTypes(response.data.past_types)
                setPokemonSpecies(response.data.species)
                setPokemonSprites(response.data.sprites)
                setpokemonStats(response.data.stats)
                setPokemonTypes(response.data.types)
                setPokemonWeight(response.data.weight)
            } catch (err) {
                setPokemonError('Error fetching data')
            } finally {
                setIsPokemonLoading(false)
            }
        }
        getPokemon()
    }, [pokemonUrl])

    return {
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
    }
}
export default useGetPokemon