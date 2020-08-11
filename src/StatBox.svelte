<script>
	export let label;
	export let stat;
</script>

<style>
	.stat {
		min-height: 4.75rem;
	}
</style>

<div class="mx-auto w-40 rounded border border-teal-800 text-center">
	<div class="bg-teal-800 text-white p-2">{label}</div>
	<div class="stat p-2 text-xl text-teal-700">{stat}</div>
</div>
