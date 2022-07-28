import React from 'react';

export const SortSelector = ({ onSearchParamChange, searchParam, currentPage, onChangePage, }) => {
    currentPage = Number.parseInt(currentPage);

    return (
        <span>Sort by:&nbsp;&nbsp;
            <select className="button" onChange={onSearchParamChange} value={searchParam}>
                <option value='time'>time</option>
                <option value='viral'>viral</option>
                <option value='top'>top</option>
            </select>
            <span className='pageSelector'>
                <p>on page: </p>
                {(currentPage - 3) >= 1 ? (<>
                    <a href={'javascript:void(0);'} onClick={onChangePage}>1</a>&nbsp;,&nbsp;&nbsp;
                    <a href={'javascript:void(0);'} onClick={onChangePage}>{currentPage - 2}</a>&nbsp;,&nbsp;&nbsp;
                    <a href={'javascript:void(0);'} onClick={onChangePage}>{currentPage - 1}</a>&nbsp;,&nbsp;&nbsp;
                </>) : (<><a href={'javascript:void(0);'} onClick={onChangePage}>1</a>&nbsp;,&nbsp;&nbsp;</>)}
                <a href={'javascript:void(0);'} >{`<-- ${currentPage} -->`}</a>&nbsp;,&nbsp;&nbsp;
                <a href={'javascript:void(0);'} onClick={onChangePage}>{currentPage + 1}</a>&nbsp;,&nbsp;&nbsp;
                <a href={'javascript:void(0);'} onClick={onChangePage}>{currentPage + 2}</a>&nbsp;,&nbsp;&nbsp;
                <a href={'javascript:void(0);'} onClick={onChangePage}>{currentPage + 5}</a>
            </span>
        </span>
    )
}