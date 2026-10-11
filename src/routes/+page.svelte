<script lang="ts">
	import { transtyle, trans2uni } from '$lib/madras';

	let tamilInput = $state('');
	let styleInput = $state('');

	let styleResult = $derived(tamilInput ? transtyle(tamilInput) : '');
	let unicodeResult = $derived(styleInput ? trans2uni(styleInput) : '');

	function copy(text: string) {
		navigator.clipboard.writeText(text);
	}
</script>

<svelte:head>
	<title>TransMadras — Tamil Transliteration</title>
	<meta name="description" content="Tamil Unicode ↔ ISO 15919 transliteration" />
</svelte:head>

<main>
	<header>
		<h1>TransMadras</h1>
		<p>Tamil Unicode ↔ ISO 15919 transliteration</p>
	</header>

	<div class="panels">
		<section class="panel">
			<h2>Tamil → Style</h2>
			<label>
				<span>Tamil Unicode</span>
				<textarea
					bind:value={tamilInput}
					placeholder="Type Tamil here… e.g. தமிழ்"
					rows="6"
					dir="auto"
				></textarea>
			</label>
			<div class="result-row">
				<output class="result">{styleResult}</output>
				<button class="copy-btn" onclick={() => copy(styleResult)} disabled={!styleResult}>
					Copy
				</button>
			</div>
		</section>

		<section class="panel">
			<h2>Style → Tamil</h2>
			<label>
				<span>ISO 15919 transliteration</span>
				<textarea
					bind:value={styleInput}
					placeholder="Type transliteration… e.g. tamiḻ"
					rows="6"
				></textarea>
			</label>
			<div class="result-row">
				<output class="result" dir="auto">{unicodeResult}</output>
				<button class="copy-btn" onclick={() => copy(unicodeResult)} disabled={!unicodeResult}>
					Copy
				</button>
			</div>
		</section>
	</div>

	<footer>
		<p>
			Core transliteration by <strong>C. Gunasekaran</strong> (2007) ·
			<a href="https://github.com/kalaiguna/TransMadras.SK" target="_blank" rel="noopener">
				TransMadras.SK
			</a>
		</p>
	</footer>
</main>

<style>
	:global(*, *::before, *::after) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		background: #0f0a1e;
		color: #e2d9f3;
		font-family: system-ui, -apple-system, sans-serif;
		min-height: 100vh;
	}

	main {
		max-width: 960px;
		margin: 0 auto;
		padding: 2rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	header {
		text-align: center;
	}

	header h1 {
		font-size: 2rem;
		font-weight: 700;
		background: linear-gradient(135deg, #a78bfa, #c084fc);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	header p {
		margin-top: 0.4rem;
		color: #9d8ec0;
		font-size: 0.95rem;
	}

	.panels {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	@media (max-width: 640px) {
		.panels {
			grid-template-columns: 1fr;
		}
	}

	.panel {
		background: #1a1133;
		border: 1px solid #2d1f4e;
		border-radius: 12px;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.panel h2 {
		font-size: 1rem;
		font-weight: 600;
		color: #c084fc;
		letter-spacing: 0.02em;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label span {
		font-size: 0.8rem;
		color: #9d8ec0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	textarea {
		width: 100%;
		background: #0f0a1e;
		border: 1px solid #2d1f4e;
		border-radius: 8px;
		color: #e2d9f3;
		font-size: 1.1rem;
		padding: 0.75rem;
		resize: vertical;
		outline: none;
		transition: border-color 0.15s;
		font-family: inherit;
	}

	textarea:focus {
		border-color: #7c3aed;
	}

	.result-row {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.result {
		flex: 1;
		background: #0f0a1e;
		border: 1px solid #2d1f4e;
		border-radius: 8px;
		padding: 0.75rem;
		font-size: 1.1rem;
		min-height: 2.75rem;
		color: #a78bfa;
		word-break: break-word;
		display: block;
	}

	.copy-btn {
		background: #2d1f4e;
		border: 1px solid #4c2d8a;
		border-radius: 6px;
		color: #c084fc;
		cursor: pointer;
		font-size: 0.85rem;
		padding: 0.4rem 0.9rem;
		white-space: nowrap;
		transition: background 0.15s;
	}

	.copy-btn:hover:not(:disabled) {
		background: #3d2a6a;
	}

	.copy-btn:disabled {
		opacity: 0.4;
		cursor: default;
	}

	footer {
		text-align: center;
		font-size: 0.8rem;
		color: #6b5a8a;
	}

	footer a {
		color: #9d8ec0;
		text-decoration: none;
	}

	footer a:hover {
		color: #c084fc;
	}
</style>
