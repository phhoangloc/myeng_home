'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ItemDetail } from '@/component/item'
import { QuestionType } from '../page'
import { ApiItemUser } from '@/api/user'
import { getRandomInteger } from '@/tool/function'
const Page = () => {
    const param = useParams<{ archive: string, slug: string }>()
    const archive = param.archive
    const slug = param.slug
    const [_item, set_item] = useState<QuestionType>()
    const [_lastQuestion, set_lastQuestion] = useState<number>(0)
    const getItem = async (archive: string, slug: string) => {
        const result = await ApiItemUser({ position: "user", archive: "path", archivePlus: archive, id: Number(slug) })
        if (result.success) {
            set_item(result.data[0])
        }
    }
    const getAllItem = async (archive: string) => {
        const result = await ApiItemUser({ position: "user", archive: "path", archivePlus: archive })
        if (result.success) {
            set_lastQuestion(result.data.length)
        }
    }
    useEffect(() => {
        getItem(archive, slug)
    }, [archive, slug])

    useEffect(() => {
        getAllItem(archive)
    }, [archive])


    return (
        _item ?
            <div className='max-w-xl m-auto'>
                <ItemDetail item={_item} nextQuestion={_lastQuestion ? getRandomInteger(_lastQuestion) : _item.id} />
            </div> : null
    )
}

export default Page