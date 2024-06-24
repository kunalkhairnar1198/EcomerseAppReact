import React, { useState } from 'react'
import Modal from '../../Portal/Modal'
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { QuerySnapshot, collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../../Store/auth-slice/auth-slice';

const Signin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const toggleModal = () => {
      navigate('/')
    };
    const [userSingin, setUserSingin] = useState({
        email:'',
        password:''
    })

    const emailHandler =(e)=>{
        setUserSingin({
          ...userSingin,
          email:e.target.value
        })
      }
      const passwordHandler =(e)=>{
        setUserSingin({
          ...userSingin,
          password:e.target.value
        })
      }
    //   console.log(userSingin)
      const onSinginHandler =async(e)=>{
        e.preventDefault()

        // console.log(userSingin)

        if(userSingin.email === '' | userSingin.password === ''){
            return toast.error('All field required')
        }
        try {
            const users = await signInWithEmailAndPassword(auth, userSingin.email, userSingin.password);
            console.log(users)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
            try{
                const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', users.user.uid)
                )

                const data = onSnapshot(q,(QuerySnapshot)=>{
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem('users', JSON.stringify(user))

                    setUserSingin({
                        email:'',
                        password:''
                    })

                    console.log('lgoin succesfully',user)

                         user && dispatch(AuthActions.login(true))
                         
                     if(user.role === 'user'){
                        
                        navigate('/userdashbord')
                    } else {
                        navigate('/admin-dashboard')
                    }

                    return toast.success('Login Successfully')

                })
                return () => data
            }catch(error){
                console.log(error)
               return toast.error('Login failed')
            }
       
        } catch (error) {
            console.log(error)
            return toast.error('Login Failed')
        }



      }

  return (
        <Modal className="max-w-2xl mx-auto" onClick={toggleModal}>
         <div id="authentication-modal" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden h-modal md:h-full">
            <div className="relative w-full max-w-md px-4 h-full md:h-auto">
                <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
                <div className="flex justify-end p-2">
                    <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    onClick={toggleModal}
                    >
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                        ></path>
                    </svg>
                    </button>
                </div>
                <form className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" onSubmit={onSinginHandler}>
                    <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
                    SignIn
                    </h3>
                    <div>
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >
                        Your email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        onChange={emailHandler}
                        value={userSingin.email}
                        required
                    />
                    </div>
                    <div>
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >
                        Your password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        onChange={passwordHandler}
                        value={userSingin.password}
                        required
                    />
                    </div>
                    <div className="flex justify-between">
                    <NavLink href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">
                        Forgot Password?
                    </NavLink>
                    </div>
                    <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                    SignIn
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered?{' '}
                    <NavLink to='/signup' className="text-blue-700 hover:underline dark:text-blue-500">
                        Create account
                    </NavLink>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </Modal>

  )
}

export default Signin
