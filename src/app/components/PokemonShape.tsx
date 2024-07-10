import Image from "next/image"
import useGetPokemonShape from "../hooks/useGetPokemonShape"

export default function PokemonShape({ url }: any) {
    const { pokemonShapeId, pokemonShapeName, pokemonShapeFrenchName } = useGetPokemonShape(url)
    return (
        <div>
            <Image
                src={
                    pokemonShapeName === 'ball' ? 'https://www.pokepedia.fr/images/6/6b/Corps_1_HOME.png' :
                    pokemonShapeName === 'squiggle' ? 'https://www.pokepedia.fr/images/3/36/Corps_2_HOME.png' :
                    pokemonShapeName === 'fish' ? 'https://www.pokepedia.fr/images/d/d1/Corps_3_HOME.png' :
                    pokemonShapeName === 'arms' ? 'https://www.pokepedia.fr/images/4/49/Corps_4_HOME.png' :
                    pokemonShapeName === 'blob' ? 'https://www.pokepedia.fr/images/8/87/Corps_5_HOME.png' :
                    pokemonShapeName === 'upright' ? 'https://www.pokepedia.fr/images/d/dd/Corps_6_HOME.png' :
                    pokemonShapeName === 'legs' ? 'https://www.pokepedia.fr/images/4/46/Corps_7_HOME.png' :
                    pokemonShapeName === 'quadruped' ? 'https://www.pokepedia.fr/images/7/72/Corps_8_HOME.png' :
                    pokemonShapeName === 'wings' ? 'https://www.pokepedia.fr/images/3/34/Corps_9_HOME.png' :
                    pokemonShapeName === 'tentacles' ? 'https://www.pokepedia.fr/images/6/60/Corps_10_HOME.png' :
                    pokemonShapeName === 'heads' ? 'https://www.pokepedia.fr/images/9/9c/Corps_11_HOME.png' :
                    pokemonShapeName === 'humanoid' ? 'https://www.pokepedia.fr/images/6/61/Corps_12_HOME.png' :
                    pokemonShapeName === 'bug-wings' ? 'https://www.pokepedia.fr/images/9/95/Corps_13_HOME.png' :
                    pokemonShapeName === 'armor' ? 'https://www.pokepedia.fr/images/c/ce/Corps_14_HOME.png' :
                    'https://www.pokepedia.fr/images/archive/7/7f/20220220194445%21Loupe.png'
                }
                className="mx-auto"
                key={pokemonShapeId}
                alt={pokemonShapeName + '_logo'}
                width={128}
                height={128}
                quality={75}
            />

            <p>{pokemonShapeFrenchName()} </p>
        </div>
    )
}