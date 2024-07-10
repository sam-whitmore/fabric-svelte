<script lang="ts">
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte'
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte'
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte'

  const { children } = $props();
</script>

<nav class="flex justify-between p-2 border-b-2 border-sky-400">
  <div>
    <h1 class="text-3xl">Fabric</h1>
  </div>
  
  <div>
    <SignedIn>
      <UserButton afterSignOutUrl="/"/>
    </SignedIn>
    <SignedOut>
      <a href="/sign-in">Sign in</a> <span>|</span> <a href="/sign-up">Sign up</a>
      <!-- You could also use <SignInButton mode="modal" /> and <SignUpButton mode="modal" /> here -->
    </SignedOut>
  </div>
</nav>
<SignedIn let:user>
  {@render children()}
</SignedIn>
<SignedOut>

</SignedOut>