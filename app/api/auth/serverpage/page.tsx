import { getServerSession } from "next-auth"
import authOptions from "../[...nextauth]/options"

const page = async () => {
  const session = await getServerSession(authOptions)
  console.log(session)

  return (
    <div>
      {session?.user?.name}
    </div>
  )
}

export default page