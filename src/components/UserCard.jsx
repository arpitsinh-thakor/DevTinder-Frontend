import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { removeUserFromFeed } from "../utils/feedSlice"

const UserCard = ({user}) => {

    if(!user) return null
    const {firstName, lastName, photoUrl, age, gender, about, skills} = user   
    const dispatch = useDispatch()
    
    const handleSubmitRequest = async (status, receiverId) => {
        try{
            const res = await axios.post(BASE_URL + '/request/send/'+status+"/"+receiverId, {
                receiverId,
                status
            }, { withCredentials: true })
            if(res.status === 200){
                dispatch(removeUserFromFeed(receiverId))
            }
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
            <img
            src={user?.photoUrl}
            alt="photoUrl" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{
                `${firstName} ${lastName}`
                }</h2>
            <h3>{`${age || 'Age Not-Disclosed'} ${gender || 'Gender Not-Disclosed'}`}</h3>
            <p>{about || 'About Not-Disclosed'}</p>
            <p className="flex">{
                skills && skills.map(skill => (
                    <span key = {skill} className="badge badge-primary p-1">{skill}</span>
                ))
                }</p>
            <div className="flex justify-around">
            <button 
                className="btn btn-error text-white text-xl bold"
                onClick={() => handleSubmitRequest('ignored', user._id)}
                >Ignore</button>
            <button 
                className="btn btn-success text-white text-xl bold"
                onClick={() => handleSubmitRequest('interested', user._id)}
                >Interesed</button>
            </div>
        </div>
    </div>
  )
}

export default UserCard