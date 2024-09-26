import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants"

const Login = () => {

  const [email, setEmail] = useState('user12@gmail.com')
  const [password, setPassword] = useState('User12@pass')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [error, setError] = useState('')
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
      setError(err?.response?.data || 'An error occurred')
      console.log(err)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post(BASE_URL + '/signup', {
        firstName,
        lastName,
        email,
        password
      }, { withCredentials: true })
      console.log(res.data)
      dispatch(addUser(res.data))
      return navigate('/profile')

    }catch(err){
      setError(err?.response?.data || 'An error occurred')
      console.log(err)
    }
  }



  return (
    <div
      className="flex flex-col"
      >
      <h1
        className="text-center text-4xl font-bold text-white mt-10 mb-5"
        >{isLoginForm ? "Login" : "SignUp"}</h1>
      <form
        className="flex flex-col items-center"
        >
        { !isLoginForm && <>
            <input
              className="border border-gray-300 rounded-md p-2 mb-2 w-1/4"
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="border border-gray-300 rounded-md p-2 mb-2 w-1/4"
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        }
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
          onClick={isLoginForm ? handleLogin : handleSignUp}
          >{isLoginForm ? "Login" : "SignUp"}</button>

        <p
          className="text-blue-500 mt-2 cursor-pointer"
          onClick={() => setIsLoginForm(!isLoginForm)}
          >{isLoginForm ? "Create an account" : "Already have an account?"}
          </p>
        
        {error && <div
          className="text-red-500 mt-2"
          > Error - {error}</div>
        }
      </form>
    </div>
  )
}

export default Login