<script>
	import { createId } from './helpers/id';
	import { initDb } from './helpers/db';
	// import PouchDB from 'pouchdb-browser';
	import Stats from './Stats.svelte';
	// const Exercises = new PouchDB('exercises');

	let name;
	let units;

	const db = initDb();

	const handleAddExercise = async () => {
		try {
			const {Exercises} = await db;
			const data = {
				_id: createId(),
				name,
				units,
			};
			const res = await Exercises.insert(data);
			name = '';
			units = '';
			console.log(res);
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	};
</script>

<main class="p-4">
	<h1>Manage exercises</h1>
	<input class="p-2 border border-gray-500 rounded" placeholder="Name" bind:value={name} />
	<input class="p-2 border border-gray-500 rounded" placeholder="Units" bind:value={units} />
	<button class="py-2 px-4 bg-green-500 shadow text-white rounded hover:bg-green-600" on:click={handleAddExercise}>
		Add
	</button>
	{#await db then d}
		<Stats Exercises={d.Exercises} />
	{/await}
</main>
