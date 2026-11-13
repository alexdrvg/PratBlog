// Llegir el token d'identitat (JWT) que ens dona Google
// ------------------------------------------------------------
/**
 * TODO 4 · Descodifica la credencial (un JWT) i retorna els claims.
 * Fes servir jwtDecode<ClaimsGoogle>() de la llibreria 'jwt-decode'.
 * ATENCIÓ: descodificar NO és verificar (no es comprova la firma).
 */


import { jwtDecode } from 'jwt-decode'
import type { ClaimsGoogle, Sessio, Usuari } from './tipus.ts'

export function descodificaCredencial(credencial: string): ClaimsGoogle {
  return jwtDecode<ClaimsGoogle>(credencial)
}

/**
 * TODO 5 · Converteix els claims de Google al nostre tipus Usuari.
 *   id ← sub · nom ← name · email ← email · foto ← picture · emailVerificat ← email_verified
 */
export function claimsAUsuari(claims: ClaimsGoogle): Usuari {
  return {
    id: claims.sub,
    nom: claims.name,
    email: claims.email,
    foto: claims.picture,
    emailVerificat: claims.email_verified,
  }
}

/**
 * TODO 6 · Crea una Sessio a partir de la credencial.
 * Compte: exp ve en SEGONS i Date.now() va en MIL·LISEGONS.
 */
export function creaSessio(credencial: string): Sessio {
  const claims = descodificaCredencial(credencial)
  return {
    usuari: claimsAUsuari(claims),
    credencial,
    caduca: claims.exp * 1000,
  }
}

/** Una sessió ha caducat quan l'hora actual ja ha passat l'instant «caduca». */
export function haCaducat(sessio: Sessio): boolean {
  return Date.now() >= sessio.caduca
}
