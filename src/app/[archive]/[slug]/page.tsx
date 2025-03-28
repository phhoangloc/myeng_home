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
    const [_nextQuestion, set_NextQuestion] = useState<number>(0)
    const getAllItem = async (archive: string, slug: string) => {
        const result = await ApiItemUser({ position: "user", archive: "path", archivePlus: archive })
        if (result.success) {
            const data = result.data
            set_item(data.filter((d: { id: number }) => d.id === Number(slug))[0])
            set_NextQuestion(data[getRandomInteger(data.length - 1)].id)
        }
    }

    useEffect(() => {
        getAllItem(archive, slug)
    }, [archive, slug])

    return (
        _item ?
            <div className='max-w-xl m-auto'>
                <ItemDetail item={_item} nextQuestion={_nextQuestion} />
            </div> : null
    )
}

export default Page