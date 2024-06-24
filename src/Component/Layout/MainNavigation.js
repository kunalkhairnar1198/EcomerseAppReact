import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart } from 'react-icons/fa'; 
import image from '../assets/app-store.png';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../../Store/auth-slice/auth-slice';

const MainNavigation = () => {
  const dispatch = useDispatch()

  const isAuthenticateduser =  JSON.parse(localStorage.getItem('users'))



  const logoutHandler =()=>{
   
    dispatch(AuthActions.logout(false))
    // localStorage.clear()
   
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-gray-100 shadow-sm md:px-6 flex-wrap md:flex-nowrap">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <Link to="/" className="flex items-center gap-2">
            <img src={image} alt="brand" className="w-8 h-8" />
            <span className="text-lg font-semibold">KKshops</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4 flex-1 justify-center w-full md:w-auto order-3 md:order-none">
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 order-2 md:order-none">
          {!isAuthenticateduser ? (
          <Link to="/signin" className="flex items-center gap-2" >
            <span className="text-lg font-semibold">Login</span>
          </Link>
          ):(
          <Link to='/' className="flex items-center gap-2" onClick={logoutHandler}>
            <span className="text-lg font-semibold">Logout</span>
          </Link>
          )}

          <div className="flex items-center mt-4 lg:mt-0">
                   {isAuthenticateduser?.role === 'user' && 
                    <Link to='/userdashbord' className="flex items-center focus:outline-none" >
                         <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full"> 
                            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" className="object-cover w-full h-full" alt="avatar"/>
                        </div>

                        <h3 className="mx-2 text-red-600 font-extrabold ">{isAuthenticateduser?.name}</h3>
                    </Link>}
            </div>

          <Link to='/cart-page'
            className="relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-200 hover:text-gray-700 h-10 w-10"
          >
              <FaShoppingCart className="w-6 h-6" />
              <span className="sr-only">Cart</span>
              <div className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center h-5 w-5 bg-secondary text-red-100 bg-red-600 rounded-full  text-xs font-medium">
               0
              </div>
          </Link>
        </div>
      </header>

      <div className="fixed top-16 left-0 right-0 z-40 flex items-center justify-center p-2 bg-gray-800 text-white">
        <div className="flex items-center gap-5 flex-wrap justify-center">
          <Link to="/all-products" className="text-sm">
            All Products
          </Link>
          <Link to="/" className="text-sm">
            Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainNavigation;
