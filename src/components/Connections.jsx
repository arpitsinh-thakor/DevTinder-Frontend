import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnection } from "../utils/connectionSlice"

const Connections = () => {

    const dispatch = useDispatch()
    const connections = useSelector(store => store.connection)

    const fetchConnections = async () => {
        try{
            const res = await axios.get(BASE_URL + '/user/requests/connections', { withCredentials: true })
            dispatch(addConnection(res.data?.connections))
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])

  return connections && (
    <div
        className="flex flex-col items-center justify-center h-3/6 bg-base-200"
        >
        <h1
            className="text-4xl text-center m-2 text-primary"
            >Connections - 
        </h1>

        <div
            className="flex flex-col items-center justify-center bg-base-100 w-96 p-4"
            >
            {connections.map((connection, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center justify-center w-96 p-4"
                    >
                    <img
                        className="rounded-full h-20 w-20"
                        src={connection.photoUrl}
                        alt={connection.firstName}
                        />
                    <h2
                        className="text-2xl"
                        >{connection.firstName} {connection.lastName}</h2>
                    <p
                        className="text-lg"
                        >{connection.about}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Connections