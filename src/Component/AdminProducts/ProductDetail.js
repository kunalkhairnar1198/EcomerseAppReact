import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { fetchProductData } from "../../Store/adminProuct-slice/admin-product-slice";
const ProductDetail = () => {
  
    const AdminAllProducts  = useSelector(state => state.admin_products.AllProducts)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // console.log(AdminAllProducts)
  
    useEffect(()=>{
        dispatch(fetchProductData())
    },[dispatch])
   
    const editHandler =(id)=>{
      navigate(`/updateproductpage/${id}`)
    }

    return (
        <div>
      <div className="py-5 flex mt-0 justify-between items-center">
        {/* text */}
        <h1 className="text-xl text-slate-700 font-bold">All Product</h1>
        {/* Add Product Button */}
        <NavLink to="/addproductpage" className="px-5 py-2 bg-slate-700 text-white hover:bg-slate-600 border border-medium-dark rounded-lg">
          Add Product
        </NavLink>
      </div>

      {/* table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border border-collapse sm:border-separate border-medium-dark text-slate-700">
          <thead>
            <tr>
              <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-medium-dark text-slate-700 bg-slate-100 font-bold">S.No.</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Image</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Title</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Price</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Category</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Date</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Edit</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Delete</th>
            </tr>
          </thead>
          <tbody>
            {AdminAllProducts.map((item, index) => (
              <tr className="text-high-dark mb-4" key={item.id}>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                  {index + 1}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                  <img className="w-16 h-16 object-cover" src={item.productImageUrl} alt={item.title} />
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                  {item.title}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                  ₹{item.price}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                  {item.category}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                  { item.date }
                </td>
                <td
                onClick={()=>editHandler(item.id)} 
                className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500 text-green-500 cursor-pointer">
                  Edit
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500 text-red-500 cursor-pointer">
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
}

export default ProductDetail;