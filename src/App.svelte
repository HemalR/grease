<script>
  import PouchDB from 'pouchdb-browser'

	const Exercises = new PouchDB('exercises');

	let name;
	let units;
</script>

<main class="p-4">
	<h1>Manage exercises</h1>
	<input class="p-2 border border-gray-500 rounded" placeholder="Name" bind:value={name}/>	
	<input class="p-2 border border-gray-500 rounded" placeholder="Units" bind:value={units}/>	
	<button class="py-2 px-4 bg-green-500 shadow text-white rounded hover:bg-green-600">Add</button>
</main>
