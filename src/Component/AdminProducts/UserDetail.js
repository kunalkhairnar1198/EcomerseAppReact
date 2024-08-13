import useGetUser from "../../Hooks/useGetUser";

const UserDetail = () => {
    const {user} = useGetUser()
    console.log(user)
    return (
        <div>
            <div>
            <div className="py-5 flex justify-between items-center">
                {/* text  */}
                <h1 className=" text-xl text-slate-700 font-bold">All User </h1>
            </div>

            {/* table  */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border border-collapse sm:border-separate border-medium--dark text-slate-700" >
                        <tbody>
                            <tr>
                                <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-medium--dark text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>
                                <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-medium--dark text-slate-700 bg-slate-100 font-bold fontPara">Name</th>
                                <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-medium--dark text-slate-700 bg-slate-100 font-bold fontPara">Email</th>
                                <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-medium--dark text-slate-700 bg-slate-100 font-bold fontPara">Uid</th>
                                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Role</th>
                                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Date</th>
                            </tr>
                           
                           {user.map((item,index)=>{
                            const {date,email,id,name,role,uid } = item
                            return(
                                <tr className=" text-high--dark mb-4" key={id}>
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0  stroke-slate-500 text-slate-500 ">
                                {index + 1}
                                </td>
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                    {name}
                                </td>
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                                    {email}
                                </td>
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0  stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                                    {uid}
                                </td>
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0  stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                                    {role}
                                </td>
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0  stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                                    {date}
                                </td>
                            </tr>
                            )
                           })   
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;