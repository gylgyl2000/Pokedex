"use client"

import React from 'react';
import useGetVersionList from '@/app/hooks/useGetVersionList'
import Version from '@/app/components/Version';
import Link from 'next/link';

const VersionList: React.FC = () => {
    const { versionList, isVersionListLoading, versionListError } = useGetVersionList()
    // console.log(VersionList)
    if (isVersionListLoading) {
        return <div>Loading...</div>
    }
    if (versionListError) {
        return <div>{versionListError}</div>
    }
    return (
        <main className="p-24">
            <h1 className='w-full border border-solid rounded-2xl border-white text-center text-3xl py-5 mb-5'>
                Les versions
            </h1>
        <div className='flex flex-row flex-wrap justify-between'>
            {versionList.map((entry, index) => (
                <Link href={`/version/${entry.name}`} key={index} className='m-2 w-1/6'>
                    <Version versionUrl={entry.url} />
                </Link>
            ))}
            
        </div>
        </main>
    )
}
export default VersionList