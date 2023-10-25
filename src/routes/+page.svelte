<script>
    import{ page } from '$app/stores';
</script>

{#if $page.data.user}
    Welcome {$page.data.user}
{/if}