import { collection, deleteDoc, doc, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { fireDB } from '../firebase/FirebaseConfig'
import toast from 'react-hot-toast'

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

    const deleteProduct = async (id) => {
        console.log(id)
        try {
            await deleteDoc(doc(fireDB, 'order', id))
            toast.success('Order Deleted successfully')
            getAllProductsHandler()
        } catch (error) {
            console.log(error)
        }
    }
    return {
        orders,
        deleteProduct,
    }
}

export default useGetAllOrder
