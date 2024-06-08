import React from "react";
import './showcase.styles.css'
import Navbar from "../navbar/Navbar";
import SearchInputForm from "../../forms/searchInputForm/SearchInputForm";

const Showcase = () => {
    return (
        <section className="showcase-container">
            <Navbar darkTheme={false}/>
            
            <div className="overlay"></div>
            <div className="showcase-content">
                <h1>Best <span className="text-primary">Books </span>Available</h1>
                <p>Find the books that you want from our Library</p>
                
                <SearchInputForm darkTheme={ true }/>
            </div>
        </section>
    )
}

export default Showcase;