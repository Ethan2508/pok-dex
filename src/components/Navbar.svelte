<script lang="ts">
  import { navigate } from "svelte-navigator";
</script>

<div class="w-full flex bg-neutral text-neutral-content p-2">
  <button class="btn btn-ghost" on:click={() => navigate("/")}>
    Accueil
  </button>
  <button class="btn btn-ghost" on:click={() => navigate("/search")}>
    Search Bar
  </button>
  <button class="btn btn-ghost" on:click={() => navigate("/pokemon")}>
    Pokemon
  </button>
</div>
