<script>
	export let Logs;
	export let exercises;

	// const getExercises = Exercises.allDocs({
	// 	include_docs: true,
	// }).then((res) => {
	// 	return res.rows.map(({ doc }) => doc);
	// });
	/**
   * {#await getExercises then exercises}
		<ul>
			{#each exercises as ex}
				<li>{ex.name}</li>
			{/each}
		</ul>
	{:catch error}
		<!-- promise was rejected -->
		<p>Something went wrong: {error.message}</p>
	{/await}
   */
</script>

<div>
	<ul>
		{#each exercises as ex}
			<li>{ex.name}</li>
		{/each}
	</ul>
</div>
