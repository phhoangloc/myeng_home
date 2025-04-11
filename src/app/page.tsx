'use client'

import { UserType } from "@/redux/reducer/UserReduce"
import store from "@/redux/store"
import { TextAreaTool } from "@/tool/input/textarea"
import { Button } from "@/tool/button/button"
import { useEffect, useState } from "react"
import { ApiCreateItem } from "@/api/user"
import moment from "moment"
import { ApiItem } from "@/api/client"
import { ArchiveCardBlog } from "@/components/card/card"
export type BlogType =
  {
    archive: string
    censor: boolean
    content: string,
    createdAt: Date,
    hostId: number,
    host: { id: number, username: string },
    id: number,
    slug: string,
    updateDate: string
  }
export default function Home() {
  const [currentUser, setCurrentUser] = useState<UserType>(store.getState().user)
  const update = () => {
    store.subscribe(() => setCurrentUser(store.getState().user))

  }
  useEffect(() => {
    update()
  })

  const [_detail, set_detail] = useState<string>("")
  const [_refresh, set_refresh] = useState<number>(0)
  const body = {
    content: _detail,
    slug: moment(Date()).format("YYYYMMDDhhmmss")
  }
  const [_blogs, set_blogs] = useState<BlogType[]>([])

  const getBlog = async (archive: string) => {
    const result = await ApiItem({ archive })
    if (result.success) {
      set_blogs(result.data)
    }
  }
  useEffect(() => {
    getBlog("blog")
  }, [_refresh])
  const createBlog = async (position: string, archive: string, body: { content: string, slug: string }) => {
    const result = await ApiCreateItem({ position, archive }, body)
    if (result.success) {
      set_refresh(n => n + 1)
    }
  }

  console.log(_detail)
  return (
    <div className=" w-full min-h-full flex flex-col gap-4">
      <div className="h-12 bg-white rounded">
      </div>
      <div>
        <div className="w-full min-h-72 bg-white rounded p-2 shadow">
          <TextAreaTool onChange={(v) => set_detail(v)} value={""} sx="border-none min-h-72 w-full dangerous_box" />
          <div className="font-bold h-12 flex justify-between px-2 border-t border-slate-200">
            <div className="flex flex-col justify-center">{currentUser.username}</div>
            <Button onClick={() => createBlog(currentUser.position, "blog", body)} name="post" sx=" uppercase text-sm !bg-slate-500 !w-max !h-max px-4 py-1 block cursor-pointer my-auto" disable={_detail === "<p><br></p>" ? true : false}></Button>
          </div>        </div>
      </div>
      <div className="h-12">

      </div>
      {
        _blogs.map((blog, index) => <ArchiveCardBlog key={index} {...blog} />)
      }
    </div>
  );
}
