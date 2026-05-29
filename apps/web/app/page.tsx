// import { client } from '@repo/db/client'
import 'dotenv/config'

export default async function Home() {
  // const user = await client.user.findFirst()
  return (
    <div>
      ram is a good student
      {/* {user?.username}
      {user?.password} */}
    </div>
  )
}
