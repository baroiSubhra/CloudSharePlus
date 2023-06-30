export const DOCUMENTS = 'documents'
export const RECENTS = 'recents'
export const FAVOURITES = 'favourites'
export const TRASH = 'trash'
export const ROUTE_MAP = new Map([
  [DOCUMENTS, '/dashboard'],
  [RECENTS, '/dashboard/recents'],
  [FAVOURITES, '/dashboard/favourites'],
  [TRASH, '/dashboard/trash']
])

export const COLOR_THEME_SELECTOR_KEY = 'color-theme'

export const EMAIL_LOCALSTORAGE_KEY = 'csp_email'

export const IMAGE_FORMAT = ['png', 'jpg', 'jpeg', '.webp']

export const PAGE_TITLE_MAPPING = new Map([
  [DOCUMENTS, 'All Documents'],
  [RECENTS, 'Recent Documents'],
  [FAVOURITES, 'Favourite Documents'],
  [TRASH, 'Items for Trash will be deleted in 30 days']
])
