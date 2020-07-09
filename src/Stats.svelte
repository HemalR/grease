<script>
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { getFormattedDate, parseDateFromLogId } from './helpers/id';
	import groupBy from 'lodash/groupBy';
	import mapValues from 'lodash/mapValues';

	export let exercises;
	export let logs;

	let exData;

	afterUpdate(() => {
		if (!exercises.length || !logs.length) return;
		const grouped = groupBy(logs, 'exerciseId');
		exData = mapValues(grouped, (exLogs) => {
			const total = exLogs.reduce((runningTotal, log) => {
				return runningTotal + log.qty;
			}, 0);
			return { total };
		});
	});
</script>

<div>
	<h2>Stats</h2>
	<ul>
		{#each exercises as ex}
			<li>
				<p>Name: {ex.name}</p>
				{#if exData}
					<p>Total: {exData[ex._id].total}</p>
				{/if}
			</li>
		{/each}
	</ul>
</div>
