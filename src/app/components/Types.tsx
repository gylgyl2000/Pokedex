import Image from "next/image"

export default function Types({ PokemonTypes }: any) {

    return (
        PokemonTypes.map((entry: any, index :any) => (
            <Image
                key={index}
                src={
                    entry.type.name === 'steel' ? 'https://www.pokepedia.fr/images/7/77/Miniature_Type_Acier_Site.png' :
                    entry.type.name === 'fighting' ? 'https://www.pokepedia.fr/images/f/ff/Miniature_Type_Combat_Site.png' :
                    entry.type.name === 'dragon' ? 'https://www.pokepedia.fr/images/b/b4/Miniature_Type_Dragon_Site.png' :
                    entry.type.name === 'water' ? 'https://www.pokepedia.fr/images/b/ba/Miniature_Type_Eau_Site.png' :
                    entry.type.name === 'electric' ? 'https://www.pokepedia.fr/images/d/da/Miniature_Type_%C3%89lectrik_Site.png' :
                    entry.type.name === 'fairy' ? 'https://www.pokepedia.fr/images/a/ad/Miniature_Type_F%C3%A9e_Site.png' :
                    entry.type.name === 'fire' ? 'https://www.pokepedia.fr/images/8/8f/Miniature_Type_Feu_Site.png' :
                    entry.type.name === 'ice' ? 'https://www.pokepedia.fr/images/b/b7/Miniature_Type_Glace_Site.png' :
                    entry.type.name === 'bug' ? 'https://www.pokepedia.fr/images/4/44/Miniature_Type_Insecte_Site.png' :
                    entry.type.name === 'normal' ? 'https://www.pokepedia.fr/images/0/0b/Miniature_Type_Normal_Site.png' :
                    entry.type.name === 'grass' ? 'https://www.pokepedia.fr/images/8/8f/Miniature_Type_Plante_Site.png' :
                    entry.type.name === 'poison' ? 'https://www.pokepedia.fr/images/1/12/Miniature_Type_Poison_Site.png' :
                    entry.type.name === 'psychic' ? 'https://www.pokepedia.fr/images/b/bb/Miniature_Type_Psy_Site.png' :
                    entry.type.name === 'rock' ? 'https://www.pokepedia.fr/images/9/99/Miniature_Type_Roche_Site.png' :
                    entry.type.name === 'ground' ? 'https://www.pokepedia.fr/images/f/f8/Miniature_Type_Sol_Site.png' :
                    entry.type.name === 'ghost' ? 'https://www.pokepedia.fr/images/6/64/Miniature_Type_Spectre_Site.png' :
                    entry.type.name === 'dark' ? 'https://www.pokepedia.fr/images/9/9f/Miniature_Type_T%C3%A9n%C3%A8bres_Site.png' :
                    entry.type.name === 'flying' ? 'https://www.pokepedia.fr/images/f/fa/Miniature_Type_Vol_Site.png' :
                    ''
                    // data.find(value => {if(value.name === entry.name){ return value.url}})
                }
                alt={entry.type.name}
                className="w-1/2 mr-1"
                width={1000}
                height={1000}
                quality={75}
            />
        ))
    )
}
