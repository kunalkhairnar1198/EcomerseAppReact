import React from 'react'
import Layout from '../../Component/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegTrashAlt } from 'react-icons/fa'
import { cartSliceActions } from '../../Store/cart-Product-slice/cart-slice'
import BuyNowModal from '../../Component/BuyNow/BuyNowModal'
import { LoaderActions } from '../../Store/Ui-Slice/ui-slice'

const products = [
    {
        id: 1,
        name: 'Nike Air Force 1 07 LV8',
        href: '#',
        price: '₹47,199',
        originalPrice: '₹48,900',
        discount: '5% Off',
        color: 'Orange',
        size: '8 UK',
        imageSrc:
            'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
    },
    {
        id: 2,
        name: 'Nike Blazer Low 77 SE',
        href: '#',
        price: '₹1,549',
        originalPrice: '₹2,499',
        discount: '38% off',
        color: 'White',
        leadTime: '3-4 weeks',
        size: '8 UK',
        imageSrc:
            'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png',
    },
    {
        id: 3,
        name: 'Nike Air Max 90',
        href: '#',
        price: '₹2219 ',
        originalPrice: '₹999',
        discount: '78% off',
        color: 'Black',
        imageSrc:
            'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png',
    },
]

const CartPage = () => {
    const dispatch = useDispatch()
    const cartData = useSelector(state => state.cart.cartProducts);
    const setopen = useSelector(state => state.ui.open)
    console.log(cartData, setopen);

    const cartItemTotal = cartData.map(item => item.qunatity).reduce((prevValue, currValue) => prevValue + currValue, 0);

    const totalAmount = cartData.map(item => parseInt(item.price) * item.qunatity).reduce((prevValue, currValue) => prevValue + currValue, 0);
    console.log(cartItemTotal, totalAmount)
    const deliveryCharges = 0;

    const addToCartHandler =(item)=>{
        dispatch(cartSliceActions.addItemCart(item))
    }

    const deleteCartHandler =(item)=>{
        dispatch(cartSliceActions.removeCartItem(item))
    }

    const CheckOut =()=>{
        dispatch(LoaderActions.isOpen())
    }

    return (
        <Layout>
            <div className="container mx-auto mt-32 max-w-7xl lg:px-0">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Shopping Cart
                    </h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                            <h2 id="cart-heading" className="sr-only">Cart Items</h2>
                            <ul role="list" className="divide-y divide-gray-200">
                                {cartData.map((product) => (
                                    <li key={product.id} className="flex py-6 sm:py-6">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={product.productImageUrl}
                                                alt={product.title}
                                                className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                                            />
                                        </div>
                                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm">
                                                            <a href={product.productImageUrl} className="font-semibold text-black">
                                                                {product.title}
                                                            </a>
                                                        </h3>
                                                    </div>
                                                    <div className="mt-1 flex text-sm">
                                                        <p className="text-sm text-gray-500">{product.category}</p>
                                                        {product.size && (
                                                            <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                                                                {product.size}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="mt-1 flex items-end">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            ₹{product.price}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex">
                                                <div className="flex items-center">
                                                    <button
                                                        type="button"
                                                        onClick={()=>deleteCartHandler(product.id)}
                                                        className="h-7 w-7 text-gray-700 border border-gray-300"
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="mx-1 h-7 w-9 rounded-md border text-center"
                                                        value={product.qunatity}
                                                        readOnly
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={()=>addToCartHandler(product)}
                                                        className="flex h-7 w-7 items-center justify-center text-gray-700 border border-gray-300"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <div className="ml-6 flex text-sm">
                                                    <button type="button" 
                                                    onClick={()=>deleteCartHandler(product.id)}
                                                    className="flex items-center space-x-1 px-2 py-1 pl-0">
                                                        <FaRegTrashAlt className="text-gray-500" />
                                                        <span className="text-xs font-medium text-red-500">Remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
                        >
                            <h2
                                id="summary-heading"
                                className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                            >
                                Order Summary
                            </h2>
                            <div>
                                <dl className="space-y-1 px-2 py-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-800">Subtotal ({cartItemTotal} items)</dt>
                                        <dd className="text-sm font-medium text-gray-900">₹{totalAmount}</dd>
                                    </div>
                                    {/* <div className="flex items-center justify-between pt-4">
                                        <dt className="flex items-center text-sm text-gray-800">
                                            <span>Discount</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">- ₹{discount}</dd>
                                    </div> */}
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="flex text-sm text-gray-800">
                                            <span>Delivery Charges</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">Free</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-y border-dashed py-4">
                                        <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                        <dd className="text-base font-medium text-gray-900">₹{totalAmount + deliveryCharges}</dd>
                                    </div>
                                </dl>
                                <div className="px-2 pb-4 font-medium text-black-700">
                                    <div className="flex gap-4 mb-6">
                                        <button
                                            type="button"
                                            onClick={CheckOut}
                                            className="w-full px-4 py-3 text-center text-gray-100 bg-slate-800 border border-transparent hover:border-dark-700 hover:text-dark-700 hover:bg-slate-500 rounded-xl"
                                        >
                                            Checkout
                                        </button>
                                        {setopen && <BuyNowModal/>}
                                        
                                    </div>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;