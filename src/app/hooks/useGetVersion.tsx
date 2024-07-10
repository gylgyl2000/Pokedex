import { useState, useEffect } from 'react'
import axios from 'axios'

/** Versions des jeux, par exemple Rouge, Bleu ou Jaune. */

interface NamedAPIResource {
    name: string
    url: string
    [property: string]: any;
}

interface VersionName {
    language: NamedAPIResource;
    name: string;
    [property: string]: any;
}

interface Version {
    id: number; /** L'identifiant de cette ressource. */
    name: string; /** Le nom de cette ressource. */
    names: VersionName[]; /** Le nom de cette ressource répertorié dans différentes langues. */
    version_group: NamedAPIResource; /** Le groupe de versions auquel appartient cette version. */
    [property: string]: any;
}

const useGetVersion = (versionUrl: string) => {
    const [versionId, setVersionId] = useState<number>(0)
    const [versionName, setVersionName] = useState<string>('')
    const [versionNames, setVersionNames] = useState<VersionName[]>([]);
    const [versionVersionGroup, setVersionVersionGroup] = useState<NamedAPIResource>();
    const [isVersionLoading, setIsVersionLoading] = useState<boolean>(false)
    const [versionError, setVersionError] = useState<string | null>(null)

    useEffect(() => {
        const getVersion = async () => {
            setIsVersionLoading(true)
            setVersionError(null)
            try {
                const response = await axios.get<Version>(versionUrl)
                setVersionId(response.data.id)
                setVersionName(response.data.name)
                setVersionNames(response.data.names)
                setVersionVersionGroup(response.data.version_group)
            } catch (err) {
                setVersionError('Error fetching data')
            } finally {
                setIsVersionLoading(false)
            }
        }
        getVersion()
    }, [versionUrl])

    const getFrenchName = (names: VersionName[]) => {
        const frenchName = names.find(entry => entry.language.name === 'fr')
        return frenchName ? frenchName.name : ''
    }
    const versionFrenchName = () => {
        if (versionNames) {
            return getFrenchName(versionNames)
        }
        return ''
    }

    return {
        versionId,
        versionName,
        versionNames,
        versionFrenchName,
        versionVersionGroup,
        isVersionLoading, versionError
    }
}
export default useGetVersion