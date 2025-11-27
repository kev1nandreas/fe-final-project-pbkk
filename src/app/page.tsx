"use client"

import { redirect } from "next/navigation"

export default function Main() {
  return(
    <>
      {redirect("/citation-checker/upload-document")}
    </>
  )
}
