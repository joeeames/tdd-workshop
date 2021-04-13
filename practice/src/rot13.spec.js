let rot13 = require('./rot13');

describe('rot13', () => {
    it('should return a blank string if given one', () => {
        expect(rot13.transform("")).toBe("")
    })

    it('should transform a lowercase letter', () => {
        expect(rot13.transform('a')).toBe('n');
        expect(rot13.transform('n')).toBe('a');

    })

    it('should not transform non-letters', () => {
        expect(rot13.transform('}')).toBe('}')
    })

    it('should transform Uppercase letters', () => {
        expect(rot13.transform('A')).toBe('N');
    })

    it('should transform full strings', () => {
        expect(rot13.transform('AbC')).toBe('NoP');
    })

    it('should not transform non letters in a full string', () => {
        expect(rot13.transform('AbC}')).toBe('NoP}');
    })
})