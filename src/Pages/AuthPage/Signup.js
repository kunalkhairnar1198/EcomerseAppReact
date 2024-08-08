import { NavLink, useNavigate } from "react-router-dom";
import Modal from "../../Portal/Modal";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Component/UI/Loader";
import { LoaderActions } from "../../Store/Ui-Slice/ui-slice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";


const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const uiLoader = useSelector(state => state.ui.isVisible)
  console.log(uiLoader)
  const [userSignup, SetUserSignup] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
    role:'user'
  })
  
  const toggleModal = () => {
    navigate('/');
  };

  const nameHandler =(e)=>{
    SetUserSignup({
      ...userSignup,
      name:e.target.value
    })
  }

  const emailHandler =(e)=>{
    SetUserSignup({
      ...userSignup,
      email:e.target.value
    })
  }
  const passwordHandler =(e)=>{
    SetUserSignup({
      ...userSignup,
      password:e.target.value
    })
  }
  const confirmPasswordHandler =(e)=>{
    SetUserSignup({
      ...userSignup,
      confirmPassword:e.target.value
    })
  }

  const onSignupHandler =async(e)=>{
    e.preventDefault()
    if(userSignup.name === "" || userSignup.email === "" | userSignup.password === "" ){
        return toast.error("All Fields are required !")
    }

    if (userSignup.password !== userSignup.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    console.log(userSignup)

    try {
      const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password)

      const user ={
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        password:userSignup.password,
        confirmPassword: userSignup.confirmPassword,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
          'en-us',{
            month:'short',
            day:'2-digit',
            year:"numeric"
          })
      }

      const userReferance = collection(fireDB, "user")

      addDoc(userReferance, user)

      console.log(user)
        
      navigate('/signin')

      SetUserSignup({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
      })

      toast.success('signup successfully')
      
    } catch (error) {
        console.log(error)
    }

   
  }

  
  
  return (
    <Modal className="max-w-2xl mx-auto" onClick={toggleModal}>
        <div className="relative w-full max-w-md mx-auto p-4 h-auto">
          <div className="rounded-lg shadow-lg dark:bg-gray-700">
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
            <form className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" onSubmit={onSignupHandler}>
              <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
                Signup
              </h3>
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="ram patil"
                  onChange={nameHandler}
                  value={userSignup.name}
                  required
                />
              </div>
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
                  value={userSignup.email}
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
                  value={userSignup.password}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="passwordConfirmation"
                  className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="passwordConfirmation"
                  name="password_confirmation"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  onChange={confirmPasswordHandler}
                  value={userSignup.confirmPassword}
                  required
                />
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-white">
                  By creating an account, you agree to our
                  <NavLink to="#" className="text-white underline"> terms and conditions </NavLink>
                  and
                  <NavLink to="#" className="text-white underline"> privacy policy </NavLink>.
                </p>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Signup
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Already have an account?{' '}
                <NavLink to='/signin' className="text-blue-700 hover:underline dark:text-blue-500">
                  Login
                </NavLink>
              </div>
            </form>
          </div>
        </div>
        </Modal>
     
  );
};

export default Signup;
