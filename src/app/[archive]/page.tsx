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
    const getItem = async (archive: string) => {
        const result = await ApiItemUser({ position: "user", archive: "path", archivePlus: archive })
        if (result.success) {
            set_items(result.data)
        }
    }
    useEffect(() => {
        getItem(archive)
    }, [archive])

    const randomArray = new Array(10).fill(0).map(() => getRandomInteger(_items.length));
    console.log(randomArray)
    const newArr = randomArray.map(value => {
        const result = _items.filter(item => item.id === value)
        return result
    })
    console.log(newArr)
    return (
        <div >
            <div className='max-w-xl m-auto'>
                <div className='text-2xl text-center h-24 flex flex-col justify-center text-title-red font-bold'>{archive.toUpperCase()}</div>
                {_items.map((item, index) => <ItemArchive item={item} key={index} />)}
            </div>

        </div>
    )
}

export default Page