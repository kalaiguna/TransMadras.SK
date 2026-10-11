import { describe, it, expect } from 'vitest';
import { transtyle, trans2uni } from './madras';

// ─── transtyle (Tamil → ISO 15919) ───────────────────────────────────────────

describe('transtyle', () => {
	it('returns empty string unchanged', () => {
		expect(transtyle('')).toBe('');
	});

	it('converts தமிழ் → tamiḻ', () => {
		expect(transtyle('தமிழ்')).toBe('tamiḻ');
	});

	it('converts தமிழ்நாடு → tamiḻnāṭu', () => {
		expect(transtyle('தமிழ்நாடு')).toBe('tamiḻnāṭu');
	});

	it('converts ஓம் → ōm', () => {
		expect(transtyle('ஓம்')).toBe('ōm');
	});

	it('converts ஸ்ரீ ligature → šrī', () => {
		expect(transtyle('ஸ்ரீ')).toBe('šrī');
	});

	it('converts visarga ஃ → ḵ', () => {
		expect(transtyle('ஃ')).toBe('ḵ');
	});

	it('converts standalone vowels (soul series)', () => {
		expect(transtyle('அ')).toBe('a');
		expect(transtyle('ஆ')).toBe('ā');
		expect(transtyle('இ')).toBe('i');
		expect(transtyle('ஈ')).toBe('ī');
		expect(transtyle('உ')).toBe('u');
		expect(transtyle('ஊ')).toBe('ū');
		expect(transtyle('எ')).toBe('e');
		expect(transtyle('ஏ')).toBe('ē');
		expect(transtyle('ஐ')).toBe('ai');
		expect(transtyle('ஒ')).toBe('o');
		expect(transtyle('ஓ')).toBe('ō');
		expect(transtyle('ஔ')).toBe('au');
	});

	it('converts consonant + ā diacritic (ā series)', () => {
		expect(transtyle('கா')).toBe('kā');
		expect(transtyle('மா')).toBe('mā');
		expect(transtyle('வா')).toBe('vā');
	});

	it('converts consonant + short-i diacritic (i series)', () => {
		expect(transtyle('கி')).toBe('ki');
		expect(transtyle('தி')).toBe('ti');
	});

	it('converts consonant + au diacritic (au series)', () => {
		expect(transtyle('கௌ')).toBe('kau');
		expect(transtyle('தௌ')).toBe('tau');
	});

	it('converts mei (final consonant) forms', () => {
		expect(transtyle('க்')).toBe('k');
		expect(transtyle('ழ்')).toBe('ḻ');
		expect(transtyle('ன்')).toBe('ṉ');
	});

	it('converts bare consonants (inherent /a/)', () => {
		expect(transtyle('க')).toBe('ka');
		expect(transtyle('ன')).toBe('ṉa');
	});

	it('converts Grantha consonants', () => {
		expect(transtyle('ஜ')).toBe('ja');
		expect(transtyle('ஷ')).toBe('ṣa');
		expect(transtyle('ஸ')).toBe('sa');
		expect(transtyle('ஹ')).toBe('ha');
	});

	it('passes through non-Tamil text unchanged', () => {
		expect(transtyle('hello')).toBe('hello');
		expect(transtyle('123')).toBe('123');
	});
});

// ─── trans2uni (ISO 15919 → Tamil) ───────────────────────────────────────────

describe('trans2uni', () => {
	it('returns empty string unchanged', () => {
		expect(trans2uni('')).toBe('');
	});

	it('converts tamiḻ → தமிழ்', () => {
		expect(trans2uni('tamiḻ')).toBe('தமிழ்');
	});

	it('converts tamiḻnāṭu → தமிழ்நாடு', () => {
		expect(trans2uni('tamiḻnāṭu')).toBe('தமிழ்நாடு');
	});

	it('converts ōm → ஓம்', () => {
		expect(trans2uni('ōm')).toBe('ஓம்');
	});

	it('converts šrī ligature → ஸ்ரீ', () => {
		expect(trans2uni('šrī')).toBe('ஸ்ரீ');
	});

	it('converts visarga ḵ → ஃ', () => {
		expect(trans2uni('ḵ')).toBe('ஃ');
	});

	it('converts standalone vowel transliterations (soul series)', () => {
		expect(trans2uni('a')).toBe('அ');
		expect(trans2uni('ā')).toBe('ஆ');
		expect(trans2uni('i')).toBe('இ');
		expect(trans2uni('ī')).toBe('ஈ');
		expect(trans2uni('u')).toBe('உ');
		expect(trans2uni('ū')).toBe('ஊ');
		expect(trans2uni('e')).toBe('எ');
		expect(trans2uni('ē')).toBe('ஏ');
		expect(trans2uni('ai')).toBe('ஐ');
		expect(trans2uni('o')).toBe('ஒ');
		expect(trans2uni('ō')).toBe('ஓ');
		expect(trans2uni('au')).toBe('ஔ');
	});

	it('converts consonant+vowel pairs', () => {
		expect(trans2uni('kā')).toBe('கா');
		expect(trans2uni('ti')).toBe('தி');
		expect(trans2uni('mu')).toBe('மு');
		expect(trans2uni('kau')).toBe('கௌ');
		expect(trans2uni('kai')).toBe('கை');
	});

	it('longer vowel suffix takes priority over shorter', () => {
		// 'kau' must not be parsed as 'ka'+'u'
		expect(trans2uni('kau')).toBe('கௌ');
		// 'kai' must not be parsed as 'ka'+'i'
		expect(trans2uni('kai')).toBe('கை');
	});

	it('converts standalone consonants to mei forms', () => {
		expect(trans2uni('k')).toBe('க்');
		expect(trans2uni('ḻ')).toBe('ழ்');
		expect(trans2uni('ṉ')).toBe('ன்');
	});
});

// ─── round-trip ───────────────────────────────────────────────────────────────

describe('round-trip', () => {
	const tamilSamples = [
		'தமிழ்',
		'தமிழ்நாடு',
		'ஓம்',
		'ஸ்ரீ',
		'வணக்கம்',
		'இந்தியா',
		'காலை வணக்கம்',
	];

	for (const tamil of tamilSamples) {
		it(`transtyle → trans2uni preserves "${tamil}"`, () => {
			expect(trans2uni(transtyle(tamil))).toBe(tamil);
		});
	}

	const latinSamples = [
		'tamiḻ',
		'tamiḻnāṭu',
		'šrī',
		'vaṇakkam',
		'kālai vaṇakkam',
	];

	for (const latin of latinSamples) {
		it(`trans2uni → transtyle preserves "${latin}"`, () => {
			expect(transtyle(trans2uni(latin))).toBe(latin);
		});
	}
});
