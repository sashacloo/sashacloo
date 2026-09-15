// Is someone signed in to the Sanity studio in this browser?
//
// The studio's session cookie belongs to api.sanity.io, so asking costs a
// cross-site request with credentials. That only answers honestly when
// https://cloo.ooo is a CORS origin with "Allow credentials" ticked in the
// Sanity dashboard, AND the browser permits third-party cookies. Anything
// else — blocked cookie, missing CORS, offline — reads as signed out, which
// just leaves the edit affordances hidden.
const USERS_ME = 'https://1ql581l8.api.sanity.io/v2021-06-07/users/me'

export const useSanityUser = () => {
  const user = useState('sanityUser', () => null)
  const checked = useState('sanityUserChecked', () => false)

  const check = async () => {
    if (checked.value || !import.meta.client) return user.value
    checked.value = true

    try {
      const response = await fetch(USERS_ME, { credentials: 'include' })
      if (!response.ok) return null
      const data = await response.json()
      // Signed out answers with an empty object rather than an error
      user.value = data?.id ? data : null
    } catch (e) {
      user.value = null
    }

    return user.value
  }

  return { user, check }
}
