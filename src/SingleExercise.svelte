<script>
  import { afterUpdate } from 'svelte';
  import formatDistanceToNow from 'date-fns/formatDistanceToNow';
  import differenceInHours from 'date-fns/differenceInHours'
  import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
  import {createLogId, parseDateFromLogId, getFormattedDate} from './helpers/id';

	export let ex;
	export let data;
	export let Logs;

  let qty = '';
  $: isLoggable = Number(qty) > 0;

  let lastSet =  null;
  let lastStatement = '';  
  let avgStatement = '';
  
  const handleAddLog = async () => {
		try {
      if (!isLoggable) return;
      await Logs.insert({ _id: createLogId(), exerciseId: ex._id, qty: Number(qty) });
      qty = '0';
		} catch (err) {
			console.error(err);
		}
  };

afterUpdate(()=>{
  if (data.logs.length) {
    lastSet = data.logs[data.logs.length-1];
    const now = new Date();
    const createdAt = new Date(parseDateFromLogId(lastSet._id));
    const dist = differenceInHours(now, createdAt);
    let emoji = '';
    
    switch (dist) {
    case dist > 24:
      emoji = '😡'
      break;
    case dist > 12:
      emoji = '😐'
      break;
    default:
      emoji = '😀'
      break;
    }
    lastStatement = `${emoji}   ${lastSet.qty} ${ex.units} ${formatDistanceToNow(createdAt)} ago`;

    const firstSet = data.logs[0];
    const daysSinceFirst = differenceInCalendarDays(now, new Date(parseDateFromLogId(firstSet._id))) || 1;
    avgStatement = `${data.logs.length/daysSinceFirst} sets daily`

  }
})

</script>

<style>
	.container {
		display: grid;
		grid-gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-template-areas:
			'name name name logger logger logger'
			'last last total total avg avg';
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

	.last {
		grid-area: last;
	}

	.total {
		grid-area: total;
	}

	.avg {
		grid-area: avg;
	}
</style>

<div class="container bg-white my-4 p-4 rounded">
	<div class="name text-xl">{ex.name}</div>
	<form class="logger" on:submit|preventDefault={handleAddLog}>
			<label for={ex._id} class="sr-only">Quantity</label>
			<div class="relative">
				<input
					id={ex._id}
          type="number"
					class="form-input block w-full pr-12 sm:text-sm sm:leading-5 h-full"
					placeholder="How many"
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
  <div class="text-teal-500 last text-sm">{lastStatement}</div>
  <div class="text-teal-500 total text-sm text-center">{data.total} {ex.units} total</div>
  <div class="text-teal-500 avg text-sm text-right">{avgStatement}</div>
</div>
