'use client'
import { DetailBlog, DetailPath } from "@/components/detail"
import { useParams } from "next/navigation"
const Page = () => {
    const params = useParams<{ archive: string, slug: string }>()
    const archive = params.archive

    switch (archive) {
        case "blog":
            return <DetailBlog />

        default:
            return <DetailPath />
    }
}

export default Page