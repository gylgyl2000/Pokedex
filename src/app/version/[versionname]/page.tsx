"use client"

import useGetGeneration from "@/app/hooks/useGetGeneration";
import useGetPokedex from "@/app/hooks/useGetPokedex";
import useGetVersion from "@/app/hooks/useGetVersion";
import useGetVersionGroup from "@/app/hooks/useGetVersionGroup";
import useGetVersionList from "@/app/hooks/useGetVersionList"

interface NamedAPIResource {
    name: string
    url: any
    [property: string]: any;
}

export default function PokedexVersionHome({
    params : { versionname },
}: {
    params: { versionname: string }
}) {
    const { versionList } = useGetVersionList()

    const getVersionByName = (name: NamedAPIResource[], entryName: string) => {
        const versionName = name.find(entry => entry.name === entryName)
        return versionName?.url
    }

    const {
        versionId,
        versionName,
        versionNames,
        versionFrenchName,
        versionVersionGroup,
        isVersionLoading, versionError
    } = useGetVersion(getVersionByName(versionList, versionname))
    // console.log(versionVersionGroup)
    
    const versionGroupUrl: any = versionVersionGroup?.url

    const {
        versionGroupGeneration,
        versionGroupId,
        versionGroupMoveLearnMethods,
        versionGroupName,
        versionGroupOrder,
        versionGroupPokedexes,
        versionGroupRegions,
        versionGroupVersions
    } = useGetVersionGroup(versionGroupUrl)

    const generationUrl: any = versionGroupGeneration?.url
    const { generationFrenchName } = useGetGeneration(generationUrl)

    const PokedexFrenchName = ({ pokedexUrl, key }: any) => {
        const { pokedexFrenchName } = useGetPokedex(pokedexUrl)
        return (
            <span key={key}>{pokedexFrenchName()} </span>
        )
    }

    if (isVersionLoading) {
        return <div>Loading...</div>
    }
    if (versionError) {
        return <div>{versionError}</div>
    }

    return (
        <main className="p-24">
            <div className="w-full font-mono text-sm">
            <h1 className='w-full border border-solid rounded-2xl border-white text-center text-3xl py-5 mb-5'>
                Version {versionFrenchName()}
            </h1>
            <div>
                <p>Génération : {generationFrenchName()}</p>
                <p>Groupe de versions : {versionGroupName}</p>
                <p>Pokédex : {versionGroupPokedexes.map((entry, index) =>
                    <PokedexFrenchName pokedexUrl={entry.url} key={index} />
                    // <span key={index}>{entry.name} </span>
                )}
                </p>
                <p>Région : {versionGroupRegions.map((entry, index) =>
                    <span key={index}>{entry.name} </span>)}
                </p>

            </div>

            </div>
        </main>
    )
}