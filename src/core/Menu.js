import React,{Fragment} from "react";
import {Link} from "react-router-dom";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";  
  
import { isAuthenticated, signout} from "../auth/helper";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      //console.log(location.pathname);
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }
const currentTab = (location,path) => {
    //console.log(location);
    if(location.pathname === path){
        return {color: "#2ecc72"}
    } else {
        return {color: "#FFFFFF"}
    }
}  


const Menu = ({router}) => {
    return(
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link style ={currentTab(router.location,"/")} className="nav-link" to="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link style ={currentTab(router.location,"/cart")} className="nav-link" to="/cart">
                    Cart
                </Link>
            </li>
            { isAuthenticated() && isAuthenticated().user.role===0 && (<li className="nav-item">
                <Link style ={currentTab(router.location,"/user/dashboard")} className="nav-link" to="/user/dashboard">
                    DashBoard
                </Link>
            </li>)}
            {isAuthenticated() && isAuthenticated().user.role===1&&(<li className="nav-item">
                <Link style ={currentTab(router.location,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">
                    A. DashBoard
                </Link>
            </li>)}
            
            { !isAuthenticated() && (
                <Fragment>
                <li className="nav-item">
                    <Link style ={currentTab(router.location,"/signup")} className="nav-link" to="/signup">
                        Signup
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style ={currentTab(router.location,"/signin")} className="nav-link" to="/signin">
                        Signin
                    </Link>
                </li>
                </Fragment>
            )}
            { isAuthenticated() && (
                <li className="nav-item">
                    <span className="nav-link text-warning" onClick={()=>{
                        signout(()=>{
                            router.navigate("/signin");
                        })
                    }}>Signout</span>
                </li>
                )
            }
        </ul>
    </div>
)}

export default withRouter(Menu);