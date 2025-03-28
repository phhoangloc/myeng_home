'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ApiItemUser } from '@/api/user'
import { ItemArchive } from '@/component/item'
import { getRandomInteger } from '@/tool/function'
export type ItemType = {
    id: number,
    archive: string,
    name: string,
    mean: string,
    example?: string,
    book?: string,
    createdAt: Date
}
export type QuestionType = {
    id: 1,
    archive: string,
    question: string,
    choose: string,
    answer: string,
    questionTran: string,
    answerTran: string,
    explain: string,
    createdAt: Date
}
const Page = () => {
    const params = useParams<{ archive: string }>()
    const archive = params.archive

    const [_items, set_items] = useState<QuestionType[]>([])
    const [_newItems, set_newItems] = useState<QuestionType[]>([])
    const getItem = async (archive: string) => {
        const result = await ApiItemUser({ position: "user", archive: "path", archivePlus: archive })
        if (result.success) {
            set_items(result.data)
        }
    }
    useEffect(() => {
        getItem(archive)
    }, [archive])

    useEffect(() => {
        // const randomArray = _items.map(() => getRandomInteger(_items.length));
        const randomArray = new Array(20).fill(0).map(() => _items[getRandomInteger(_items.length - 1)]);
        if (_items.length) {
            set_newItems(randomArray)
        }
    }, [_items])

    return (
        <div >
            <div className='max-w-lg m-auto'>
                <div className='text-2xl text-center h-24 flex flex-col justify-center text-title-red font-bold'>{archive.toUpperCase()}</div>
                {_newItems.length ? _newItems.map((item, index) => <ItemArchive item={item} key={index} />) : null}
            </div>

        </div>
    )
}

export default Page