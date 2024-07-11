<script lang="ts">
  const { children } = $props();
</script>

<nav class="flex justify-between p-2 border-b-2 border-sky-400">
  <div class="my-auto">
    <h1 class="text-2xl">Fabric</h1>
  </div>
  
  <div class="my-auto">
    <div class="text-2xl">Sign In</div>
  </div>
</nav>

{@render children()}