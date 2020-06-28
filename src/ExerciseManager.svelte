<script>
	import { createId } from './helpers/id';

	export let exercises;
	export let Exercises;

	let hoveredEx = null;
	let name = '';
	let units = 'Reps';

	$: disabled = !name || !units;
	// console.log(disabled);

	const handleAddExercise = () => {
		try {
			const data = {
				_id: createId(),
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

	const handleDelete = () => {
		try {
			const data = {
				_id: createId(),
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
	<h1 class="text-2xl">Manage your exercises</h1>
	<!-- <p class="text-gray-700">Or whatever else you may be greasing the groove with...</p> -->
	<ul>
		{#each exercises as ex, index}
			<li
				class={`${index === 0 ? 'border-none' : 'border-t'} border-gray-200 px-4 py-4 flex items-center sm:px-6 hover:bg-gray-50 focus:outline-none
				focus:bg-gray-50`}
				on:mouseover={() => {
					hoveredEx = ex._id;
				}}
				on:mouseleave={() => {
					hoveredEx = null;
				}}>
				<div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
					<div class="text-sm leading-5 font-medium text-teal-600 truncate">
						{ex.name}
						<span class="items-center text-sm leading-5 text-gray-500">({ex.units})</span>
					</div>
				</div>
				<div>
					<button
						class="text-gray-500 hover:text-red-500"
						on:click={() => {
							ex.remove();
						}}>
						Delete
					</button>
				</div>
			</li>
		{/each}
	</ul>
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
			class={`py-2 px-4 text-white rounded ${disabled ? 'bg-gray-400 shadow-inset' : 'bg-teal-500 shadow hover:bg-teal-600'}`}
			type="submit"
			{disabled}>
			Add new
		</button>
	</form>
</div>
