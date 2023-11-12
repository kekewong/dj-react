import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

type EditUserData = {
  id: number
  username: string
  name: string
  phoneNo: string
  password: string
  isActive: boolean
}

type EditUserResp = {
  id: number
  username: string
  name: string
  phoneNo: string
  password: string
  isActive: boolean
}

const EditUserPage = () => {
  const [user, setUser] = useState<EditUserData>({})
  const router = useRouter()
  const a = router.query.slug

  debugger

  useEffect(() => {
    axios.get<EditUserResp>(`http://localhost:5000/api/user`).then(res => setUser(res.data))
  }, [])

  return <div>index</div>
}

export default EditUserPage
function useState<T>(arg0: {}): [any, any] {
  throw new Error('Function not implemented.')
}
