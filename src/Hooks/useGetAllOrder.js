import { collection, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { fireDB } from '../firebase/FirebaseConfig'

const useGetAllOrder = () => {
    const [orders, setAllOrders] = useState([])

    useEffect(()=>{
        getAllProductsHandler()
    },[])

    const getAllProductsHandler =()=>{
        try {
            const q = query(collection(fireDB, 'order'),orderBy('time'));

            const data = onSnapshot(q, (QuerySnapshot)=>{
                let orderArray =[];
                QuerySnapshot.forEach((doc)=> {
                    orderArray.push({...doc.data(), id: doc.id})
                })
                setAllOrders(orderArray)
            })
            return () => data
        } catch (error) {
            alert('failed to load')
            console.log(error)
        }
    }
    console.log(orders)
    return {
        orders,
    }
}

export default useGetAllOrder
