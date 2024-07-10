import Image from "next/image"
import useGetPokemonHabitat from "../hooks/useGetPokemonHabitat"

export default function PokemonHabitat({ url }: any) {
    const { pokemonHabitatId, pokemonHabitatName, pokemonHabitatFrenchName } = useGetPokemonHabitat(url)
    return (
        <div>
            <Image
                src={
                    pokemonHabitatName === 'cave' ? 'https://www.pokepedia.fr/images/2/21/Miniature_Habitat_Grottes_RFVF.png' :
                    pokemonHabitatName === 'forest' ? 'https://www.pokepedia.fr/images/c/c4/Miniature_Habitat_For%C3%AAts_RFVF.png' :
                    pokemonHabitatName === 'grassland' ? 'https://www.pokepedia.fr/images/d/da/Miniature_Habitat_Champs_RFVF.png' :
                    pokemonHabitatName === 'mountain' ? 'https://www.pokepedia.fr/images/3/3e/Miniature_Habitat_Montagnes_RFVF.png' :
                    pokemonHabitatName === 'rare' ? 'https://www.pokepedia.fr/images/f/fc/Miniature_Habitat_Rares_RFVF.png' :
                    pokemonHabitatName === 'rough-terrain' ? 'https://www.pokepedia.fr/images/1/17/Miniature_Habitat_Milieux_hostiles_RFVF.png' :
                    pokemonHabitatName === 'sea' ? 'https://www.pokepedia.fr/images/f/f6/Miniature_Habitat_Mers_RFVF.png' :
                    pokemonHabitatName === 'urban' ? 'https://www.pokepedia.fr/images/6/67/Miniature_Habitat_Urbains_RFVF.png' :
                    pokemonHabitatName === 'waters-edge' ? 'https://www.pokepedia.fr/images/6/6c/Miniature_Habitat_Mar%C3%A9cages_RFVF.png' :
                    'https://www.pokepedia.fr/images/archive/7/7f/20220220194445%21Loupe.png'
                }
                className="mx-auto"
                key={pokemonHabitatId}
                alt={pokemonHabitatName + '_logo'}
                width={128}
                height={128}
                quality={75}
            />

            <p>{pokemonHabitatFrenchName()} </p>
        </div>
    )
}