import React from 'react';

export const SearchForm = ({ searchTerm, onSearchChange, onSearchSubmit, onSearchParamChange, searchParam }) => {
    return (
        <form onSubmit={onSearchSubmit}>
            <input type="text" value={searchTerm} onChange={onSearchChange} placeholder="Search"></input>
            <button>Submit</button>
            <select onChange={onSearchParamChange} value={searchParam}>Search by:
                <option value='time'>time</option>
                <option value='viral'>viral</option>
                <option value='top'>top</option>
            </select>
        </form>
    )
}