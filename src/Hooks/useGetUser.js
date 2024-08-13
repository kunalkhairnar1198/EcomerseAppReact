import { collection, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { fireDB } from '../firebase/FirebaseConfig'

const useGetUser = () => {
  const [user, setUser] = useState([])

  useEffect(()=>{
    getAllUsers()
  },[])

  const getAllUsers = async()=>{
    try {
        const q = query(collection(fireDB,'user'),orderBy('time'))

        const data = onSnapshot(q, (QuerySnapshot)=>{
            let usersArray = []
            QuerySnapshot.forEach((doc)=>{
                usersArray.push({...doc.data(), id: doc.id})
            })
            setUser(usersArray)
        })
        return ()=> data
    } catch (error) {
        console.log(error)
    }
  }
console.log(user)
    return {
        user
  }
}

export default useGetUser
