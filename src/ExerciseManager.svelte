<script>
	import { createExerciseId } from './helpers/id';

	export let Exercises;

	let hoveredEx = null;
	let name = '';
	let units = 'Reps';

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
	<form class="pl-3 mt-2" on:submit|preventDefault={handleAddExercise}>
		<input
			id="exname"
			class="form-input flex-grow block w-full sm:text-sm sm:leading-5 relative rounded-md shadow-sm"
			placeholder="Name"
			bind:value={name} />
		<select
			aria-label="Units"
			class="form-select relative block w-full py-2 px-3 rounded-md bg-transparent focus:z-10 transition ease-in-out
			duration-150 sm:text-sm sm:leading-5"
			bind:value={units}>
			<option>Reps</option>
			<option>Seconds</option>
		</select>
		<button
			class={`py-2 px-4 text-white rounded ${disabled ? 'bg-gray-300 shadow-inset' : 'bg-teal-500 shadow hover:bg-teal-600'}`}
			type="submit"
			{disabled}>
			Add new
		</button>
	</form>
</div>
