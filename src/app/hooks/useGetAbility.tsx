import { useState, useEffect } from 'react'
import axios from 'axios'

/** Les capacités fournissent des effets passifs aux Pokémon au combat ou dans le monde extérieur.
 * Les Pokémon ont plusieurs capacités possibles mais ne peuvent avoir qu'une seule capacité à la fois.
 * Consultez [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Ability) pour plus de détails. */

interface NamedAPIResource {
    name: string
    url: string
    [property: string]: any;
}

interface PurpleEffectEntry {
    effect: string;
    language: NamedAPIResource;
    [property: string]: any;
}

interface AbilityEffectChange {
    effect_entries: PurpleEffectEntry[]; /** L'effet précédent de cette capacité répertorié dans différentes langues. */
    version_group: NamedAPIResource; /** Le groupe de versions dans lequel l'effet précédent de cette capacité est originaire. */
    [property: string]: any;
}

interface AbilityEffectEntry {
    effect: string;
    language: NamedAPIResource;
    short_effect: string;
    [property: string]: any;
}

interface AbilityFlavorTextEntry {
    flavor_text: string;
    language: NamedAPIResource;
    version_group: NamedAPIResource;
    [property: string]: any;
}

interface AbilityName {
    language: NamedAPIResource;
    name: string;
    [property: string]: any;
}

interface AbilityPokemon {
    is_hidden: boolean; /** Qu'il s'agisse ou non d'une capacité cachée pour le Pokémon référencé. */
    pokemon: NamedAPIResource; /** Le Pokémon auquel cette capacité pourrait appartenir. */
    slot: number; /** Les Pokémon ont 3 « emplacements » de capacité qui contiennent des références aux capacités possibles qu'ils pourraient avoir. C'est l'emplacement de cette capacité pour le pokémon référencé. */
    [property: string]: any;
}

interface Ability {
    effect_changes: AbilityEffectChange[]; /** La liste des effets précédents que cette capacité a eus dans les groupes de versions. */
    effect_entries: AbilityEffectEntry[]; /** L'effet de cette capacité répertorié dans différentes langues. */
    flavor_text_entries: AbilityFlavorTextEntry[]; /** Le texte d'ambiance de cette capacité répertorié dans différentes langues. */
    generation: NamedAPIResource; /** La génération à laquelle cette capacité est issue. */
    id: number; /** L'identifiant de cette ressource. */
    is_main_series: boolean; /** Que cette capacité soit ou non originaire de la série principale des jeux vidéo. */
    name: string; /** Le nom de cette ressource. */
    names: AbilityName[]; /** Le nom de cette ressource répertorié dans différentes langues. */
    pokemon: AbilityPokemon[]; /** Une liste de Pokémon qui pourraient potentiellement avoir cette capacité. */
    [property: string]: any;
}

const useGetAbility = (abilityUrl: string) => {
    const [abilityEffectChanges, setAbilityEffectChanges] = useState<AbilityEffectChange[]>([])
    const [abilityEffectEntries, setAbilityEffectEntries] = useState<AbilityEffectEntry[]>([])
    const [abilityFlavorTextEntries, setAbilityFlavorTextEntries] = useState<AbilityFlavorTextEntry[]>([])
    const [abilityGeneration, setAbilityGeneration] = useState<NamedAPIResource>()
    const [abilityId, setAbilityId] = useState<number>()
    const [abilityIsMainSeries, setAbilityIsMainSeries] = useState<boolean>()
    const [abilityName, setAbilityName] = useState<string>()
    const [abilityNames, setAbilityNames] = useState<AbilityName[]>([])
    const [abilityPokemon, setAbilityPokemon] = useState<AbilityPokemon[]>([])
    const [isAbilityLoading, setIsAbilityLoading] = useState<boolean>(false)
    const [abilityError, setAbilityError] = useState<string | null>(null)

    useEffect(() => {
        const  getAbility = async () => {
            setIsAbilityLoading(true)
            setAbilityError(null)
            try {
                const response = await axios.get<Ability>(abilityUrl)
                setAbilityEffectChanges(response.data.effect_changes)
                setAbilityEffectEntries(response.data.effect_entries)
                setAbilityFlavorTextEntries(response.data.flavor_text_entries)
                setAbilityGeneration(response.data.generation)
                setAbilityId(response.data.id)
                setAbilityIsMainSeries(response.data.is_main_series)
                setAbilityName(response.data.name)
                setAbilityNames(response.data.names)
                setAbilityPokemon(response.data.pokemon)
            } catch (err) {
                setAbilityError('Error fetching data')
            } finally {
                setIsAbilityLoading(false)
            }
        }
        getAbility()
    }, [abilityUrl])

    const getFrenchName = (names: AbilityName[]) => {
        const frenchName = names.find(entry => entry.language.name === 'fr')
        return frenchName ? frenchName.name : ''
    }
    const abilityFrenchName = () => {
        if (abilityNames) {
            return getFrenchName(abilityNames)
        }
        return ''
    }

    return {
        abilityEffectChanges,
        abilityEffectEntries,
        abilityFlavorTextEntries,
        abilityGeneration,
        abilityId,
        abilityIsMainSeries,
        abilityName,
        abilityNames, abilityFrenchName,
        abilityPokemon,
        isAbilityLoading, abilityError
    }
}
export default useGetAbility