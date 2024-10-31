
interface Props {
    title?: string;
    children: React.ReactNode;
    className?: string;
  }


export const CardGeneral = ({ children, 
                                title = "Sin Titulo",  
                                className="cardGeneral" 
                            }: Props) => {
    return (
      <div className={`cardGeneral shadow ${className}`}>
        <div className='text-wrap'>
          <p> { title } </p>
        </div>
          { children }
      </div>
    )
  
    
  }