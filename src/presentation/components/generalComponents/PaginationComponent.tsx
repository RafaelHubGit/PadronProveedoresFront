
import classNames from 'classnames';


interface Props {
    currentPage: number,
    maxPage: number,
    handlePage: ( pageNumber: number ) => void
}

export const PaginationComponent = ({ currentPage, maxPage, handlePage }: Props) => {

  return (
    <div className="d-flex justify-content-end mt-3">
        <nav aria-label="...">
          <ul className="pagination pagination-sm">
            <li 
                className={
                    classNames(
                        "page-item",
                        {
                            'disabled': ((currentPage - 1) === 0)
                        }
                    )
                }
            >
              <a className="page-link">Anterior</a>
            </li>
            <li 
                onClick={ () => handlePage( - 1 ) }
                className={
                    classNames(
                        "page-item",
                        {
                            'disabled': ((currentPage - 1) === 0)
                        }
                    )
                }
            >
                <a className="page-link" href="#"> { currentPage - 1 } </a>
            </li>
            <li className="page-item active" aria-current="page">
              <a className="page-link" href="#">{ currentPage }</a>
            </li>
            <li 
                onClick={ () => handlePage( 1 ) }
                className={
                    classNames(
                        "page-item",
                        {
                            'disabled': ((currentPage + 1) === maxPage)
                        }
                    )
                }
            >
                <a className="page-link" href="#"> { currentPage + 1 } </a>
            </li>
            <li 
                className={
                    classNames(
                        "page-item",
                        {
                            'disabled': ((currentPage + 1) === maxPage)
                        }
                    )
                }
            >
              <a className="page-link" href="#">Siguiente</a>
            </li>
          </ul>
        </nav>
      </div>
  )
}
