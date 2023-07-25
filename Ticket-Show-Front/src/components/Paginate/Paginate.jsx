const Paginate = ({
  eventsPerPage,
  allEvents,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allEvents / eventsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  const totalPages = Math.ceil(allEvents / eventsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="list-style-none flex ">
      <button
        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Atrás
      </button>
      {pageNumbers?.map((number) => (
  <button
    className={`relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium 
    text-primary-700 transition-all duration-300 ${
      number === currentPage
        ? "bg-primary-700 text-secondaryColor"
        : "bg-primary-100 text-primary-700"
    }`}
    key={number}
    onClick={() => paginate(number)}
  >
    {number}
  </button>
))}

      <button
        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginate;
