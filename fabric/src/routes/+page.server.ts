import type { Actions, RequestEvent } from './$types';

export const actions = {
  respond: async (event: RequestEvent) => {	
    const data = await event.request.formData()
    const currQuant = data.get('quant')
    const currQual = data.get('qual')

    console.log({ currQual, currQuant })
	},
} satisfies Actions;