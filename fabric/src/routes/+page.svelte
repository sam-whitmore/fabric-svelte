<script lang="ts">
  import { fail, redirect } from '@sveltejs/kit'

  let quant = $state(5000)
  let qual = $state('')
  let increased = $state(true)

  function handleSubmit(quant: number, qual: string) {

    // redirect(303, '/dashboard')
  }

</script>


<svelte:window onwheel={(e) => {
  if (e.deltaY < 0) {
    if (increased === true) {
      quant += 200
    } else {
      quant += 100
      increased = true
    }
  }
  else {
    if (increased !== true) {
      quant -= 200
    } else {
      quant -= 100
      increased = false
    }
  }
  // TODO: these should be at the top of the function but 10.2 (10200) was possible due to rendering errors
  if (quant < 0) return quant = 0
  if (quant > 10000) return quant = 10000
}} />

<form id="fabric-survey" class="relative w-screen h-screen" method="POST" action="?/respond" target="_blank">
  <label form="fabric-survey" for="qual-textbox" class="absolute mx-auto top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 text-3xl">How are you?</label>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sky-400 bg-sky-100">
    <input form="fabric-survey" name="quant" id="quant-slider" class="mx-auto hidden" type="range" min="0" max="10000" bind:value={quant}>
    <input form="fabric-survey" name="qual" id="qual-textbox" bind:value={qual} size={qual ? qual.length + 1 : 2} maxlength="12" class="mx-auto pr-1 rounded-l-full text-right bg-transparent min-w-10 pl-1">
    <button form="fabric-survey" type="submit" class="pl-1 pr-2 min-w-10" value={(quant / 1000).toFixed(1)}>{(quant / 1000).toFixed(1)}</button>
  </div>
</form>