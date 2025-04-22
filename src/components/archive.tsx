'use client'
import { ApiItem } from '@/api/client'
import React, { useEffect, useState } from 'react'
import { ArchiveCard, ArchiveWordCard } from './card/card'
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
    audioId: number,
    audio: {
        id: number,
        name: string
    }
    explain: string,
    createdAt: Date
}
export type WordType = {

    id: number,
    name: string,
    mean: string,
    example: string,
    book: string
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
        <div className='max-w-lg m-auto'>
            {_path.length ? _path.map((_question, index) => <ArchiveCard key={index} data={_question} />) : <div className='text-center'>no question for {archive}</div>}
            <Pagination page={_page} prev={() => toPage.push("/" + archive + "?page=" + (_page - 1))} next={() => toPage.push("/" + archive + "?page=" + (_page + 1))} end={_path.length < _limit} />
        </div>
    )
}
export const ArchiveWord = ({ archive }: Props) => {

    const searchParam = useSearchParams()
    const _page = searchParam.get("page") ? Number(searchParam.get("page")) : 0
    const _limit = 10
    const [_word, set_word] = useState<WordType[]>([])
    // const [_page, set_page] = useState<number>(0)
    const getPath = async (archive: string, page: number, limit: number) => {
        const result = await ApiItem({ archive, skip: page * limit, limit })
        if (result.success) {
            set_word(result.data)
        }
    }
    useEffect(() => {
        getPath(archive, _page, _limit)
    }, [archive, _page, _limit])

    const toPage = useRouter()

    return (
        <div className='max-w-lg m-auto'>
            {_word.length ? _word.map((_w, index) => <ArchiveWordCard key={index} data={_w} />) : <div className='text-center'>no question for {archive}</div>}
            <Pagination page={_page} prev={() => toPage.push("/" + archive + "?page=" + (_page - 1))} next={() => toPage.push("/" + archive + "?page=" + (_page + 1))} end={_word.length < _limit} />
        </div>
    )
}