import useGetVersionGroup from "../hooks/useGetVersionGroup";

export default function VersionGroup({ versionGroupUrl }: any) {
    const { versionGroupName } = useGetVersionGroup(versionGroupUrl)

    return (
        <span className="w-max inline-block text-xs border border-solid rounded-xl border-white mr-2 my-2 py-1 px-2">
            {
                versionGroupName === 'red-blue' ? 'Rouge et Bleu' :
                versionGroupName === 'yellow' ? 'Jaune':
                versionGroupName === 'gold-silver' ? 'Or et Argent' :
                versionGroupName === 'crystal' ? 'Cristal' :
                versionGroupName === 'ruby-sapphire' ? 'Rubis et Saphir' :
                versionGroupName === 'emerald' ? 'Émeraude' :
                versionGroupName === 'firered-leafgreen' ? 'Rouge Feu et Vert Feuille' :
                versionGroupName === 'diamond-pearl' ? 'Diamant et Perle' :
                versionGroupName === 'platinum' ? 'Platine' :
                versionGroupName === 'heartgold-soulsilver' ? 'Or HeartGold et Argent SoulSilver' :
                versionGroupName === 'black-white' ? 'Noir et Blanc' :
                versionGroupName === 'colosseum' ? 'Colosseum' :
                versionGroupName === 'xd' ? 'XD' :
                versionGroupName === 'black-2-white-2' ? 'Noir 2 et Blanc 2' :
                versionGroupName === 'x-y' ? 'X et Y' :
                versionGroupName === 'omega-ruby-alpha-sapphire' ? 'Rubis Oméga et Saphir Alpha' :
                versionGroupName === 'sun-moon' ? 'Soleil et Lune' :
                versionGroupName === 'ultra-sun-ultra-moon' ? 'Ultra-Soleil et Ultra-Lune' :
                versionGroupName === 'lets-go-pikachu-lets-go-eevee' ? 'Let\'s Go, Pikachu et Let\'s Go, Évoli' :
                versionGroupName === 'sword-shield' ? 'Épée et Bouclier' :
                versionGroupName === 'the-isle-of-armor' ? 'L\'île solitaire de l\'Armure' :
                versionGroupName === 'the-crown-tundra' ? 'Les terres enneigées de la Couronne' :
                versionGroupName === 'brilliant-diamond-and-shining-pearl' ? 'Diamant Étincelant et Perle Scintillante' :
                versionGroupName === 'legends-arceus' ? 'Légendes Pokémon : Arceus' :
                versionGroupName === 'scarlet-violet' ? 'Écarlate et Violet' :
                versionGroupName === 'the-teal-mask' ? 'Le masque turquoise' :
                versionGroupName === 'the-indigo-disk' ? 'Le disque indigo' :
                versionGroupName
            }
        </span>
    )
}