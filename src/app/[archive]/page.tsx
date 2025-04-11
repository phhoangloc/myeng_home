'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { ArchivePath } from '@/components/archive'
const Page = () => {
    const params = useParams<{ archive: string }>()
    const archive = params.archive

    switch (archive) {
        case "blog":
            return (<div>Blog</div>)
    }
    return (
        <ArchivePath archive={archive} />
    )
}

export default Page