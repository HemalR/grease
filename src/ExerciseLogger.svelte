<script>
	import { afterUpdate } from 'svelte';
	import { createSkeletonLog } from './helpers/db';
	import { createLogId, getFormattedDate, parseDateFromLogId } from './helpers/id';
	import groupBy from 'lodash/groupBy';
	import mapValues from 'lodash/mapValues';

	export let Logs;
	export let exercises;
	export let Exercises;

	let hoveredEx = null;
	$: logs = exercises.map(({ _id }) => createSkeletonLog(_id));

	const handleAddLogs = async () => {
		try {
			const updatedLogsPromises = logs.map(async (log, index) => {
				const qty = Number(log.qty);
				if (!qty > 0) return log;
				await Logs.insert({ ...log, qty });
				return createSkeletonLog(log.exerciseId);
			});
			const updatedLogs = await Promise.all(updatedLogsPromises);
			console.log(updatedLogs);
			logs = updatedLogs;
		} catch (err) {
			console.error(err);
		}
	};

	const handleAddLog = async (exerciseId) => {
		try {
			const updatedLogsPromises = logs.map(async (log, index) => {
				const qty = Number(log.qty);
				if (!qty > 0) return log;
				await Logs.insert({ ...log, qty });
				return createSkeletonLog(log.exerciseId);
			});
			const updatedLogs = await Promise.all(updatedLogsPromises);
			console.log(updatedLogs);
			logs = updatedLogs;
		} catch (err) {
			console.error(err);
		}
	};
	const handleDelete = () => {
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

	let exData;

	afterUpdate(() => {
		if (!exercises.length || !logs.length) return;
		console.log(logs);
		const groupedLogs = groupBy(logs, 'exerciseId');
		exData = mapValues(groupedLogs, (exLogs, id) => {
			const total = exLogs.reduce((runningTotal, log) => {
				return runningTotal + log.qty;
			}, 0);
			return { qty: '0', total };
		});
	});
</script>

<div class="bg-white">
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
				<input
					class="form-input flex-grow block w-full sm:text-sm sm:leading-5 relative rounded-md shadow-sm"
					type="number"
					bind:value={exData[ex._id].qty} />
				<div>
					<button
						class="text-gray-500 hover:text-red-500"
						on:click={() => {
							ex.remove();
						}}>
						Delete
					</button>
				</div>
				<button
					class={`py-2 px-4 text-white rounded bg-teal-500 shadow hover:bg-teal-600`}
					type="submit"
					on:click={() => handleAddLog(ex._id)}>
					Log
				</button>
			</li>
		{/each}
	</ul>
</div>
<!-- class={`py-2 px-4 text-white rounded ${disabled ? 'bg-gray-400 shadow-inset' : 'bg-teal-500 shadow hover:bg-teal-600'}`} -->
