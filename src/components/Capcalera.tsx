// Capçalera: menú + qui hi ha connectat + botó de sortir
// ------------------------------------------------------------
import { startTransition } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useSessio } from '../auth/useSessio.ts'
import { Avatar } from './Avatar.tsx'

export function Capcalera() {
  const { sessio, esAdmin, tancaSessio } = useSessio()
  const navega = useNavigate()

  // Tancar sessió i tornar a la portada en un sol repintat. Si no, si
  // érem a /admin, RutaAdmin veuria la sessió buida abans del canvi de
  // ruta i ens enviaria a /login en comptes de /.
  function surt() {
    startTransition(() => {
      tancaSessio()
      navega('/')
    })
  }

  return (
    <header className="capcalera">
      <NavLink to="/" className="logo">
        📝 PratBlog
      </NavLink>

      <nav className="menu">
        <NavLink to="/" end>
          Articles
        </NavLink>
        <NavLink to="/admin">Administració</NavLink>
      </nav>

      <div className="usuari">
        {sessio ? (
          <>
            <Avatar usuari={sessio.usuari} />
            <span className="nom">{sessio.usuari.nom}</span>
            {esAdmin && <span className="etiqueta">Admin</span>}
            <button type="button" className="boto boto-secundari" onClick={surt}>
              Surt
            </button>
          </>
        ) : (
          <NavLink to="/login" className="boto">
            Inicia la sessió
          </NavLink>
        )}
      </div>
      
      <div className="usuari">
        <NavLink to="/login" className="boto">
          Inicia la sessió
        </NavLink>
      </div>
    </header>
  )
}
