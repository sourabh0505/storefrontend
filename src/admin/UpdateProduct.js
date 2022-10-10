import React , {useState,useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getProduct, getCategories,updateaProduct } from "./helper/adminapicall";

const UpdateProduct = () => {

    const {user,token} = isAuthenticated()
    const {productId} = useParams()
    const navigate = useNavigate();

    const [values,setValues] = useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        photo:"",
        categories:[],
        category:"",
        loading: false,
        error:"",
        createdProduct:"",
        getaRedirect:false,
        formData:""
    })

    const {name,description,price,stock,categories,createdProduct,getaRedirect,formData}=values

    const preload = (productId) => {
      getProduct(productId).then(data=>{
        if(data.error) {
          setValues({...values,error: data.error})
        }else{
          preloadCategories()
          setValues({
            ...values,
            name:data.name,
            description: data.description,
            price: data.price,
            categories: data.category_id,
            stock: data.stock,
            formData: new FormData()
          })
        }
      })
    }

    const preloadCategories = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values,error: data.error})
            }else{
                setValues({
                    categories: data,
                    formData:new FormData()
                })
            }
        })
    }

    useEffect(()=>{
      preload(productId);
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error:"",loading: true})

        updateaProduct(productId,user._id,token,formData).then(data =>{
          if(data.error){
            setValues({...values,error:data.error})
          }else{
            setValues({
              ...values,
              name:"",
              description:"",
              price:"",
              photo:"",
              stock:"",
              loading:false,
              createdProduct: data.name,
              getaRedirect:true
            })
          }
        })
    }

    const Redirect = () => {
      if(getaRedirect){
        setTimeout(()=>navigate("/admin/dashboard"),3000)
      }
    }

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name,value);
        setValues({...values,[name]:value})
    }

    const successMeassage = () => (
      <div className="alert alert-success mt-3"
      style={{display: createdProduct ? "" : "none" }}
      >
        <h4>{createdProduct} updated successfully</h4>
      </div>
    )
    
    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success mb-3">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group mb-3">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group mb-3">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group mb-3">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group mb-3">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories &&
              categories.map((cate,index) => (
                <option key={index} value={cate._id}>{cate.name}</option>
              ))
              }
            </select>
          </div>
          <div className="form-group mb-3">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
            Update Product
          </button>
        </form>
      );
     
    return (
        <Base 
        title="Update a product here!"
        description="Welcome to product updation section"
        className="container bg-info p-4"
        >
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMeassage()}
                    {Redirect()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    )
}
export default UpdateProduct; 