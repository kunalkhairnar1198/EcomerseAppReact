import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductData, updateProduct } from "../../Store/adminProuct-slice/admin-product-slice";
import toast from "react-hot-toast";

const categoryList = [
  {
      name: 'fashion'
  },
  {
      name: 'shirt'
  },
  {
      name: 'jacket'
  },
  {
      name: 'mobile'
  },
  {
      name: 'laptop'
  },
  {
      name: 'shoes'
  },
  {
      name: 'home'
  },
  {
      name: 'books'
  }
]

const UpdateProductPage = () => {

  const navigate = useNavigate()
  const {id} = useParams()
  const dispatch = useDispatch()
  const AdminAllProducts  = useSelector(state => state.admin_products.AllProducts) 
  const [productDetail, setProductDetails] = useState({
    title:'',
    price:'',
    productImageUrl:'',
    category:'',
    description:'',
    qunatity:1,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      'en-us',
      {
        month:'short',
        day:'2-digit',
        year:'numeric'
      }
    )
  });

  const onTitleChange =(e)=>{
    setProductDetails({
      ...productDetail,
      title: e.target.value
    })
  }

  const onPriceChange =(e)=>{
    setProductDetails({
      ...productDetail,
      price: e.target.value
    })
  }

  const onProducturlChange =(e)=>{
    setProductDetails({
      ...productDetail,
      productImageUrl: e.target.value
    })
  }
  const onCategoryChange =(e)=>{
    setProductDetails({
      ...productDetail,
      category: e.target.value
    })
  }
  const onDescriptionChange =(e)=>{
    setProductDetails({
      ...productDetail,
      description: e.target.value
    })
  }
  console.log(id)
  

  useEffect(()=>{
    const update =async()=>{
    const productEdit = AdminAllProducts.find((item) => item.id === id)
      // console.log(productEdit)
  
      if(productEdit){
      setProductDetails(productEdit)
    }
  }
    update()

    return () => fetchProductData()


  },[AdminAllProducts, id])

  const updateProductHandler =async(event)=>{
        event.preventDefault()
        console.log(productDetail)
        await dispatch(updateProduct(productDetail))
        toast.success('Product updated Sucesfully')
        navigate('/admin-dashboard')
  }
  
  return (
    <div>
        <div className='flex justify-center items-center h-screen'>
            {/* Login Form  */}
            <div className="login_Form  bg-slate-800 px-8 py-6 border border-dark-100 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-white '>
                        Add Product
                    </h2>
                </div>
            <form onSubmit={updateProductHandler}>
                {/* Input One  */}
                <div className="mb-3">
                    <input
                        type="text"
                        name="title"
                        placeholder='Product Title'
                        value={productDetail.title}
                        onChange={onTitleChange}
                        className='bg-slate-100 text-slate-500 border border-dark-100 px-2 py-2 w-96 rounded-md outline-none placeholder-dark-300'
                    />
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="number"
                        placeholder='Product Price'
                        value={productDetail.price}
                        onChange={onPriceChange}
                        className='bg-slate-100 text-slate-500 border border-dark-100 px-2 py-2 w-96 rounded-md outline-none placeholder-dark-300'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='Product Image Url'
                        value={productDetail.productImageUrl}
                        onChange={onProducturlChange}
                        className='bg-slate-100 text-slate-500 border border-dark-100 px-2 py-2 w-96 rounded-md outline-none placeholder-dark-300'
                    />
                </div>

                {/* Input Four  */}
                <div className="mb-3">
                    <select 
                        onChange={onCategoryChange}
                        value={productDetail.category}
                      className="w-full px-1 py-2 text-slate-500 bg-slate-100 border border-dark-100 rounded-md outline-none  ">
                        <option disabled>Select Product Category</option>
                        {categoryList.map((value, index) => {
                            const { name } = value
                            return (
                                <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                            )
                        })}
                    </select>
                </div>

                {/* Input Five  */}
                <div className="mb-3">
                    <textarea value={productDetail.description} onChange={onDescriptionChange} name="description" placeholder="Product Description" rows="5" className=" w-full px-2 py-1 text-slate-500 bg-slate-100 border border-dark-200 rounded-md outline-none placeholder-dark-300 ">

                    </textarea>
                </div>

                {/* Add Product Button  */}
                <div className="mb-3">
                    <button
                        type='submit'
                        className='bg-green-800 hover:bg-green-700 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Add Product
                    </button>
                </div>
              </form> 
            </div>
        </div>
    </div>
  );
}

export default UpdateProductPage;