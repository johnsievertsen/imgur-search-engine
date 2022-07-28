import React from 'react';

export const SearchForm = ({ onSearchChange, onSearchSubmit }) => {
    return (
        <form onSubmit={onSearchSubmit}>
            <input className="input" type="text" value={localStorage.getItem('searchTerm')} onChange={onSearchChange} placeholder="Search"></input>
            <button className="button">Submit</button>
            <br />
        </form>
    )
}