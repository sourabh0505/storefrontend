import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

import Base from "../core/Base";
import { getOrders} from "./helper/adminapicall";



const Order = () => {

    const [orders,setOrder] = useState([])
    const {user,token} = isAuthenticated();

     const preload = () =>{
        getOrders(user._id,token).then(data=>{
            if(data.error){
                console.log(data.error);
            }else{
                console.log(orders)
                setOrder(data);
                console.log(orders)
            }
        })
    }
    useEffect(()=>{
        preload()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Base title="Manage Orders" description="Here you can update or check status of Orders">
            <h2 className="mb-4">All Orders:</h2>
            <Link className="btn btn-info" to={`/admin/dashboard`}>
                <span className="">Admin Home</span>
            </Link>
            <div className="row">
                <div className="col-12">
                <h2 className="text-center text-white my-3">Total {orders.length} orders</h2>
                {orders.map((order,index) => {
                   return( <div className="row text-center mb-2 ">
                    <div className="col-4">
                    <h3 className="text-white text-left">{order._id}</h3>
                    </div>
                    <div className="col-4">
                    <Link
                        className="btn btn-success"
                        to={`/admin/order/${order._id}/status/${user._id}`}
                    >
                        <span className="">Update</span>
                    </Link>
                    </div>
                    <div className="col-4">
                    <div
                        className="btn btn-success"
                    >
                        <span className="">{order.status}</span>
                    </div>
                    </div>
                    </div>
                   )
                })}
                </div>
            </div>
        </Base>
    )
}

export default Order;