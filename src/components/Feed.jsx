import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice"
import { useEffect } from "react"
import UserCard from "./UserCard"

const Feed = () => {

  const dispatch = useDispatch()
  const feed = useSelector(store => store.feed)

  const getFeed = async () => {
    try{
      if(feed) return

      const res = await axios.get(BASE_URL + '/user/feed', { withCredentials: true })
      dispatch(addFeed(res.data?.users))
    }catch(err){
      console.log(err)
    }
  } 

  useEffect(() => {
    getFeed()
  }, [])

  return feed && (
    <div
      className="flex flex-col items-center justify-center h-screen bg-base-200"
      >
      <UserCard  user={feed[2]}/>
      
    </div>
  )
}

export default Feed