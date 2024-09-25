import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants"

const Login = () => {

  const [email, setEmail] = useState('user12@gmail.com')
  const [password, setPassword] = useState('User12@pass')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post(BASE_URL + '/login', {
        email,
        password
      }, { withCredentials: true })
      console.log(res.data)
      dispatch(addUser(res.data?.user))
      return navigate('/')

    }catch(err){
      console.log(err)
    }
  }

  return (
    <div
      className="flex flex-col"
      >
      <h1
        className="text-center text-4xl font-bold text-white mt-10 mb-5"
        >Login</h1>
      <form
        className="flex flex-col items-center"
        >
        <input
          className="border border-gray-300 rounded-md p-2 mb-2 w-1/4"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded-md p-2 mb-2 w-1/4"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md w-1/4"
          type="submit"
          onClick={handleLogin}
          >Login</button>
      </form>
    </div>
  )
}

export default Login