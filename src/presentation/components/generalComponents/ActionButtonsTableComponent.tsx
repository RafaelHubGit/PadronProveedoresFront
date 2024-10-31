

interface Props{
    view?: boolean;
    edit?: boolean;
    del?: boolean;
}

export const ActionButtonsTableComponent = ({ view = true, edit = true, del = true } : Props) => {
  return (
    <div>
        <div className="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
            {
                view ? 
                (
                    <button type="button" className="btn btn-outline-info d-flex align-items-center">
                        <span className="material-symbols-outlined">
                            visibility
                        </span>
                    </button>                
                ) : ''
            }
            {
                edit ? (
                    <button type="button" className="btn btn-outline-primary d-flex align-items-center">
                        <span className="material-symbols-outlined">
                            edit_square
                        </span>
                    </button>
                ): ''
            }
            {
                del ? (
                    <button type="button" className="btn btn-outline-danger d-flex align-items-center">
                        <span className="material-symbols-outlined">
                            delete
                        </span>
                    </button>
                ): ''
            }
        </div>
    </div>
  )
}
