import Image from "next/image"

export default function Types({ PokemonTypes }: any) {

    const AcierType = () => {
        return <Image
            src='https://www.pokepedia.fr/images/7/77/Miniature_Type_Acier_Site.png'
            alt='acierType'
            className="w-1/2 mr-1"
            width={1000}
            height={1000}
        />
    }
    const CombatType = () => {
        return <Image
            src='https://www.pokepedia.fr/images/f/ff/Miniature_Type_Combat_Site.png'
            alt='combatType'
            className="w-1/2 mr-1"
            width={1000}
            height={1000}
        />
    }
    const DragonType = () => {
        return <Image
            src='https://www.pokepedia.fr/images/b/b4/Miniature_Type_Dragon_Site.png'
            alt='dragonType'
            className="w-1/2 mr-1"
            width={1000}
            height={1000}
        />
    }
    const EauType = () => {
        return <Image
            src='https://www.pokepedia.fr/images/b/ba/Miniature_Type_Eau_Site.png'
            alt='eauType'
            className="w-1/2 mr-1"
            width={1000}
            height={1000}
        />
    }
    const ElectrikType = () => {
        return <Image
            src='https://www.pokepedia.fr/images/d/da/Miniature_Type_%C3%89lectrik_Site.png'
            alt='electrikType'
            className="w-1/2 mr-1"
            width={1000}
            height={1000}
        />
    }
    const FeeType = () => {
        return <Image
            src='https://www.pokepedia.fr/images/a/ad/Miniature_Type_F%C3%A9e_Site.png'
            alt='feeType'
            className="w-1/2 mr-1"
            width={1000}
            height={1000}
        />
    }
    const FeuType = () => {
        return <Image
            src='https://www.pokepedia.fr/images/8/8f/Miniature_Type_Feu_Site.png'
            alt='feuType'
            className="w-1/2 mr-1"
            width={1000}
            height={1000}
        />
    }
    const GlaceType = () => {
        return <Image
            src='https://www.pokepedia.fr/images/b/b7/Miniature_Type_Glace_Site.png'
            alt='glaceType'
            className="w-1/2 mr-1"
            width={1000}
            height={1000}
        />
    }
    const InsecteType = () => {
        return <Image
            src='https://www.pokepedia.fr/images/4/44/Miniature_Type_Insecte_Site.png'
            alt='insecteType'
            className="w-1/2 mr-1"
            width={1000}
            height={1000}
        />
    }
    const NormalType = () => {
        return <Image
            src='https://www.pokepedia.fr/images/0/0b/Miniature_Type_Normal_Site.png'
            alt='nor
            alType'
            className="w-1/2 mr-1"
            width={1000}
            height={1000}
        />
    }
    const PlanteType = () => {
        return <Image
            src='https://www.pokepedia.fr/images/8/8f/Miniature_Type_Plante_Site.png'
            alt='planteType'
            className="w-1/2 mr-1"
            width={1000}
            height={1000}
        />
    }
    const PoisonType = () => {
        return <Image
            src='https://www.pokepedia.fr/images/1/12/Miniature_Type_Poison_Site.png'
            alt='poisonType'
            className="w-1/2 mr-1"
            width={1000}
            height={1000}
        />
    }
    const PsyType = () => {
        return <Image
            src='https://www.pokepedia.fr/images/b/bb/Miniature_Type_Psy_Site.png'
            alt='psyType'
            className="w-1/2 mr-1"
            width={1000}
            height={1000}
        />
    }
    const RocheType = () => {
        return <Image
            src='https://www.pokepedia.fr/images/9/99/Miniature_Type_Roche_Site.png'
            alt='rocheType'
            className="w-1/2 mr-1"
            width={1000}
            height={1000}
        />
    }
    const SolType = () => {
        return <Image
            src='https://www.pokepedia.fr/images/f/f8/Miniature_Type_Sol_Site.png'
            alt='solType'
            className="w-1/2 mr-1"
            width={1000}
            height={1000}
        />
    }
    const SpectreType = () => {
        return <Image
            src='https://www.pokepedia.fr/images/6/64/Miniature_Type_Spectre_Site.png'
            alt='spectreType'
            className="w-1/2 mr-1"
            width={1000}
            height={1000}
        />
    }
    const TenebreType = () => {
        return <Image
            src='https://www.pokepedia.fr/images/9/9f/Miniature_Type_T%C3%A9n%C3%A8bres_Site.png'
            alt='tenebreType'
            className="w-1/2 mr-1"
            width={1000}
            height={1000}
        />
    }
    const VolType = () => {
        return <Image
            src='https://www.pokepedia.fr/images/f/fa/Miniature_Type_Vol_Site.png'
            alt='volType'
            className="w-1/2 mr-1"
            width={1000}
            height={1000}
        />
    }

    return (
        PokemonTypes.map((entry: any, index: any) => (
            // types.type !== undefined ?
                entry.type.name === "grass" ? <PlanteType key={index} /> :
                entry.type.name === "poison" ? <PoisonType /> :
                entry.type.name === "fire" ? <FeuType /> :
                entry.type.name === "water" ? <EauType /> :
                entry.type.name === "flying" ? <VolType /> :
                entry.type.name === "bug" ? <InsecteType /> :
                entry.type.name === "normal" ? <NormalType /> :
                entry.type.name === "electric" ? <ElectrikType /> :
                entry.type.name === "ground" ? <SolType /> :
                entry.type.name === "fairy" ? <FeeType /> :
                entry.type.name === "fighting" ? <CombatType /> :
                entry.type.name === "psychic" ? <PsyType /> :
                entry.type.name === "rock" ? <RocheType /> :
                entry.type.name === "steel" ? <AcierType /> :
                entry.type.name === "ice" ? <GlaceType /> :
                entry.type.name === "ghost" ? <SpectreType /> :
                entry.type.name === "dragon" ? <DragonType /> :
                entry.type.name === "dark" ? <TenebreType /> :
                entry.type.name
            // : ''
        ))
    )
}