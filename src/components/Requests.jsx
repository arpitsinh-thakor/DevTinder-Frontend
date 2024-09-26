import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addRequests, removeRequests } from "../utils/requestSlice"
import { useEffect } from "react"

const Requests = () => {
    
    const dispatch = useDispatch()
    const requests = useSelector(state => state.requests)

    const fetchRequest = async () => {
        try{
            const res = await axios.get(BASE_URL + '/user/requests/received', { withCredentials: true })
            dispatch(addRequests(res.data?.requests))
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchRequest()
    }, [])

   const reviewRequest = async (_id, status) => {
         try{
              const res = await axios.post(BASE_URL + '/request/review/'+status+"/"+_id, {
                requestId: _id,
                status
              }, { withCredentials: true })
              if(res.status === 200){
                fetchRequest()
                dispatch(removeRequests(_id))
              }
         }catch(err){
              console.log(err)
         }
    }

  return requests && (
    <div
        className="flex flex-col items-center justify-center"
        >
        <h1
            className="text-4xl"
            >Requests</h1>
        
        <div className="flex flex-col">
        {requests.map((request, index) => (
                <div
                    key={index}
                    className="flex items-center justify-center w-96 p-4 bg-base-200 m-2 gap-2"
                    >
                        <div>
                            <img
                            className="rounded-full h-10 w-10"
                            src={request.sender.photoUrl}
                            alt={request.sender.firstName}
                            />
                            <h2
                                className="text-2xl"
                                >{request.sender.firstName} {request.sender.lastName}</h2>
                            <p
                                className="text-lg"
                            >{request.sender.about}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button
                                className="btn btn-primary"
                                onClick={() => reviewRequest(request._id, 'accepted')}
                                >Accept</button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => reviewRequest(request._id, 'rejected')}
                                >Reject</button>
                        </div>

                </div>
            ))}
            </div>
    </div>
  )
}

export default Requests