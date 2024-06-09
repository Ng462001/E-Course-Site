import React from 'react'
import { HashLoader } from "react-spinners";
import '../css/Loader.css';

const Loader = ({ load }) => {
    return load && (
        <div className="loading-spinner-container">
            <div className="loading-spinner">
                <HashLoader color="#36d7b7" />
            </div>
        </div>
    )
}

export default Loader