import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getOrderStatus, updateOrderStatus } from "./helper/adminapicall";

const GetOrderStatus = () => {
    
    const {user,token} = isAuthenticated();
    const {orderId,userId} = useParams();
    const [getaRedirect,setRedirect] = useState(false);
    const [success,setSucces] = useState(false);
    const [data,setData] = useState([]);
    const [status,setStatus] = useState();
    const navigate = useNavigate();


    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )
    
    const show = (user,token) => (     
     getOrderStatus(userId,token).then(response => {
        setData(response)
     })
    )
    const Redirect = () => {
        if(getaRedirect){
          setTimeout(()=>navigate("/admin/order"),3000)
        }
      }

      const successMessage = () => {
        if(success){
            
            return <h4 className="text-success">Order status updated successfully</h4>
        }
    }
    const handleChange = () => {
        console.log(status)
            updateOrderStatus(userId,token,orderId,{status}).then(
            response => {
                setSucces(true)
                setRedirect(true);
                console.log(response)
            }
            

        ).catch(
            err => console.log(err)
        )
    }

    const handle = event=>{
        const value = event.target.value
        console.log(value)
        setStatus(value)
    }

     useEffect(() =>{
        show(user,token)
           // eslint-disable-next-line react-hooks/exhaustive-deps
     },[])

     const myOrderStatusForm = () => (
        <fom>
            <div className="form-group">
                <p className="lead text-black">Update the Order Status</p>
                <select
                onChange={handle}
              className="form-control"
              placeholder="Status"
            >
              <option>Select</option>
              {data &&
              data.map((cate,index) => (
                <option key={index} value={cate}>{cate}</option>
              ))
              }
            </select>
            <button className= "btn btn-outline-info my-3"onClick={handleChange}>Change Status</button>
            </div>
        </fom>
            

    )

    return (
        <Base title="Order Status" description="Showing you the order Status">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                {goBack()}
                {successMessage()}
                {myOrderStatusForm()}
                {Redirect()}
                </div>
            </div>
        </Base>
    )
}

export default GetOrderStatus;

