<script>
	import { createExerciseId } from './helpers/id';

	export let Exercises;

	let name = '';
	let units = '';
	let adding = false;

	$: disabled = !name || !units;

	const handleAddExercise = () => {
		try {
			const data = {
				_id: createExerciseId(),
				name,
				units,
			};
			Exercises.insert(data);
			name = '';
			units = '';
			adding = false;
		} catch (err) {
			console.error(err);
		}
	};
</script>

<style>
	form {
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: 1fr auto auto;
	}
</style>

<div>
	{#if adding}
		<form class="pl-3 mt-2" on:submit|preventDefault={handleAddExercise}>
			<input
				id="exname"
				class="form-input flex-grow block w-full sm:text-sm sm:leading-5 relative rounded-md shadow-sm"
				placeholder="Name"
				bind:value={name} />
			<input
				id="exunits"
				class="form-input flex-grow block w-full sm:text-sm sm:leading-5 relative rounded-md shadow-sm"
				placeholder="Units"
				bind:value={units} />
			<button
				class={`py-2 px-4 text-white rounded ${disabled ? 'bg-gray-300 shadow-inset' : 'bg-teal-500 shadow hover:bg-teal-600'}`}
				type="submit"
				{disabled}>
				Add
			</button>
		</form>
	{:else}
		<button class="w-full text-teal-600 border rounded border-dashed border-teal-600 p-4" on:click|preventDefault={() => (adding = true)} type="button">Add new</button>
	{/if}
</div>
