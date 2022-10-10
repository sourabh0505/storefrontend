import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getcategory, updateCatgegory } from "./helper/adminapicall";


const UpdateCategory = () => {
    

    const {categoryId} = useParams()
    const [name,setName] = useState();
    const [error,setError] = useState(false)
    const [success,setSucces] = useState(false)
    

    const {user,token} = isAuthenticated();

    const preload = (categoryId) => {
        getcategory(categoryId).then(data=>{
           
                //console.log(data.name)
              setName(data.name)
            
          })
    }
    useEffect(() => {
        preload(categoryId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )
    


    const handleChange = event => {
        setError("");
        setName(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSucces(false)

        updateCatgegory(categoryId,user._id,token,{name}).then(data => {
            if(data.error){
                setError(true)
            }else{
                setError("");
                setSucces(true);
                setName("")
            }
        })
    }
    const successMessage = () => {
        if(success){
            return <h4 className="text-success">Category updated successfully</h4>
        }
    }
    const warningMessage = () => {
        if(error){
            return <h4 className="text-success">Failed to update category</h4>
        }
    }

    const myCategoryForm = () => (
        <fom>
            <div className="form-group">
                <p className="lead">Update the category</p>
                <input type="text" className="form-control my-3" onChange={handleChange} value={name} autoFocus required placeholder="For ex Summer" />
                <button onClick={onSubmit} className="btn btn-outline-info my-3">Update Category</button>
            </div>
        </fom>
    )

    return (
        <Base title="Update a category here" description="Update this category" className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}                    
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}
export default UpdateCategory;
