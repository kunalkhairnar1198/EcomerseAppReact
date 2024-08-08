import { collection, Timestamp, addDoc } from 'firebase/firestore';
import React, {  useState } from 'react'
import toast from 'react-hot-toast';
import {fireDB} from '../firebase/FirebaseConfig';
import { useSelector } from 'react-redux';

const useBuyNow = () => {
   const cartData = useSelector(state => state.cart.cartProducts);

  const [addressInfo, setAdderessInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString(
        "en-US",
        {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }
    )
});


console.log(addressInfo)
let user =  JSON.parse(localStorage.getItem('users'))

console.log('-----',user)


const buyNowOrder =()=>{
    if(addressInfo.name === '' || addressInfo.address === '' || addressInfo.pincode === '' || addressInfo.mobileNumber === ''){
        return toast.error('All Fields are required')
    }

    const orderInfo ={
        cartData,
        addressInfo,
        email: user.email,
        userid: user.uid,
        status: "confirmed",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    }
    console.log(orderInfo)
    try {
        const orderRef = collection(fireDB, 'order');
        addDoc(orderRef, orderInfo);
        setAdderessInfo({
            name: "",
            address: "",
            pincode: "",
            mobileNumber: "",
        })
        alert('order placed succesfully')
        toast.success("Order Placed Successfull")
    } catch (error) {
        console.log(error)
    }
}

    return {
        setAdderessInfo,
        addressInfo,
        buyNowOrder,
    }
}

export default useBuyNow
