'use client'
import { ApiItem } from '@/api/client'
import React, { useEffect, useState } from 'react'
import { ArchiveCard } from './card/card'
import Pagination from './pagination'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
    archive: string
}

export type PathType = {

    id: number,
    archive: string,
    question: string,
    choose: string,
    script: string,
    audio: string,
    explain: string,
    createdAt: Date
}

export const ArchivePath = ({ archive }: Props) => {

    const searchParam = useSearchParams()
    const _page = searchParam.get("page") ? Number(searchParam.get("page")) : 0
    const _limit = 10
    const [_path, set_path] = useState<PathType[]>([])
    // const [_page, set_page] = useState<number>(0)
    const getPath = async (archive: string, page: number, limit: number) => {
        const result = await ApiItem({ archive: "path", archivePlus: archive, skip: page * limit, limit })
        if (result.success) {
            set_path(result.data)
        }
    }
    useEffect(() => {
        getPath(archive, _page, _limit)
    }, [archive, _page, _limit])

    const toPage = useRouter()

    return (
        <div>
            {_path.map((_question, index) => <ArchiveCard key={index} data={_question} />)}
            <Pagination page={_page} prev={() => toPage.push("/" + archive + "?page=" + (_page - 1))} next={() => toPage.push("/" + archive + "?page=" + (_page + 1))} end={_path.length < _limit} />
        </div>
    )
}