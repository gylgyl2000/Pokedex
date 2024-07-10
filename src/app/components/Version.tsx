"use client"

import useGetVersion from "@/app/hooks/useGetVersion"
import Image from "next/image"

export default function Version({ versionUrl }: any) {
    const {
        versionId,
        versionName,
        versionFrenchName,
    } = useGetVersion(versionUrl)

    return (
        <div className="bg-white w-full p-4 mb-8 text-slate-900">
            <Image
                src={
                    versionName === 'red' ? 'https://www.pokepedia.fr/images/8/8b/Pok%C3%A9mon_Rouge_Recto.png' :
                    versionName === 'blue' ? 'https://www.pokepedia.fr/images/0/05/Pok%C3%A9mon_Bleu_Recto.png' :
                    versionName === 'yellow' ? 'https://www.pokepedia.fr/images/b/b6/Pok%C3%A9mon_Jaune_Recto.png' :
                    versionName === 'gold' ? 'https://www.pokepedia.fr/images/7/72/Jaquette_Pok%C3%A9mon_Or.png' :
                    versionName === 'silver' ? 'https://www.pokepedia.fr/images/8/80/Jaquette_Pok%C3%A9mon_Argent.png' :
                    versionName === 'crystal' ? 'https://www.pokepedia.fr/images/1/13/Pok%C3%A9mon_Cristal_Recto.png' :
                    versionName === 'ruby' ? 'https://www.pokepedia.fr/images/c/c3/Pok%C3%A9mon_Rubis_Recto.png' :
                    versionName === 'sapphire' ? 'https://www.pokepedia.fr/images/3/3f/Pok%C3%A9mon_Saphir_Recto.png' :
                    versionName === 'emerald' ? 'https://www.pokepedia.fr/images/2/24/Pok%C3%A9mon_%C3%89meraude_Recto.png' :
                    versionName === 'firered' ? 'https://www.pokepedia.fr/images/f/f0/Pok%C3%A9mon_Rouge_Feu_Recto.png' :
                    versionName === 'leafgreen' ? 'https://www.pokepedia.fr/images/2/2c/Pok%C3%A9mon_Vert_Feuille_Recto.png' :
                    versionName === 'diamond' ? 'https://www.pokepedia.fr/images/b/b0/Pok%C3%A9mon_Diamant_Recto.png' :
                    versionName === 'pearl' ? 'https://www.pokepedia.fr/images/3/3b/Pok%C3%A9mon_Perle_Recto.png' :
                    versionName === 'platinum' ? 'https://www.pokepedia.fr/images/f/f8/Pok%C3%A9mon_Platine_Recto.png' :
                    versionName === 'heartgold' ? 'https://www.pokepedia.fr/images/a/a8/Pok%C3%A9mon_Or_HeartGold_Recto.png' :
                    versionName === 'soulsilver' ? 'https://www.pokepedia.fr/images/8/82/Pok%C3%A9mon_Argent_SoulSilver_Recto.png' :
                    versionName === 'black' ? 'https://www.pokepedia.fr/images/c/c8/Pok%C3%A9mon_Noir_Recto.png' :
                    versionName === 'white' ? 'https://www.pokepedia.fr/images/c/c0/Pok%C3%A9mon_Blanc_Recto.png' :
                    versionName === 'colosseum' ? 'https://www.pokepedia.fr/images/f/f0/Colosseum_jaquette.jpg' :
                    versionName === 'xd' ? 'https://www.pokepedia.fr/images/7/75/Pkxdgc0f.jpg' :
                    versionName === 'black-2' ? 'https://www.pokepedia.fr/images/8/82/Jaquette_de_Pok%C3%A9mon_version_Noire_2.jpeg' :
                    versionName === 'white-2' ? 'https://www.pokepedia.fr/images/b/b7/Jaquette_de_Pok%C3%A9mon_version_Blanche_2.jpeg' :
                    versionName === 'x' ? 'https://www.pokepedia.fr/images/e/e5/Pok%C3%A9mon_X_-_FR.png' :
                    versionName === 'y' ? 'https://www.pokepedia.fr/images/9/9b/Pok%C3%A9mon_Y_-_FR.png' :
                    versionName === 'omega-ruby' ? 'https://www.pokepedia.fr/images/6/63/Pok%C3%A9mon_Rubis_Om%C3%A9ga_-_FR.png' :
                    versionName === 'alpha-sapphire' ? 'https://www.pokepedia.fr/images/c/c0/Pok%C3%A9mon_Saphir_Alpha_-_FR.png' :
                    versionName === 'sun' ? 'https://www.pokepedia.fr/images/4/40/Pok%C3%A9mon_Soleil_-_FR.png' :
                    versionName === 'moon' ? 'https://www.pokepedia.fr/images/0/0e/Pok%C3%A9mon_Lune_-_FR.png' :
                    versionName === 'ultra-sun' ? 'https://www.pokepedia.fr/images/6/6b/Jaquette_de_Pok%C3%A9mon_Ultra-Soleil.jpg' :
                    versionName === 'ultra-moon' ? 'https://www.pokepedia.fr/images/c/c6/Jaquette_de_Pok%C3%A9mon_Ultra-Lune.jpg' :
                    versionName === 'lets-go-pikachu' ? 'https://www.pokepedia.fr/images/b/bd/Jaquette_de_Pok%C3%A9mon_Let%27s_Go_Pikachu.png' :
                    versionName === 'lets-go-eevee' ? 'https://www.pokepedia.fr/images/1/16/Jaquette_de_Pok%C3%A9mon_Let%27s_Go_%C3%89voli.png' :
                    versionName === 'sword' ? 'https://www.pokepedia.fr/images/f/fc/Jaquette_du_Pass_d%27extension_pour_Pok%C3%A9mon_%C3%89p%C3%A9e.png' :
                    versionName === 'shield' ? 'https://www.pokepedia.fr/images/a/a5/Jaquette_du_Pass_d%27extension_pour_Pok%C3%A9mon_Bouclier.png' :
                    versionName === 'the-isle-of-armor' ? 'https://www.pokepedia.fr/images/6/6f/L%27%C3%AEle_solitaire_de_l%27Armure-EB.png' :
                    versionName === 'the-crown-tundra' ? 'https://www.pokepedia.fr/images/c/c7/Les_terres_enneig%C3%A9es_de_la_Couronne-EB.png' :
                    versionName === 'brilliant-diamond' ? 'https://www.pokepedia.fr/images/8/8e/Jaquette_de_Pok%C3%A9mon_Diamant_%C3%89tincelant.png' :
                    versionName === 'shining-pearl' ? 'https://www.pokepedia.fr/images/6/69/Jaquette_de_Pok%C3%A9mon_Perle_Scintillante.png' :
                    versionName === 'legends-arceus' ? 'https://www.pokepedia.fr/images/0/02/Jaquette_de_L%C3%A9gendes_Pok%C3%A9mon_Arceus.png' :
                    versionName === 'scarlet' ? 'https://www.pokepedia.fr/images/d/dc/Jaquette_de_Pok%C3%A9mon_%C3%89carlate.png' :
                    versionName === 'violet' ? 'https://www.pokepedia.fr/images/1/12/Jaquette_de_Pok%C3%A9mon_Violet.png' :
                    versionName === 'the-teal-mask' ? 'https://www.pokepedia.fr/images/1/1b/Le_Masque_Turquoise-EV.png' :
                    versionName === 'the-indigo-disk' ? 'https://www.pokepedia.fr/images/a/a6/Le_Disque_Indigo-EV.png' :
                    'https://www.pokepedia.fr/images/archive/7/7f/20220220194445%21Loupe.png'
                }
                className="mx-auto"
                key={versionId}
                alt={versionName + '_box'}
                width={250}
                height={250}
                quality={75}
            />

            <div>{versionFrenchName()}</div>
        </div>
    )
}