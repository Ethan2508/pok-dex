<script lang="ts">
  export let promise: Promise<void>
</script>

{#await promise}
  <slot name="waiting">Waiting</slot>
{:then results}
  <slot name="content">
    <div>Default content</div>
  </slot>
{:catch error}
  <slot name="error">There was an api error</slot>
{/await}
