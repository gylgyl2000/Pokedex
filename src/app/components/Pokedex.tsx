"use client"

import useGetPokedex from '@/app/hooks/useGetPokedex';
import Image from 'next/image';
import VersionGroup from './VersionGroup';
import useGetRegion from '../hooks/useGetRegion';

interface PokedexListProps {
    pokedexUrl: string;
}

const Pokedex: React.FC<PokedexListProps> = ({ pokedexUrl }) => {
    const {
        pokedexId,
        pokedexIsMainSeries,
        pokedexName,
        pokedexDescriptions,
        pokedexFrenchDescription,
        pokedexNames,
        pokedexFrenchName,
        pokedexPokemonEntries,
        pokedexRegion,
        pokedexVersionGroup,
        isPokedexLoading, pokedexError
    } = useGetPokedex(pokedexUrl)

    const regionUrl: any = pokedexRegion?.url
    const {regionFrenchName} = useGetRegion(regionUrl)

    const PokedexName =
    pokedexId === 16 ? 'Alola initial' :
    pokedexId === 17 ? 'Mele-Mele initial' :
    pokedexId === 18 ? 'Akala initial' :
    pokedexId === 19 ? 'Ula-Ula initial' :
    pokedexId === 20 ? 'Poni initial' :

    pokedexId === 21 ? 'Alola amélioré' :
    pokedexId === 22 ? 'Mele-Mele amélioré' :
    pokedexId === 23 ? 'Akala amélioré' :
    pokedexId === 24 ? 'Ula-Ula amélioré' :
    pokedexId === 25 ? 'Poni amélioré' :

        pokedexId === 26 ? 'Let\'s Go Kanto' :
        pokedexId === 27 ? 'Galar' :
        pokedexId === 28 ? 'Isolarmure' :
        pokedexId === 29 ? 'Couronneige' :
        pokedexId === 30 ? 'Hisui' :
        pokedexId === 31 ? 'Paldea' :
        pokedexId === 32 ? 'Septentria' :
        pokedexId === 33 ? 'Myrtille' :
        pokedexFrenchName()
    
    const PokedexDescription =
    pokedexId === 12 ? 'Pokédex de Kalos : Centre, dans Pokémon X et Y' :
    pokedexId === 13 ? 'Pokédex de Kalos : Côtes, dans Pokémon X et Y' :
    pokedexId === 14 ? 'Pokédex de Kalos : Monts, dans Pokémon X et Y' :

    pokedexId === 16 ? 'Pokédex régional d\'Alola, dans Soleil et Lune' :
    pokedexId === 17 ? 'Pokédex de Mele-Mele, une île d\'Alola, dans Soleil et Lune' :
    pokedexId === 18 ? 'Pokédex de Akala, une île d\'Alola, dans Soleil et Lune' :
    pokedexId === 19 ? 'Pokédex de Ula-Ula, une île d\'Alola, dans Soleil et Lune' :
    pokedexId === 20 ? 'Pokédex de Poni, une île d\'Alola, dans Soleil et Lune' :

    pokedexId === 21 ? 'Pokédex régional d\'Alola, dans Ultra-Soleil et Ultra-Lune' :
    pokedexId === 22 ? 'Pokédex de Mele-Mele, une île d\'Alola, dans Ultra-Soleil et Ultra-Lune' :
    pokedexId === 23 ? 'Pokédex de Akala, une île d\'Alola, dans Ultra-Soleil et Ultra-Lune' :
    pokedexId === 24 ? 'Pokédex de Ula-Ula, une île d\'Alola, dans Ultra-Soleil et Ultra-Lune' :
    pokedexId === 25 ? 'Pokédex de Poni, une île d\'Alola, dans Ultra-Soleil et Ultra-Lune' :
    
        pokedexId === 26 ? 'Pokédex régional de Kanto, dans Pokémon : Let\'s Go, Pikachu et Let\'s Go, Évoli' :
        pokedexId === 27 ? 'Pokédex régional de Galar, dans Épée et Bouclier' :
        pokedexId === 28 ? 'Pokédex d\'Isolarmure, dans Épée et Bouclier (L\'île solitaire de l\'Armure)' :    
        pokedexId === 29 ? 'Pokédex de Couronneige, dans Épée et Bouclier (Les terres enneigées de la Couronne)' :
        pokedexId === 30 ? 'Pokédex régional de Hisui, dans Légendes Pokémon : Arceus' :
        pokedexId === 31 ? 'Pokédex régional de Paldea dans Écarlate et Violet' :
        pokedexId === 32 ? 'Pokédex régional de Septentria dans Écarlate et Violet (Le Masque Turquoise)' :
        pokedexId === 33 ? 'Pokédex de l\'Institut Myrtille, dans Écarlate et Violet (Le Disque Indigo)' :
        pokedexFrenchDescription()

    if (isPokedexLoading) {
        return <div>Loading...</div>
    }
    if (pokedexError) {
        return <div>{pokedexError}</div>
    }
    return (
        <div className='w-11/12 h-full border border-solid rounded-2xl border-white p-5'>
            <div className='flex flex-row justify-between'>
                <p>#{pokedexId} - <strong>{PokedexName}</strong></p>
                <p><strong>{pokedexPokemonEntries.length}</strong> Pokémon</p>
            </div>
            <Image
                src={
                    pokedexName === 'national' ? 'https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png':
                    pokedexName === 'kanto' ? 'https://www.pokepedia.fr/images/e/e1/Pok%C3%A9dex-RV.png' :
                    pokedexName === 'original-johto' ? 'https://www.pokepedia.fr/images/0/08/Pok%C3%A9dex-OA.png' :
                    pokedexName === 'hoenn' ? 'https://www.pokepedia.fr/images/7/70/Pok%C3%A9dex-RS.png' :
                    pokedexName === 'original-sinnoh' ? 'https://www.pokepedia.fr/images/1/11/Pok%C3%A9dex-DP.png' :
                    pokedexName === 'extended-sinnoh' ? 'https://www.pokepedia.fr/images/0/06/Pok%C3%A9dex-Pt.png' :
                    pokedexName === 'updated-johto' ? 'https://www.pokepedia.fr/images/0/0f/Pok%C3%A9dex_%28H%C3%A9ros%29-HGSS.png' :
                    pokedexName === 'original-unova' ? 'https://www.pokepedia.fr/images/b/ba/Pok%C3%A9dex-NB.png' :
                    pokedexName === 'updated-unova' ? 'https://www.pokepedia.fr/images/b/ba/Pok%C3%A9dex-NB.png' :
                    pokedexName === 'conquest-gallery' ? 'https://www.pokepedia.fr/images/f/fe/Pok%C3%A9mon_Conquest_Recto.png' :
                    pokedexName === 'kalos-central' ? 'https://www.pokepedia.fr/images/5/52/Pok%C3%A9dex-XY.png' :
                    pokedexName === 'kalos-coastal' ? 'https://www.pokepedia.fr/images/5/52/Pok%C3%A9dex-XY.png' :
                    pokedexName === 'kalos-mountain' ? 'https://www.pokepedia.fr/images/5/52/Pok%C3%A9dex-XY.png' :
                    pokedexName === 'updated-hoenn' ? 'https://www.pokepedia.fr/images/6/61/Pok%C3%A9dex-ROSA.png' :
                    pokedexName === 'original-alola' ? 'https://www.pokepedia.fr/images/6/66/Motisma-Dex-SL.png' :
                    pokedexName === 'original-melemele' ? 'https://www.pokepedia.fr/images/6/66/Motisma-Dex-SL.png' :
                    pokedexName === 'original-akala' ? 'https://www.pokepedia.fr/images/6/66/Motisma-Dex-SL.png' :
                    pokedexName === 'original-ulaula' ? 'https://www.pokepedia.fr/images/6/66/Motisma-Dex-SL.png' :
                    pokedexName === 'original-poni' ? 'https://www.pokepedia.fr/images/6/66/Motisma-Dex-SL.png' :
                    pokedexName === 'updated-alola' ? 'https://www.pokepedia.fr/images/6/66/Motisma-Dex-SL.png' :
                    pokedexName === 'updated-melemele' ? 'https://www.pokepedia.fr/images/6/66/Motisma-Dex-SL.png' :
                    pokedexName === 'updated-akala' ? 'https://www.pokepedia.fr/images/6/66/Motisma-Dex-SL.png' :
                    pokedexName === 'updated-ulaula' ? 'https://www.pokepedia.fr/images/6/66/Motisma-Dex-SL.png' :
                    pokedexName === 'updated-poni' ? 'https://www.pokepedia.fr/images/6/66/Motisma-Dex-SL.png' :
                    pokedexName === 'letsgo-kanto' ? 'https://www.pokepedia.fr/images/3/30/Pok%C3%A9dex_%28Pikachu%29-LGPE.png' :
                    pokedexName === 'galar' ? 'https://www.pokepedia.fr/images/2/2f/Motismart-EB.png' :
                    pokedexName === 'isle-of-armor' ? 'https://www.pokepedia.fr/images/2/2f/Motismart-EB.png' :
                    pokedexName === 'crown-tundra' ? 'https://www.pokepedia.fr/images/2/2f/Motismart-EB.png' :
                    pokedexName === 'hisui' ? 'https://www.pokepedia.fr/images/8/8b/Pok%C3%A9dex-LPA.png' :
                    pokedexName === 'paldea' ? 'https://www.pokepedia.fr/images/1/16/Motismart-EV.png' :
                    pokedexName === 'kitakami' ? 'https://www.pokepedia.fr/images/1/16/Motismart-EV.png' :
                    pokedexName === 'blueberry' ? 'https://www.pokepedia.fr/images/1/16/Motismart-EV.png' :
                    'https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png'

                }
                className="mx-auto my-10 max-h-52 w-auto"
                key={pokedexId}
                alt={pokedexName + '_logo'}
                width={200}
                height={200}
                quality={75}
            />
            
            {/* {pokedexFrenchDescription() ? */}
                {/* Description */}
                <p className='mb-4'>{PokedexDescription}</p>
            {/* : ''} */}
            {pokedexRegion !== null
                ? <p className='mb-4'><u>Région</u> : <strong>{regionFrenchName()}</strong></p>
                : ''
            }
            {/* <p>Série principale : {pokedexIsMainSeries ? 'oui' : 'non'}</p> */}
            {pokedexVersionGroup.length !== 0 ?
                <div><u>Groupes de versions</u> : <p>{
                    pokedexVersionGroup.map((entry, index) =>
                        <VersionGroup key={index} versionGroupUrl={entry.url} />
                    )
                }</p></div>
            : ''}
        </div>
    )
}
export default Pokedex