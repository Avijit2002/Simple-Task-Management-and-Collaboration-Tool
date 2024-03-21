"use client"

import { useSession } from "next-auth/react"

function page() {

    const { data: session, status } = useSession()

    if (status === "authenticated") {
      return <p>Signed in as {session.user.email}</p>
    }
  
    return <p>Not authenticated</p>
   
}

export default page
