import { getServerAuthSession } from "~/server/auth"


async function page() {
  const session =await getServerAuthSession()
   console.log(session)
  
    return <p>Dashboard</p>
   
}

export default page
