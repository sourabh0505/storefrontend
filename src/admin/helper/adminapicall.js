import { API } from "../../backend";


export const createCategory = (userId, token,category) => {
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body : JSON.stringify(category)
    }).then(response =>{
        return response.json()
    }).catch(err=>console.log(err));
}

//get all categories
export const getCategories = () => {
    return fetch(`${API}/categories`,{
        method: "GET"
    }).then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

//delete a category
export const deleteCategory =  (categoryId,userId,token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method: "DELETE",
        headers: {
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

//update a category
export const updateCatgegory = (categoryId,userId,token,category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"PUT",
        headers: {
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(category)
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

//get a Category
export const getcategory = categoryId => {
    return fetch(`${API}/category/${categoryId}`,{
        method:"GET"
    }).then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

//products call
//create a Product
export const createaProduct = (userId, token, product) => {
    console.log(product)
    return fetch(`${API}/product/create/${userId}`,{
        method: "POST",
        headers: {
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err));
}
// get all products
export const getProducts = () => {
    return fetch(`${API}/products`,{
        method: "GET"
    }).then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

//get all Orders
export const getOrders = (userId,token) =>{
    return fetch(`${API}/order/all/${userId}`,{
        method:"GET",
        headers: {
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

//delete a product
export const deleteaProduct = (productId,userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "DELETE",
        headers: {
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err));
}

//get a product

export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    }).then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

//update a product
export const updateaProduct = (productId,userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "PUT",
        headers: {
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err));
}


export const getOrderStatus = (userId,token) => {
    return fetch(`${API}/order/status/${userId}`,{
        method:"GET",
        headers: {
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err));
}

export const updateOrderStatus = (userId,token,orderId,status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`,{
        method:"PUT",
        headers : {
            Accept:"application/json", 
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(status)
    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err));
}