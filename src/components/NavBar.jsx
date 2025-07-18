import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
import { removeUser } from "../utils/userSlice"

const NavBar = () => {

  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try{
      const res = await axios.get(BASE_URL + '/logout', { withCredentials: true })
      console.log(res.data)
      dispatch(removeUser())
      navigate('/login')
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="navbar bg-base-300">
  <div className="flex-1">
    <Link className="btn btn-ghost text-2xl" to='/'>DevTinder</Link>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    { 
    user && (
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="photoUrl"
              src={user.photoUrl} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><a className="text-red-600 bold">{user.email}</a></li>
          <li>
            <Link className="justify-between" to='/profile'>
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <Link className="justify-between" to='/connections'>
              Connections
              <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <Link className="justify-between" to='/requests'>
              Requests
              <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <Link className="justify-between" to='/premium'>
              Premium
              <span className="badge">New</span>
            </Link>
          </li>
          <li><a
                onClick={handleLogout}
                >Logout</a></li>
        </ul>
      </div>)
    }
  </div>
</div>
  )
}

export default NavBar