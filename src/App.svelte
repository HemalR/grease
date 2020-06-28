<script>
	import { initDb } from './helpers/db';
	import ExerciseManager from './ExerciseManager.svelte';
	import Stats from './Stats.svelte';

	let exercises = [];
	let logs = [];

	const db = initDb();

	db.then(({ Exercises, Logs }) => {
		const exercisesQuery = Exercises.find();
		exercisesQuery.$.subscribe((results) => {
			exercises = results;
		});

		const logsQuery = Exercises.find();
		logsQuery.$.subscribe((results) => {
			logs = results;
		});
	});
</script>

<main class="p-4 mx-auto max-w-xl">
	{#await db then cols}
		<ExerciseManager {exercises} Exercises={cols.Exercises} />

		<!-- <h1>Manage exercises</h1>
		<input class="p-2 border border-gray-500 rounded" placeholder="Name" bind:value={name} />
		<input class="p-2 border border-gray-500 rounded" placeholder="Units" bind:value={units} />
		<button class="py-2 px-4 bg-green-500 shadow text-white rounded hover:bg-green-600" on:click={handleAddExercise}>
			Add
		</button>
		<Stats Exercises={cols.Exercises} Logs={cols.Logs} /> -->
	{/await}
</main>
