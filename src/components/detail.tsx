'use client'
import { ApiItem } from '@/api/client'
import { BlogType } from '@/app/page'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { DetailCard, DetailCardBlog } from './card/card'
import { PathType } from './archive'

export const DetailBlog = () => {
    const params = useParams<{ archive: string, slug: string }>()
    const archive = params.archive
    const slug = params.slug

    const [_blog, set_blog] = useState<BlogType | undefined>()
    const [_refresh, set_refresh] = useState<number>(0)
    const getOneBlog = async (archive: string, slug: string) => {
        const result = await ApiItem({ archive, slug })
        if (result.success) {
            set_blog(result.data[0])
        }
    }

    useEffect(() => {
        getOneBlog(archive, slug)
    }, [archive, slug, _refresh])


    return (
        <DetailCardBlog data={_blog} refresh={() => set_refresh(n => n + 1)} />
    )
}
export const DetailPath = () => {
    const params = useParams<{ archive: string, slug: string }>()
    const archive = params.archive
    const slug = params.slug

    const [_path, set_path] = useState<PathType | undefined>()
    const getOnePath = async (archive: string, slug: string) => {
        const result = await ApiItem({ archive: "path", archivePlus: archive, id: slug })
        if (result.success) {
            set_path(result.data[0])
        }
    }

    useEffect(() => {
        getOnePath(archive, slug)
    }, [archive, slug])

    return (
        <DetailCard data={_path} />
    )
}