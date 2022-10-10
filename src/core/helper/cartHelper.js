export const addItemToCart = (item,next) => {
    let cart = []
    if(typeof window !==  "undefined") {
       // console.log(cart);
       //console.log(window.localStorage.getItem("cart"))
        if(window.localStorage.getItem("cart")) {
            cart = JSON.parse(window.localStorage.getItem("cart"))
        }
        //console.log(cart);
        cart.push({
            ...item,
            count:1
        })
        window.localStorage.setItem("cart",JSON.stringify(cart))
        next();
    }
}


export const loadCart = () => {
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"));
        }
    }else{
        return [];
    }
}

export const removeItemFromCart = (productId) => {
    let cart = []
    if(typeof window !==  "undefined") {
        // console.log(cart);
        //console.log(window.localStorage.getItem("cart"))
         if(window.localStorage.getItem("cart")) {
             cart = JSON.parse(window.localStorage.getItem("cart"))
         }
         cart.forEach((product,i) =>{
            if(product._id===productId){
                cart.splice(i,1)
            }
         })
         window.localStorage.setItem("cart",JSON.stringify(cart)) 
     }
     return cart;
}

export const cartEmpty = next => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("cart");
        let cart = []
        localStorage.setItem("cart",JSON.stringify(cart));

        next();
    }
}