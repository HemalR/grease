<script>
	import { createId } from './helpers/id';

	export let exercises;
	export let Exercises;

	let hoveredEx = null;
	let name = '';
	let units = 'Reps';

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

<div>
	<h2>Manage your exercises</h2>
	<ul>
		{#each exercises as ex}
			<li
				class="border-t border-gray-200 px-4 py-4 flex items-center sm:px-6 hover:bg-gray-50 focus:outline-none
				focus:bg-gray-50"
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
          on:click={()=>{
            ex.remove()
          }}>Delete</button>
        </div>
			</li>
		{/each}
	</ul>
	<form on:submit|preventDefault={handleAddExercise}>
		<h3>Add new exercise</h3>
		<div>
			<label for="exname" class="block text-sm font-medium leading-5 text-gray-700">Name</label>
			<div class="mt-1 relative rounded-md shadow-sm">
				<input
					id="exname"
					class="form-input block w-full sm:text-sm sm:leading-5"
					placeholder="Two fingered planche push ups"
					bind:value={name} />
			</div>
		</div>
		<div class="mt-6 bg-white">
			<legend class="block text-sm font-medium leading-5 text-gray-700">Units</legend>
			<div class="mt-1 rounded-md shadow-sm">
				<div>
					<select
						aria-label="Units"
						class="form-select relative block w-full py-2 px-3 rounded-md bg-transparent focus:z-10 transition
						ease-in-out duration-150 sm:text-sm sm:leading-5"
						bind:value={units}>
						<option>Reps</option>
						<option>Seconds</option>
					</select>
				</div>
			</div>
		</div>
		<button class="py-2 px-4 bg-teal-500 shadow text-white rounded hover:bg-teal-600" type="submit">Add</button>
	</form>
</div>

<!-- CALENDAR ICON <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                  </svg> -->
