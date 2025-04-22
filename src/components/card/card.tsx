import React, { useState, useEffect } from 'react'
import { Button } from '@/tool/button/button'
import { BlogType } from '@/app/page'
import { useRouter } from 'next/navigation'
import { UserType } from '@/redux/reducer/UserReduce'
import store from '@/redux/store'
import { ApiDeleteItem, ApiUpdateItem } from '@/api/user'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { TextAreaTool } from '@/tool/input/textarea'
import { PathType, WordType } from '../archive'
import { ApiItem } from '@/api/client'

type Props = {
    data: BlogType | undefined, refresh: () => void
}
export const ArchiveCardBlog = (data: BlogType) => {

    const toPage = useRouter()
    return (
        <div className="bg-white rounded shadow-md" >
            <div className="font-bold h-12 flex flex-col justify-center p-2 border-b border-bgr text-main">{data.host.username}</div>
            <div className="h-max px-4 overflow-hidden dangerous_blog line-clamp-[9] my-4 " dangerouslySetInnerHTML={{ __html: data.content }} />
            <div className="h-6 border-b border-bgr"></div>
            <div className="font-bold h-12 flex justify-between p-2">
                <div className="flex flex-col justify-center"></div>
                <Button onClick={() => toPage.push("/" + data.archive + "/" + data.slug)} name="read" sx=" uppercase text-sm !bg-main !w-max !h-max px-4 py-1 block cursor-pointer my-auto"></Button></div>
        </div>
    )
}

export const DetailCardBlog = ({ data, refresh }: Props) => {

    const [currentUser, setCurrentUser] = useState<UserType>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))

    }
    useEffect(() => {
        update()
    })
    const [_isEdit, set_isEdit] = useState<boolean>(false)
    const [_content, set_content] = useState<string>("")

    const toPage = useRouter()
    const updateBlog = async (position: string, archive: string, body: { content: string }, id: number) => {
        const result = await ApiUpdateItem({ position, archive, id }, body)
        if (result.success) {
            refresh()
            set_isEdit(false)
        }
    }
    const deleteBlog = async (position: string, archive: string, id: number) => {
        const result = await ApiDeleteItem({ position, archive, id })
        if (result.success) {
            toPage.push("/")
            set_isEdit(false)
        }
    }
    return (
        data ?
            <div className='bg-white shadow rounded max-w-lg m-auto'>
                <div className='h-12 flex justify-between  border-b border-bgr font-bold px-2 text-main'>
                    <div className='flex flex-col justify-center '>
                        {data?.host.username}
                    </div>
                    <div className='flex'>
                        {currentUser.id === data?.hostId ? _isEdit ?
                            <SaveIcon className='!w-8 !h-8 p-1  m-auto' onClick={() => updateBlog(currentUser.position, data.archive, { content: _content }, data.id)} /> :
                            <EditIcon className='!w-8 !h-8 p-1  m-auto' onClick={() => set_isEdit(true)} /> : null}
                        {currentUser.id === data?.hostId ?
                            <DeleteIcon className='!w-8 !h-8 p-1  m-auto' onClick={() => deleteBlog(currentUser.position, data.archive, data.id)} /> : null}
                    </div>
                </div>
                {!_isEdit ? <div className='py-2 px-4 min-h-96 border-b border-bgr dangerous_blog' dangerouslySetInnerHTML={{ __html: data ? data.content : "" }}>
                </div> : <TextAreaTool onChange={(v) => set_content(v)} value={data ? data.content : ""} sx='min-h-96 border-none' />}
                <div className='h-12 flex justify-between border-b border-bgr font-bold px-2 text-main'>
                    <div className='w-1/2 flex flex-col justify-center text-center'>like</div>
                    <div className='w-0.5 h-1/2 bg-bgr m-auto'></div>
                    <div className='w-1/2 flex flex-col justify-center text-center'>comment</div>
                </div>
            </div> :
            null
    )
}

type chooseType = {
    answer: string,
    answerA: string,
    answerB: string,
    answerC: string,
    answerD: string,
    id: number,
    name: string
    question: string
}
export const ArchiveCard = ({ data }: { data: PathType }) => {
    const toPage = useRouter()
    const choose = JSON.parse(data.choose)


    return (
        <div className=" rounded shadow flex flex-col gap-[2px] my-4 overflow-hidden" >
            {/* <div className=" bg-white font-bold h-12 flex flex-col justify-center p-2"></div> */}
            <div className="bg-white p-4">
                <div className=" dangerous_box mb-8 pb-8 border-b border-bgr" dangerouslySetInnerHTML={{ __html: data.question }} />
                {
                    choose.map((_choose: chooseType, index: number) => <div key={index} className='mb-4'>
                        {_choose.question ?
                            <div className='font-semibold'>
                                {_choose.question}
                            </div> : null
                        }
                        <div>
                            A. {_choose.answerA}
                        </div>
                        <div>
                            B. {_choose.answerB}
                        </div>
                        <div>

                            C. {_choose.answerC}
                        </div>
                        <div>

                            D. {_choose.answerD}
                        </div>
                    </div>)
                }

            </div>
            <div className="bg-white font-bold h-12 flex justify-between p-2">
                <div className="flex flex-col justify-center"></div>
                <Button onClick={() => toPage.push("/" + data.archive + "/" + data.id)} name="do test" sx=" uppercase text-sm !bg-main !w-max !h-max px-4 py-1 block cursor-pointer my-auto"></Button></div>
        </div>
    )
}
export const DetailCard = ({ data }: { data: PathType | undefined }) => {
    const choose = data ? JSON.parse(data.choose) : []

    const [_yourAnswer, set_yourAnswer] = useState<string[]>([])

    const [_index, set_index] = useState<number>(-1)
    const [_value, set_value] = useState<string>("")
    const [_refresh, set_refresh] = useState<number>(0)

    useEffect(() => {
        if (_index > -1) {
            const emptyStrings = _yourAnswer
            emptyStrings[_index] = _value
            set_yourAnswer(emptyStrings)
            set_refresh(r => r + 1)
        }
    }, [_index, _value, _yourAnswer])

    const [_isSubmit, set_isSubmit] = useState<boolean>(false)
    useEffect(() => {
        if (!_isSubmit) {
            set_yourAnswer([])
            set_index(-1)
        }
    }, [_isSubmit])

    const toPage = useRouter()
    const getOnePath = async (archive: string) => {
        const result = await ApiItem({ archive: "path", archivePlus: archive })
        if (result.success) {
            toPage.push("/" + (result.data[Math.floor(Math.random() * result.data.length)].archive + "/" + (result.data[Math.floor(Math.random() * result.data.length)].id)))
        }
    }

    console.log(data)

    return (
        data ?
            <div className=" flex flex-col gap-4 py-4 " >
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="rounded shadow bg-white p-4 xl:w-2/3 ">
                        <div className=" dangerous_box pb-8 border-bgr" dangerouslySetInnerHTML={{ __html: data.question }} />
                        {data.audio.id ? <audio className='w-full' src={process.env.ftp_url + data.audio.name} controls /> : null}
                    </div>
                    <div className="rounded shadow bg-white p-4 xl:w-1/3 h-max">
                        {
                            choose.map((_choose: chooseType, index: number) =>
                                <div key={index} className='mb-4'>
                                    {_choose.question ?
                                        <div className='font-semibold'>
                                            {_choose.question}
                                        </div> : null
                                    }
                                    <div key={_refresh + 1}>
                                        <input type='radio' checked={_yourAnswer[index] === "A"} onChange={() => { set_index(index); set_value("A") }} ></input> A{_choose.answerA}
                                    </div>
                                    <div key={_refresh + 2}>
                                        <input type='radio' checked={_yourAnswer[index] === "B"} onChange={() => { set_index(index); set_value("B") }} ></input> B {_choose.answerB}
                                    </div>
                                    <div key={_refresh + 3}>
                                        <input type='radio' checked={_yourAnswer[index] === "C"} onChange={() => { set_index(index); set_value("C") }} ></input> C {_choose.answerC}
                                    </div>
                                    <div key={_refresh + 4}>
                                        <input type='radio' checked={_yourAnswer[index] === "D"} onChange={() => { set_index(index); set_value("D") }} ></input> D {_choose.answerD}
                                    </div>
                                </div>)
                        }
                        <div className=" font-bold h-12 flex justify-between p-2">
                            <div className="flex flex-col justify-center"></div>
                            <Button onClick={() => set_isSubmit(true)} name="submit" sx=" uppercase text-sm !bg-main !w-max !h-max px-4 py-1 block cursor-pointer my-auto"></Button>
                        </div>
                    </div>
                </div>

                {_isSubmit ?
                    <div className="p-2 bg-white rounded shadow">

                        <div className='font-bold'>your anwser</div>
                        {
                            choose.map((ch: { answer: string }, index: number) =>
                                <div key={index}>{index + 1}. {_yourAnswer[index] ? _yourAnswer[index] : "X"} <span>{ch.answer === _yourAnswer[index] ? "true" : "false"}</span></div>)
                        }
                        <div className='mt-6 font-bold'>correct anwser</div>
                        {
                            choose.map((ch: { answer: string }, index: number) =>
                                <div key={index}>{index + 1}. {ch.answer} </div>)
                        }
                        <div className='dangerous_box mt-6' dangerouslySetInnerHTML={{ __html: data.explain }}></div>
                        <div className=" h-12 flex justify-between p-2">
                            {/* <div className="flex flex-col justify-center"></div> */}
                            <Button onClick={() => set_isSubmit(false)} name="do it again" sx=" uppercase text-sm !bg-main !w-max !h-max px-4 py-1 block cursor-pointer my-auto"></Button>
                            <Button onClick={() => getOnePath(data.archive)} name="next question" sx=" uppercase text-sm !bg-main !w-max !h-max px-4 py-1 block cursor-pointer my-auto"></Button>
                        </div>
                    </div > : null
                }

            </div >
            : null
    )
}
export const ArchiveWordCard = ({ data }: { data: WordType }) => {


    return (
        <div className="bg-white rounded shadow flex flex-col p-2 my-4 overflow-hidden" >
            <div className='font-semibold text-main'>{data.name}</div>
            <div>{data.mean}</div>
            <div className='italic pt-4' dangerouslySetInnerHTML={{ __html: data.example }}></div>
        </div>
    )
}