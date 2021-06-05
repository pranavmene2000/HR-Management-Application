import React, { useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

function Profile() {

    const { user: { userId } } = useSelector(state => state.auth)

    useEffect(() => {
        axios.get(`/auth/user`)
            .then(({ data }) => {
                console.log(data)
            })
            .catch(error => console.log(error))
    }, [userId])

    return (
        <div>
            <h1>My Profile</h1>
        </div>
    )
}

export default Profile
