import React from 'react'
import { useDispatch } from 'react-redux'
import { LoaderActions } from '../../Store/Ui-Slice/ui-slice'
import useBuyNow from '../../Hooks/useBuyNow'

const BuyNowModal = () => {
  const {setAdderessInfo, addressInfo,buyNowOrder} = useBuyNow()
  const dispatch = useDispatch()
  console.log(addressInfo)

  const nameChange =(e)=>{
    setAdderessInfo({
      ...addressInfo,
      name: e.target.value
  })
  }

  const addressChange =(e)=>{
    setAdderessInfo({
      ...addressInfo,
      address: e.target.value
  })
  }
  const pinChange =(e)=>{
    setAdderessInfo({
      ...addressInfo,
      pincode: e.target.value
  })
  }

  const mailChnage =(e)=>{
    setAdderessInfo({
      ...addressInfo,
      mobileNumber: e.target.value
  })
  }

  const handleClose =()=>{
    buyNowOrder()
    dispatch(LoaderActions.isOpen())
  }
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
       <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md" onClick={handleClose}></div>
         <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-auto p-6 z-20 relative">
            <div className="mb-3">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={nameChange}
                className="bg-slate-50 border border-slate-200 px-2 py-2 w-full rounded-md outline-none text-black-600 placeholder-black-300"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="address"
                placeholder="Enter your address"
                onChange={addressChange}
                className="bg-slate-50 border border-slate-200 px-2 py-2 w-full rounded-md outline-none text-black-600 placeholder-black-300"
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                name="pincode"
                placeholder="Enter your pincode"
                onChange={pinChange}
                className="bg-slate-50 border border-slate-200 px-2 py-2 w-full rounded-md outline-none text-black-600 placeholder-black-300"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="mobileNumber"
                placeholder="Enter your mobile number"
                onChange={mailChnage}
                className="bg-slate-50 border border-slate-200 px-2 py-2 w-full rounded-md outline-none text-black-600 placeholder-black-300"
              />
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="w-full px-4 py-3 text-center text-white bg-slate-600 border border-transparent rounded-lg hover:bg-slate-700"
            >
              Submit
            </button>
          </div>
        </div>
  )
}

export default BuyNowModal
