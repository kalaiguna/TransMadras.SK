/**
 * Tamil transliteration — TypeScript port of Madras.cs
 * Original author: C. Gunasekaran, 14.09.2007
 *
 * Single-pass regex lookup replaces ~300 sequential replaceAll calls.
 * Mapping tables are generated from CONSONANTS × VOWELS; regex built once at module load.
 */

// [tamil, ISO-15919]
const CONSONANTS: [string, string][] = [
	['க',  'k' ], ['ங',  'ṅ' ], ['ச',  'c' ], ['ஞ',  'ñ' ],
	['ட',  'ṭ' ], ['ண',  'ṇ' ], ['த',  't' ], ['ந',  'n' ],
	['ப',  'p' ], ['ம',  'm' ], ['ய',  'y' ], ['ர',  'r' ],
	['ல',  'l' ], ['வ',  'v' ], ['ழ',  'ḻ' ], ['ள',  'ḷ' ],
	['ற',  'ṟ' ], ['ன',  'ṉ' ], ['ஜ',  'j' ], ['ஷ',  'ṣ' ],
	['ஸ',  's' ], ['ஹ',  'h' ],
];

// [vowel diacritic, ISO-15919 suffix] — empty diacritic = inherent /a/
const VOWELS: [string, string][] = [
	['',   'a' ],
	['ா',  'ā' ],
	['ி',  'i' ],
	['ீ',  'ī' ],
	['ு',  'u' ],
	['ூ',  'ū' ],
	['ெ',  'e' ],
	['ே',  'ē' ],
	['ை',  'ai'],
	['ொ',  'o' ],
	['ோ',  'ō' ],
	['ௌ',  'au'],
];

function escapeRegex(s: string): string {
	return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildTable(entries: [string, string][]): [Map<string, string>, RegExp] {
	const map = new Map(entries);
	const pattern = [...map.keys()]
		.sort((a, b) => b.length - a.length)
		.map(escapeRegex)
		.join('|');
	return [map, new RegExp(pattern, 'gu')];
}

// ─── transtyle: Tamil Unicode → ISO 15919 ────────────────────────────────────

const STYLE_ENTRIES: [string, string][] = [
	// special ligature — must be first so it beats ஸ் alone
	['ஸ்ரீ', 'šrī'],
	['ஃ',    'ḵ'  ],
	// soul series (standalone vowels)
	['அ', 'a' ], ['ஆ', 'ā' ], ['இ', 'i' ], ['ஈ', 'ī' ],
	['உ', 'u' ], ['ஊ', 'ū' ], ['எ', 'e' ], ['ஏ', 'ē' ],
	['ஐ', 'ai'], ['ஒ', 'o' ], ['ஓ', 'ō' ], ['ஔ', 'au'],
	// consonant + virama (mei / final-consonant forms)
	...CONSONANTS.map(([t, l]): [string, string] => [t + '்', l]),
	// consonant + vowel diacritic (12 vowel series, bare /a/ included)
	...CONSONANTS.flatMap(([t, l]) =>
		VOWELS.map(([d, v]): [string, string] => [t + d, l + v])
	),
];

const [styleMap, styleRegex] = buildTable(STYLE_ENTRIES);

export function transtyle(src: string): string {
	if (!src) return src;
	styleRegex.lastIndex = 0;
	return src.replace(styleRegex, m => styleMap.get(m) ?? m);
}

// ─── trans2uni: ISO 15919 → Tamil Unicode ────────────────────────────────────

const UNI_ENTRIES: [string, string][] = [
	['šrī', 'ஸ்ரீ'],
	['ḵ',   'ஃ'  ],
	// consonant + vowel (12 vowel series, including bare /a/)
	...CONSONANTS.flatMap(([t, l]) =>
		VOWELS.map(([d, v]): [string, string] => [l + v, t + d])
	),
	// standalone consonants → mei forms (virama)
	...CONSONANTS.map(([t, l]): [string, string] => [l, t + '்']),
	// soul series — longer patterns (au, ai) listed before shorter (a, i)
	// but the length-sort in buildTable handles ordering automatically
	['au', 'ஔ'], ['ai', 'ஐ'],
	['ā',  'ஆ'], ['ī',  'ஈ'], ['ū',  'ஊ'], ['ē',  'ஏ'], ['ō',  'ஓ'],
	['a',  'அ'], ['i',  'இ'], ['u',  'உ'], ['e',  'எ'], ['o',  'ஒ'],
];

const [uniMap, uniRegex] = buildTable(UNI_ENTRIES);

export function trans2uni(src: string): string {
	if (!src) return src;
	uniRegex.lastIndex = 0;
	return src.replace(uniRegex, m => uniMap.get(m) ?? m);
}
