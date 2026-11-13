// Pàgina /login: el botó de Google connectat a la sessió
// ------------------------------------------------------------
import { useState } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useSessio } from '../auth/useSessio.ts'
import { GoogleLogin } from '@react-oauth/google'

export function Login() {
  const { sessio, iniciaSessio } = useSessio()
  const ubicacio = useLocation()
  const [error, setError] = useState<string | null>(null)

  // RutaAdmin ens envia aquí amb state.desDe = la pàgina que es volia veure.
  // Si s'ha arribat directament a /login, després anirem a /admin.
  const desDe = (ubicacio.state as { desDe?: string } | null)?.desDe ?? '/admin'

  // Quan ja hi ha sessió, no cal fer login: tornem on es volia anar.
  // (Això és el que ens «redirigeix» just després del TODO 10.)
  if (sessio) return <Navigate to={desDe} replace />

  return (
    <section className="targeta centrada">
      <h1>Accés a l’administració</h1>
      <p>Entra amb el teu compte de Google. Només els administradors podran gestionar els articles.</p>
      <div className="boto-google">
        <GoogleLogin
          onSuccess={(resposta) => {
            try {
              setError(null)
              iniciaSessio(resposta.credential ?? '')
            } catch {
              setError('La credencial de Google no és vàlida.')
            }
          }}
          onError={() => setError('Google no ha pogut completar l’inici de sessió.')}
          text="signin_with"
          shape="pill"
          size="large"
        />
      </div>
      {error && <p className="error">{error}</p>}
    </section>
  )
}
