<script>
	import { afterUpdate } from 'svelte';
	import formatDistanceToNow from 'date-fns/formatDistanceToNow';
	import differenceInHours from 'date-fns/differenceInHours';
	import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
	import { createLogId, parseDateFromLogId, getFormattedDate } from './helpers/id';
	import StatBox from './StatBox.svelte';
	import clickOutside from './helpers/handleOutsideClick';

	export let ex;
	export let data;
	export let Logs;

	let qty = '';
	$: isLoggable = Number(qty) > 0;

	let lastSet = null;
	let emoji = '';
	let lastStatement = '';
	let avgDailySets = '';
	let isMenuOpen = false;

	const handleAddLog = async () => {
		try {
			if (!isLoggable) return;
			await Logs.insert({ _id: createLogId(), exerciseId: ex._id, qty: Number(qty) });
			qty = '0';
		} catch (err) {
			console.error(err);
		}
	};

	const handleDelete = async () => {
		ex.remove();
		const exLogs = Logs.find().where('exerciseId').eq(ex._id);
		await exLogs.remove()
		isMenuOpen = false;
	};

	afterUpdate(() => {
		if (data.logs.length) {
			lastSet = data.logs[data.logs.length - 1];
			const now = new Date();
			const createdAt = new Date(parseDateFromLogId(lastSet._id));
			const dist = differenceInHours(now, createdAt);
			if (dist > 24) {
				emoji = '😡';
			} else if (dist > 12) {
				emoji = '😐';
			} else {
				emoji = '😀';
			}
			// lastStatement = `${lastSet.qty} ${ex.units} ${formatDistanceToNow(createdAt)} ago`;
			lastStatement = `${formatDistanceToNow(createdAt)} ago`;
			lastStatement = lastStatement[0].toUpperCase() + lastStatement.slice(1);
			const firstSet = data.logs[0];
			const daysSinceFirst = differenceInCalendarDays(now, new Date(parseDateFromLogId(firstSet._id))) || 1;
			avgDailySets = `${(data.logs.length / daysSinceFirst).toFixed(2)} sets`;
		}
	});
</script>

<style>
	.container {
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-areas: 'name name logger menuBtn';
		align-items: center;
	}

	.name {
		grid-area: name;
	}

	.logger {
		grid-area: logger;
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: auto auto;
	}

	.menuBtn {
		grid-area: menuBtn;
	}

	.menu {
		right: -3rem;
	}

	.last {
		grid-area: last;
	}

	.total {
		grid-area: total;
	}

	.avg {
		grid-area: avg;
	}
	.stats {
		grid-area: stats;
		grid-template-areas: 'last total avg';
	}
</style>

<div class="rounded-full my-4 shadow border border-teal-900">
	<div class="container bg-white p-4 rounded-t">
		<div class="name text-xl">
			<span class="mr-3">{emoji}</span>
			{ex.name}
		</div>
		<form class="logger" on:submit|preventDefault={handleAddLog}>
			<label for={ex._id} class="sr-only">Quantity</label>
			<div class="relative">
				<input
					id={ex._id}
					type="number"
					class="form-input block w-full pr-12 sm:text-sm sm:leading-5 h-full"
					placeholder="Add"
					bind:value={qty} />
				<div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
					<span class="text-gray-500 sm:text-sm sm:leading-5">{ex.units}</span>
				</div>
			</div>
			<button
				type="submit"
				disabled={!isLoggable}
				class={`py-2 px-4 text-white rounded ${isLoggable ? 'bg-teal-500 shadow hover:bg-teal-600' : 'bg-gray-300 shadow-inset'}`}>
				Log
			</button>
		</form>
		<button
			class="relative menuBtn text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-900"
			use:clickOutside={() => {
				if (isMenuOpen) {
					isMenuOpen = false;
				}
			}}
			on:click|preventDefault={() => (isMenuOpen = true)}>
			<svg viewBox="0 0 20 20" fill="currentColor" class="dots-vertical w-6 h-6">
				<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
			</svg>
			{#if isMenuOpen}
				<div
					class="menu absolute bg-white rounded shadow-lg border border-solid border-gray-200 right-0 transform
					-translate-x-1/2 mt-3 w-32">
					<button class="text-teal-700 hover:text-teal-900 text-lg flex py-2 px-4 focus:outline-none" on:click={handleDelete}>
						<svg viewBox="0 0 20 20" fill="currentColor" class="trash mr-3 w-6 h-6">
							<path
								fill-rule="evenodd"
								d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0
								100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102
								0V8a1 1 0 00-1-1z"
								clip-rule="evenodd" />
						</svg>
						Delete
					</button>
				</div>
			{/if}
		</button>
	</div>
	<div class="p-4 stats grid grid-cols-3 col-span-3 bg-teal-100 rounded-b">
		<div class="text-teal-500 last text-sm">
			<StatBox label="Last" stat={lastStatement} />
		</div>
		<div class="text-teal-500 total text-sm">
			<StatBox label="Total" stat={`${data.total} ${ex.units}`} />
		</div>
		<div class="text-teal-500 avg text-sm">
			<StatBox label="Daily" stat={avgDailySets} />
		</div>
	</div>
</div>
