import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../../Component/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { cartSliceActions } from '../../Store/cart-Product-slice/cart-slice'

const Categorypage = () => {

    const {categoryname} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const productData = useSelector(state => state.admin_products.AllProducts)
    const filterdata =  productData.filter((item)=> item.category.includes(categoryname))
    console.log(filterdata)
    console.log(categoryname)

    const addToCartHandler =(item)=>{
        dispatch(cartSliceActions.addItemCart(item))
    }

  return (
    <Layout>
         <div className="mt-36">
                {/* Heading  */}
                <div className="">
                    <h1 className=" text-center mb-5 text-2xl font-semibold first-letter:uppercase">{categoryname}</h1>
                </div>
                {!filterdata ?

                    <div className="flex justify-center">
                        Loading....
                    </div>

                    :

                    <section className="text-gray-600 body-font">
                        {/* main 2 */}
                        <div className="container px-5 py-5 mx-auto">
                            {/* main 3  */}
                            <div className="flex flex-wrap -m-4 justify-center">
                                {filterdata.length > 0 ?
                                    <>
                                        {filterdata.map((item, index) => {
                                            const { id, title, price, productImageUrl,category } = item;
                                            return (
                                                <div key={index} className="p-4 w-full md:w-1/4">
                                                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                                        <img
                                                            onClick={() => navigate(`/category/productinfo/${id}`)}
                                                            className="lg:h-80  h-96 w-full"
                                                            src={productImageUrl}
                                                            alt="img"
                                                        />
                                                        <div className="p-6">
                                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                            </h2>
                                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                                {title.substring(0, 25)}
                                                            </h1>
                                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                                ₹{price}
                                                            </h1>
                                                            <div className="flex justify-center ">
                                                                <button 
                                                                onClick={()=>addToCartHandler(item)}
                                                                className=" bg-slate-500 hover:bg-slate-600 w-full text-white py-[4px] rounded-lg font-bold">
                                                                    Add to cart
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </>

                                    :

                                    <div>
                                        <div className="flex justify-center">
                                            <img className=" mb-2" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="" />
                                        </div>
                                        <h1 className=" text-black text-xl">No {categoryname} product found</h1>
                                    </div>
                                }
                            </div>
                        </div>
                    </section>

                }
            </div>
    </Layout>
  )
}

export default Categorypage
