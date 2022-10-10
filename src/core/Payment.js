import DropIn from "braintree-web-drop-in-react";
import React,{useState,useEffect, useCallback} from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import { getmeToken, processPayement } from "./helper/paymenthlper";


const Payment = ({products, setReload = f => f, reload = undefined}) => {
    
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken:null,
        error: "",
        instance:{}
    })
    
    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getmeToken(userId, token).then(info => {
           //console.log("Information",info)
            if(info.error) {
                setInfo({...info, error: info.error})
           }else{
            const clientToken = info.clientToken
            setInfo({clientToken})
           } 
        })
    }

    const showbtdropIn = () => {
        return(
            <div>
                {info.clientToken !== null && products.length>0 ? (
                    <div>
                    <DropIn
                      options={{ authorization: info.clientToken }}
                      onInstance={(instance) => (info.instance = instance)}
                    />
                    <button onClick={onPurchase}>Buy</button>
                  </div>
                ) : (<h3>PLease login or add something to cart</h3>)}
            </div>
        )
    }

    useEffect(() => {
        getToken(userId,token)
    },[])

    const onPurchase = () => {
        setInfo({loading: true})
        let nonce;
        let getNonce = info.instance
        .requestPaymentMethod()
        .then(data => {
            nonce = data.nonce
            const paymentData = {
                paymentMethodNonce: nonce,
                amount:getAmount()
            }
            processPayement(userId,token,paymentData)
            .then(response => {
                setInfo({...info, success:response.success,loading: false})
                console.log("payment success")
                const orderData = {
                    products: products,
                    transaction_id:response.transaction.id,
                    amount: response.transaction.amount
                }
                createOrder(userId,token,orderData)
                console.log("you are going in right direction");
                cartEmpty(() => {
                    console.log("Did we get a crash?");
                })
                setReload(!reload)
            })
            .catch(err => {
                setInfo({loading: false, success: false})
                console.log(err)
                console.log("payment error")
            })
        })
    }

    const getAmount = () => {
        let amount = 0
        products.map(p => {
            amount = amount +p.price
        })
        return amount
    }

    return (
        <div>
            <h3>Your bill is {getAmount()}</h3>
            {showbtdropIn()}
        </div>
    )
}

export default Payment;