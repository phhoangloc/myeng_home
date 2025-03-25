'use client'

import { useRouter } from "next/navigation";

const toeicPath = [
  {
    name: "pathone",
  },
  {
    name: "pathtwo",
  },
  {
    name: "paththree",
  },
  {
    name: "pathfour",
  },
  {
    name: "pathfive",
  },
  {
    name: "pathsix",
  },
  {
    name: "pathseven",
  },

]

export default function Home() {

  const toPage = useRouter()
  return (
    <div className="w-full">
      <div className="text-center h-24 flex flex-col justify-center text-2xl font-bold text-title-red">
        What path do you want to pratice?
      </div>
      <div className="w-full max-w-lg m-auto flex flex-wrap justify-center gap-4">
        {
          toeicPath.map((p, index) =>
            <div key={index} className="w-52 aspect-[2/3] shadow-md flex flex-col justify-center text-center rounded-xl text-title-red font-bold cursor-pointer" onClick={() => toPage.push("/" + p.name)}>
              PATH {index + 1}
            </div>)
        }
      </div>
    </div>
  );
}
