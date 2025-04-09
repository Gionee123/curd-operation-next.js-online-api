"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from 'next/link';
import { useParams } from 'next/navigation';


export default function Course_view() {
    const [loading, setloading] = useState(false) // loading dekh ne ke liye
    let use = useParams()
    console.log("use", use)

    const [courses, setCourses] = useState([]);
    const [deleteplusstatuschange, setdeleteplusstatuschange] = useState(false) //delete aur status change  both same use
    const [multiidsget, setmultiidsget] = useState([]) // mutiple ids get fors multiple delete
    useEffect(() => {
        setloading(true)
        axios.post('https://node-js-curd-operation.onrender.com/api/backend/courses/view')
            .then((response) => {
                console.log(response.data)
                if (response.data.status == true) {
                    setCourses(response.data.data)
                    setloading(false)

                }
                else {
                    setCourses([])
                    setloading(false)

                }                // setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setloading(false); // इस लाइन को जरूर जोड़ें
            });
    }, [deleteplusstatuschange]);


    // delete api
    let deletecourse = (id) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;

        let data = {
            id: id
        }
        console.log("data", data)

        axios.post("https://node-js-curd-operation.onrender.com/api/backend/courses/delete", data).then((response) => {

            if (response.data.status == true) {
                setdeleteplusstatuschange(!deleteplusstatuschange)
                toast.success("Course deleted successfully!");

            }

            else {
                toast.error(response.data.message);

            }
        })
            .catch((err) => {
                console.error("Delete Error:", err.message);
                toast.error("Something went wrong while deleting!");
            });

    }
    //statuschange y api
    let statuschange = (id, status) => {
        let data = {
            id: id,
            status: !status // !status इसका मतलब है कि अगर कोर्स true (Active) है, तो false (Inactive) कर देंगे, और अगर false है, तो true कर देंगे।
        }
        console.log("data", status)


        axios.put("https://node-js-curd-operation.onrender.com/api/backend/courses/change-status", data).then((response) => {

            if (response.data.status == true) {
                setdeleteplusstatuschange(!deleteplusstatuschange)
                toast.success("Course status updated successfully!");

            }

            else {
                toast.error(response.data.message);

            }
        })
            .catch((err) => {
                console.error("Delete Error:", err.message);
                toast.error("Something went wrong while updating status!");
            });

    }

    //multidelete ke liye pehal multiselec karna padga
    let multiselect = (id) => {

        let updatemultipleIds = [...multiidsget]; // मौजूदा IDs की कॉपी बनाएं
        console.log(updatemultipleIds)
        if (updatemultipleIds.includes(id)) {
            // अगर ID पहले से सेलेक्टेड है, तो उसे लिस्ट से हटा दें
            updatemultipleIds = updatemultipleIds.filter((value) => value !== id);
        } else {
            // अगर ID सेलेक्टेड नहीं है, तो उसे लिस्ट में जोड़ें
            updatemultipleIds.push(id);
        }
        setmultiidsget(updatemultipleIds); // स्टेट अपडेट करें
    };
    let multideletecourse = () => {
        if (multiidsget.length === 0) {
            toast.error("Please select at least one course to delete!");
            return;
        }

        if (!window.confirm("Are you sure you want to delete selected courses?")) return;
        let data = {
            ids: multiidsget
        }
        console.log("data", data)

        axios.post("https://node-js-curd-operation.onrender.com/api/backend/courses/multiple-delete", data).then((response) => {

            if (response.data.status == true) {
                setdeleteplusstatuschange(!deleteplusstatuschange)
                toast.success("Course deleted successfully!");
                setmultiidsget([]);  // ✅ Deleted IDs Clear करें

            }
            else {
                toast.error(response.data.message);

            }
        })
            .catch((err) => {
                console.error("Delete Error:", err.message);
                toast.error("Something went wrong while deleting!");
            });

    }

    return (
        <div className="flex justify-center">
            <ToastContainer position="top-right" autoClose={100} />

            <div className="w-full max-w-6xl">
                <div className="bg-white shadow overflow-auto rounded-lg">
                    <button
                        className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-lg rounded-md shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center ${multiidsget.length === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                            }`}
                        onClick={multideletecourse}
                        disabled={multiidsget.length === 0} >
                        <span className="font-semibold">Multiple</span>
                        <span className="font-semibold">Delete</span>
                    </button>

                    <table className="max-w-full overflow-auto divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">


                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">name</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">image</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">price</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">duration</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">description</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">order</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">delete</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {courses.length > 0 ? courses.map((value, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type='checkbox'
                                            checked={multiidsget.includes(value._id)}
                                            onChange={() => multiselect(value._id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        <div className='w-[100px] overflow-auto '>
                                            {value.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        {value.image}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        ${value.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        ${value.duration}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        ${value.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        ${value.order}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                        <div className="flex justify-center space-x-4">
                                            <button className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition duration-300" onClick={() => deletecourse(value._id)}>
                                                <FaTrash className="mr-2" />delete
                                            </button>
                                            <Link href={`/course_add/${value._id}`}>
                                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300 flex items-center">
                                                    <FaEdit className="mr-2" /> Edit
                                                </button>
                                            </Link>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        {
                                            (value.status == 1) ? <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" onClick={() => statuschange(value._id, value.status)}>
                                                Active
                                            </button> : <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={() => statuschange(value._id, value.status)}>
                                                Inactive
                                            </button>
                                        }
                                    </td>

                                </tr>

                            )) : <tr>
                                <td colSpan="10" className="text-center py-8 text-gray-500">
                                    {
                                        loading && <div role="status" className="flex justify-center items-center">
                                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    }
                                </td>
                            </tr>}
                        </tbody>
                    </table>
                </div>
            </div >
        </div >)
}
