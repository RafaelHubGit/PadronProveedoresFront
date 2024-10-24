
import logo from '../../../assets/logo.png';

export const HeaderComponent = () => {
  return (
    <div className="hcom">
        <div className="hcom__container">
            <div className="hcom__system">
                <div className="hcom__logo">
                    <img src={logo} alt="Senado de la República" />
                </div>
                <div className="hcom__title">
                    <p className='roboto-thin'>SISTEMA DE</p>
                    <p>PADRÓN DE PROVEEDORES </p>
                </div>
            </div>
            <div className="hcom__people">
                <div className='hcom__name '>
                    JOHN DOE 
                </div>
                <div>
                    <span className="material-symbols-outlined">
                        account_circle
                    </span>
                </div>
            </div>
        </div>
        <div className="hcom__menu-container">
            menuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
        </div>
    </div>
  )
}
