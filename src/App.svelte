<script lang="ts">
  import { Router, Route } from "svelte-navigator"
  import Articles from "src/pages/Articles.svelte"
  import Home from "./pages/Home.svelte"
  import Navbar from "./components/Navbar.svelte"
  import Pokemon from "./pages/Pokemon.svelte"
  import SinglePokemon from "./pages/SinglePokemon.svelte"
  import Search from "./pages/search.svelte"
</script>

<Router>
  <Navbar />
  <Route path="/">
    <Home />
  </Route>
  <Route path="/pokemon">
    <Pokemon />
  </Route>
  <Route path="/pokemon/:id">
    <SinglePokemon />
  </Route>
  <Route path="/search">
    <Search />
  </Route>
</Router>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
