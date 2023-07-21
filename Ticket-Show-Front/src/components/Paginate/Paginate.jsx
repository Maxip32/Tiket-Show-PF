import React from "react";


const Paginate = ({eventsPerPage, allevents,paginate, currentPage, setCurrentPage}) => {

    const pageNumbers = []

    for (let i=0; i < Math.ceil(allevents/eventsPerPage); i++) {
        pageNumbers.push(i+1)
    }

    const totalPages = Math.ceil(allevents/eventsPerPage)

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage -1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
    }

    return (
        <div>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Atrás</button>
            {
                pageNumbers?.map(number => (
                    <button key={number} onClick={() => paginate(number)}>{number}</button>
                ))
            }

            <button onClick={handleNextPage}disabled={currentPage === totalPages}>Siguiente</button>
        </div>
    )
}

export default Paginate