import { QuestionType } from '@/app/[archive]/page'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    item: QuestionType,
    nextQuestion?: number
}
type chooseType = {
    id: number,
    name: string,
    question: string,
    answerA: string,
    answerB: string,
    answerC: string,
    answerD: string,
    answer: string,
}
export const ItemArchive = ({ item }: Props) => {

    const toPage = useRouter()

    return (
        <div className="w-full my-4 p-4 shadow-md rounded-xl  font-normal cursor-pointer" onClick={() => toPage.push("/" + item.archive + "/" + item.id)}>
            <div dangerouslySetInnerHTML={{ __html: item?.question }} className=' line-clamp-6'></div>
        </div>
    )
}

export const ItemDetail = ({ item, nextQuestion }: Props) => {
    const [_choose, set_choose] = useState<chooseType[]>([])
    const [_question, set_question] = useState<number>(0)
    const [_answer, set_answer] = useState<string>("")
    const [_qas, set_qas] = useState<string[]>([])
    const [_key, set_key] = useState<number>(0)

    const [_answerOpen, set_answerOpen] = useState<boolean>(false)
    useEffect(() => {
        if (item && item.choose) {
            set_choose(JSON.parse(item.choose))
        }
    }, [item])

    useEffect(() => {
        const newarr = _qas;
        newarr[_question] = _answer
        set_qas(newarr)
        set_key(k => k + 1)
    }, [_answer, _qas, _question])

    const submit = () => {
        set_answerOpen(true)
    }

    const toPage = useRouter()
    return (
        <div className="w-full min-h-24 my-4 p-4 shadow-md rounded-xl  font-bold cursor-pointer bg-white">
            <div dangerouslySetInnerHTML={{ __html: item.question }} className='font-normal'></div>
            <div className="h-6"></div>
            {_choose ?
                _choose.map((_ch, index) => <div key={index} className='font-normal mb-6' onClick={() => set_question(index)}>
                    <div className='font-bold'>{index + 1}. {_ch.question}</div>
                    <div className='flex gap-2' onClick={() => { set_answer("A") }}><input type='radio' defaultChecked={_qas[index] === "A"} key={_key}></input>A. {_ch.answerA}</div>
                    <div className='flex gap-2' onClick={() => { set_answer("B") }}><input type='radio' defaultChecked={_qas[index] === "B"} key={_key}></input>B. {_ch.answerB}</div>
                    <div className='flex gap-2' onClick={() => { set_answer("C") }}><input type='radio' defaultChecked={_qas[index] === "C"} key={_key}></input>C. {_ch.answerC}</div>
                    <div className='flex gap-2' onClick={() => { set_answer("D") }}><input type='radio' defaultChecked={_qas[index] === "D"} key={_key}></input>D. {_ch.answerD}</div>
                </div>) :
                null}
            <div className='bg-title-red px-5 py-1 w-max mb-6 text-white rounded shadow-md' onClick={() => submit()}>submit</div>
            <div className={`${_answerOpen ? "" : "h-0"} overflow-hidden`}>
                <div>answer : </div>
                <div className='font-normal '>
                    {_choose.map((ch, index) => <div className='flex gap-2 h-6' key={index}><p>{ch.id}:</p><p>{ch.answer}</p>{ch.answer === _qas[index] ? <PanoramaFishEyeIcon className='!w-6 !h-6' /> : <CloseIcon className='!w-6 !h-6 text-red-500' />}</div>)}
                </div>
                <div className="h-6"></div>
                <div className='uppercase text-title-red'>explain : </div>
                <div className='font-normal' dangerouslySetInnerHTML={{ __html: item.explain }}>
                </div>
                <div className="flex gap-2">
                    <div className='bg-title-red px-5 py-1 w-max mb-6 text-white rounded shadow-md' onClick={() => { set_answerOpen(false); set_answer("") }}>do again</div>
                    <div className='bg-title-red px-5 py-1 w-max mb-6 text-white rounded shadow-md' onClick={() => { toPage.push("/" + item.archive + "/" + nextQuestion) }}>next question</div>

                </div>
            </div>

        </div>
    )
}