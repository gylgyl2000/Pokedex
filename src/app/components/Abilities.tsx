import useGetAbility from "../hooks/useGetAbility"

export default function Abilities({ url }: any) {
    const { abilityFrenchName } = useGetAbility(url)
    return (
        <span>{abilityFrenchName()} </span>
    )
}