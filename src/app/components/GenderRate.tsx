export default function GenderRate({ rate }: any ) {
    const Rate = rate
    const femaleGender = Rate / 8 * 100
    const maleGender = 100 - femaleGender
    return (
        <span>{femaleGender}% femelle, {maleGender}% mâle </span>
    )
}