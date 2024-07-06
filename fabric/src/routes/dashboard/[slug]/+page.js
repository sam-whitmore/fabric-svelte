import { error } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  if (params.slug === 'sam') {
    return {
      firstName: 'Sam',
      surname: 'Collins',
      quant: 7,
      qual: 'Silky'
    }
  }

  error(404, 'Not found')
}