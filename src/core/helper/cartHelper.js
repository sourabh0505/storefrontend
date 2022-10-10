export const addItemToCart = (item,next) => {
    let cart = []
    if(window) {
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
    if(window){
        if(localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
}

export const removeItemFromCart = (productId) => {
    let cart = []
    if(window) {
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
    if(window){
        localStorage.removeItem("cart");
        let cart = []
        localStorage.setItem("cart",JSON.stringify(cart));

        next();
    }
}