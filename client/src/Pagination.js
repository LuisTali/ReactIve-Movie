const Pagination = ({totalMovies,moviesPerPage,currentPage,setCurrentPage}) =>{

    const totalPages = Math.ceil(totalMovies / moviesPerPage);

    const pageNumbers = []; //Para recorrer el arreglo y crear los indices de las paginas

    for(let i = 1; i <= totalPages; i++){
        pageNumbers.push(i);
    }

    const onPreviousPage = () =>{
        if(currentPage > 1)
        setCurrentPage(currentPage-1);
    }
    const onNextPage = () =>{
        if(currentPage < totalPages)
        setCurrentPage(currentPage+1);
    }
    const onSpecificPage = (n) =>{
        setCurrentPage(n);
    }
    
    return <nav id='pagination'>
      <a className={(currentPage === 1 ? 'isDisabled' : '')} onClick={onPreviousPage}>Previous Page</a>
      <ul>
        {pageNumbers.map((numPage)=>{
            return <li key={numPage}>
                <a className={`${(currentPage === numPage ? 'isCurrent' : '')}`} onClick={()=> onSpecificPage(numPage)}>{numPage}</a> 
            </li>
        })}
      </ul>
      <a className={`${currentPage === totalPages ? 'isDisabled' : ''}`} onClick={onNextPage}>Next Page</a>
    </nav>
  }

export default Pagination;