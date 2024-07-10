import useGetPokemonColor from "../hooks/useGetPokemonColor"

export default function PokemonColor({ url }: any) {
    const { pokemonColorFrenchName } = useGetPokemonColor(url)
    return (
        <span>{pokemonColorFrenchName()} </span>
    )
}