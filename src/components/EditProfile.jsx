import { useState } from "react"
import UserCard from "./UserCard"
import { BASE_URL } from "../utils/constants"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"

const EditProfile = ({user}) => {

    const [firstName, setFirstName] = useState(user.firstName || '')
    const [lastName, setLastName] = useState(user.lastName || '')
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || '')
    const [age, setAge] = useState(user.age || '')
    const [gender, setGender] = useState(user.gender || '')
    const [about, setAbout] = useState(user.about || '')
    const dispatch = useDispatch()

    const saveProfile = async () => {
        try{
            const res = await axios.patch(BASE_URL + '/profile/edit', {
                firstName,
                lastName,
                photoUrl,
                gender,
                age,
                about,
            }, { withCredentials: true })
            
            if(res.status === 200){
                alert('Profile Updated')
            }
            
            dispatch(addUser(res.data))


        }
        catch(err){
            console.log(err)
        }
    }

  return (
    <div className="flex items-center justify-evenly">
        <div
            className="flex flex-col items-center justify-center h-3/6 bg-base-200"
            >
            <h1
                className="text-4xl text-center m-2"
                >Edit Profile</h1>
            <form 
                className="form-control bg-base-100 p-4 w-96"
                >
                <label 
                    className="label text-lg text-center"
                    htmlFor="firstName">First Name</label>
                <input 
                    className="p-1"
                    type="text" id="firstName" 
                    onChange={
                        (e) => setFirstName(e.target.value)
                    }
                    value={firstName}
                    />
                <label 
                    className="label text-lg text-center"
                    htmlFor="lastName">Last Name</label>
                <input 
                    className="p-1"
                    type="text" id="lastName" 
                    onChange={
                        (e) => setLastName(e.target.value)
                    }
                    value={lastName}
                    />
                <label 
                    className="label text-lg text-center"
                    htmlFor="photoUrl">Photo URL</label>
                <input 
                    className="p-1"
                    type="text" id="photoUrl" 
                    onChange={
                        (e) => setPhotoUrl(e.target.value)
                    }
                    value={photoUrl}
                    />
                <label 
                    className="label text-lg text-center"   
                    htmlFor="age">Age</label>
                <input 
                    className="p-1"
                    type="number" id="age" 
                    onChange={
                        (e) => setAge(e.target.value)
                    }
                    value={age}
                    />
                <label
                    className="label text-lg text-center"
                    htmlFor="gender">Gender</label>
                <select
                    className="p-1"
                    onChange={
                        (e) => setGender(e.target.value)
                    }

                    >
                        < option value="male">Male</option>
                        < option value="female">Female</option>
                        < option value="any">Any</option>
                </select>
                <label 
                    className="label text-lg text-center"
                    htmlFor="about">About</label>
                <textarea
                    className="p-1"
                    id="about"
                    onChange={
                        (e) => setAbout(e.target.value)
                    }
                    value={about}
                    />

                <button
                    className="btn btn-primary m-2"
                    type="submit"
                    onClick={saveProfile}
                    >Save</button>

            </form>
        </div>

        <UserCard user={{
            firstName,
            lastName,
            photoUrl,
            age,
            about,}}/>
    </div>
  )
}

export default EditProfile