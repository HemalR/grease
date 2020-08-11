<script>
	import groupBy from 'lodash/groupBy';
	import mapValues from 'lodash/mapValues';
	import forOwn from 'lodash/forOwn';
	import { initDb } from './helpers/db';
	import ExerciseManager from './ExerciseManager.svelte';
	import Stats from './Stats.svelte';
	import SingleExercise from './SingleExercise.svelte';

	let exercises = [];
	let logs = [];
	let page = 'main';

	const db = initDb();
	let exData;

	db.then(({ Exercises, Logs }) => {
		const exercisesQuery = Exercises.find();
		exercisesQuery.$.subscribe((results) => {
			exercises = results;
			const grouped = groupBy(results, '_id');
			exData = mapValues(grouped, (ex) => ({ total: 0, logs: [] }));
		});

		const logsQuery = Logs.find();
		logsQuery.$.subscribe((results) => {
			logs = results;
			const grouped = groupBy(results, 'exerciseId');
			forOwn(grouped, (exLogs, exId) => {
				if (exData && exData[exId]) {
					const total = exLogs.reduce((runningTotal, log) => {
						return runningTotal + log.qty;
					}, 0);
					exData[exId] = { total, logs: exLogs };
				}
			});
		});
	});
</script>

<main class="bg-teal-800 min-h-screen">
	<div class="p-6 mx-auto max-w-3xl">
		{#await db then cols}
			<!-- <ExerciseLogger Logs={cols.Logs} Exercises={cols.Exercises} {exercises} {logs} /> -->
			{#each exercises as ex, i}
				<!-- {#if exData[ex._id]} -->
				<SingleExercise {ex} data={exData[ex._id]} Logs={cols.Logs} />
				<!-- {/if} -->
			{/each}
			<ExerciseManager Exercises={cols.Exercises} />
		{/await}
	</div>
</main>
