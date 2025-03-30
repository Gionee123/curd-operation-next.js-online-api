"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function Course_add() {

    const [formSubmit, setformSubmit] = useState(false)

    let params = useParams() //useParams() URL से ID प्राप्त करने के लिए उपयोग होता है।
    console.log(params.id) //console.log(params.id); यह चेक करने के लिए है कि ID सही से मिल रही है या नहीं।

    // details api ke liye "input","setinput" use liya hai
    let [input, setinput] = useState({
        name: "",
        image: "",
        price: "",
        order: "",
        duration: "",
        description: "",
        status: "",

    })
    //details api start
    useEffect(() => {
        if (params.id != undefined) {
            axios.post('https://node-js-curd-operation.onrender.com/api/backend/courses/details/' + params.id)
                .then((result) => {
                    console.log(result.data.data)
                    setinput({
                        name: result.data.data.name,
                        image: result.data.data.image,
                        price: result.data.data.price,
                        order: result.data.data.order,
                        duration: result.data.data.duration,
                        description: result.data.data.description,
                        status: result.data.data.status,
                    })

                    console.log(result.data.data)
                }).catch((error) => {
                    console.error(error);
                    toast.error(error.response?.data?.message || 'An error occurred');
                })
        }

    }, [])
    //details api End




    let submitHandler = (event) => {
        event.preventDefault(); // Prevent page refresh
        let dataSava = {
            name: event.target.name.value,
            price: event.target.price.value,
            image: event.target.image.value,
            duration: event.target.duration.value,
            description: event.target.description.value,
            order: event.target.order.value,
            status: event.target.status.value,
        }


        if (params.id == undefined) {
            axios.post("https://node-js-curd-operation.onrender.com/api/backend/courses/add", dataSava).then((result) => {

                if (result.data.status == true) {
                    setformSubmit(true)
                    toast.success('Course created successfully!');

                }
                else {
                    toast.error(result.data.message || 'Failed to create course');
                }

                console.log(result.data.data)
            }).catch((error) => {
                console.error(error);
                toast.error(error.response?.data?.message || 'An error occurred');
            })

        }
        else {
            dataSava.id = params.id;
            axios.put("https://node-js-curd-operation.onrender.com/api/backend/courses/updata", dataSava).then((result) => {

                if (result.data.status == true) {
                    setformSubmit(true)
                    toast.success('Course updated successfully!'); // ✅ Message Updated

                }
                else {
                    toast.error(result.data.message || 'Failed to update course'); // ✅ Message Updated
                }

                console.log(result.data.data)
            }).catch((error) => {
                console.error(error);
                toast.error(error.response?.data?.message || 'An error occurred while updating the course'); // ✅ More Specific Error Message
            })
        }

    }

    // update ke liye
    let inputHander = (event) => {
        let data = { ...input } //input State का एक Shallow Copy बना रहे हैं, ताकि हम Original State को Directly Modify न करें।
        data[event.target.name] = event.target.value; //जो Input Field Change हुआ है, उसकी name और value लेकर data में Update कर रहे हैं।
        setinput(data)
    }


    const router = useRouter();
    useEffect(() => {
        if (formSubmit == true) {
            router.push('/course_view');  // ✅ Next.js में navigation का सही तरीका
        }
        //jab bhi "formsubmit" me kuch chage aaye chal jana
    }, [formSubmit]) //जब formSubmit बदलेगा, तब useEffect चलेगा



    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <ToastContainer autoClose={100} />

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Create New Course</h2>
                    <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                            <input type="text" name="name" onChange={inputHander} value={input.name}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input type="text" name="image" onChange={inputHander} value={input.image}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                            <input type="text" name="price" onChange={inputHander} value={input.price}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                            <input type="text" name="duration" onChange={inputHander} value={input.duration}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">description</label>
                            <input type="text" name="description" onChange={inputHander} value={input.description}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">order</label>
                            <input type="text" name="order" onChange={inputHander} value={input.order}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="status"
                                    value="1"
                                    checked={
                                        input.status == 1 ? "checked" : ""
                                    }
                                    onChange={inputHander}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                />
                                <label htmlFor="status-active" className="ml-2 text-sm font-medium text-gray-700">
                                    Active
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="status"
                                    value="0"
                                    onChange={inputHander}
                                    checked={
                                        input.status == 0 ? "checked" : ""
                                    }
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                />
                                <label htmlFor="status-deactive" className="ml-2 text-sm font-medium text-gray-700">
                                    Inactive
                                </label>
                            </div>
                        </div>

                        <div className="md:col-span-2 lg:col-span-4">
                            <button type="submit"
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                {
                                    params.id == undefined ? 'submit' : 'update'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>


        </>)
}
