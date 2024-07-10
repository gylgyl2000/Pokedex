import axios from 'axios'

interface NamedAPIResource {
    name: string
    url: string
    [property: string]: any;
}

interface APIResourceList {
    count: number
    next: null | string
    previous: null | string
    results: NamedAPIResource[]
    [property: string]: any;
}
const getPokemonSpeciesList = async (offset: number, limit: number) => {
    const response = await axios.get<APIResourceList>(`
        https://pokeapi.co/api/v2/pokemon-species/?offset=${offset}&limit=${limit}
    `);
    const results = response.data.results
    return results

}
export default getPokemonSpeciesList