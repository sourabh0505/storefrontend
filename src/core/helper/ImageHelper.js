import React from "react";
import { API } from "../../backend";


const ImageHelper = ({product}) => {
    const  imageurl = product ? `${API}/product/photo/${product._id}` : `https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg`
    return (
        <div className="rounded border border-success p-2">
            <img
              src={imageurl}
              alt="hi"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
        </div>
    )
}

export default ImageHelper;