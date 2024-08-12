import useGetAllOrder from "../../Hooks/useGetAllOrder";

const OrderDetail = () => {
    const {orders, deleteProduct} = useGetAllOrder()

    return (
        <div>
        <div className="py-5 flex mt-0  justify-between items-center">
            {/* text  */}
            <h1 className=" text-xl text-slate-700 font-bold">All Order </h1>
        </div>

        {/* table  */}
        <div className="w-full overflow-x-auto">
        <table className="w-full text-left border border-collapse sm:border-separate border-medium-dark text-slate-700">
          <thead>
            <tr>
              <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-medium-dark text-slate-700 bg-slate-100 font-bold">S.No.</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Order Id</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Image</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Title</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Price</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Category</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">qunatity</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">TotalPrice</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Status</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Name</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Address</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Pincode</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Date</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Phone Number</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Email</th>
              <th scope="col" className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-dark-100 text-slate-700 bg-slate-100">Action</th>
            </tr>
          </thead>
          <tbody>
          {orders.map((order,index) => {
            console.log(order)
            return (
                <>
                    {order.cartData.map((item ) => {
                        const { id, productImageUrl, title, category, price, qunatity } = item
                        return (
                        <tr className="text-high-dark mb-4" key={id}>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                            {index + 1}
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                            {id}
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                            <img className="w-16 h-16 object-cover" src={productImageUrl} alt={title} />
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                            {title}
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                            ₹{price}
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                            {category}
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                            {qunatity}
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                            {qunatity * price}
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l text-green-600  first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                            {order.status}
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                            {order.addressInfo.name}
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                            {order.addressInfo.address}
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                            {order.addressInfo.pincode}
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                            {order.addressInfo.date}
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                            {order.addressInfo.mobileNumber}
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                            {order.email}
                            </td>
                            <td
                            onClick={()=>deleteProduct(order.id)} 
                            className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-slate-100 text-red-500 cursor-pointer">
                            Delete
                            </td> 
                        </tr>
                        )
                        })}
                    </>
                )
            })}
          </tbody>
        </table>
      </div>
    </div>
    );
}

export default OrderDetail;