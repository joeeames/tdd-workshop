let attack = require('./attack');

/* reqs
*4 types of dice result: blank, surge, hit, crit
*blanks aren't hits, crits and hits are
*func takes an array  results (enum)
*and an options object
*if surge to crit, convert all surges to crit
*if surge to hit, convert all surges to hits
*if cover 1, remove 1 hit
*if cover 2, remove 2 hits
*if defender has armor, remove all hits
*if attack has impact X & defender has armor, convert X hits to crit AFTER cover
*if attack has sharpshooter 1, reduce cover by 1
*if attack has sharpshooter 2, reduce cover by 2
*/

describe('applyArmor', () => {
   
    it('should remove hits if defender has armor', () => {
        let rolls = ['hit', 'hit', 'hit'];
        let options = {armor: true}
        expect(attack.applyArmor(rolls, options)).toEqual(['miss', 'miss', 'miss'])
    })

    it('should convert 1 hit to a crit if impact is 1', () => {
        let rolls = ['hit', 'hit', 'hit'];
        let options = {armor: true, impact: 1}
        expect(attack.applyArmor(rolls, options)).toEqual(['crit', 'miss', 'miss'])
    })

    
    it('should convert 2 hits to crits if impact is 2', () => {
        let rolls = ['hit', 'hit', 'hit'];
        let options = {armor: true, impact: 2}
        expect(attack.applyArmor(rolls, options)).toEqual(['crit', 'crit', 'miss'])
    })

    it('should not convert hits to crits if no armor but still has impact', () => {
        let rolls = ['hit', 'hit', 'hit'];
        let options = {impact: 2}
        expect(attack.applyArmor(rolls, options)).toEqual(['hit', 'hit', 'hit'])
    })
});

describe('calculateAttack', () => {

    it('should have 0 hits if no results are given', () => {
        expect(attack.calculate([])).toBe(0);
    })

    it('should return 1 when given 1 hit', () => {
        let rolls = ['hit'];
        expect(attack.calculate(rolls)).toBe(1);
    })

    it('should return 0 when given 1 miss', () => {
        let rolls = ['miss'];
        expect(attack.calculate(rolls)).toBe(0);
    })

    it('should count both hits and crits', () => {
        let rolls = ['hit', 'crit'];
        expect(attack.calculate(rolls)).toBe(2);
    })

    it('should apply armor', () => {
        let rolls = ['hit'];
        expect(attack.calculate(rolls, {armor: true})).toBe(0)
    })

})

describe('applySurge', () => {
    it('should convert surges to hits if surgetoHit', () => {
        let rolls = ['surge'];
        expect(attack.applySurge(rolls, {surgeToHit: true})).toEqual(['hit']);
    })

    it('should convert surges to crits if surgeToCrit', () => {
        let rolls = ['surge'];
        expect(attack.applySurge(rolls, {surgeToCrit: true})).toEqual(['crit']);
    })

    it('should not convert surges to hits if not surgetoHit', () => {
        let rolls = ['surge'];
        expect(attack.applySurge(rolls, {})).toEqual(['surge']);
    })
});

describe('applyCover', () => {

    it('should remove 1 hit if cover is 1', () => {
        let rolls = ['hit', 'hit'];
        let options = {cover: 1, sharpShooter: 0}
        expect(attack.applyCover(rolls, options)).toEqual(['miss', 'hit']);
    })

    it('should remove 2 hits if cover is 2', () => {
        let rolls = ['hit', 'hit'];
        let options = {cover: 2, sharpShooter: 0}
        expect(attack.applyCover(rolls, options)).toEqual(['miss', 'miss']);
    })

    it('shouldn\'t remove crits due to cover', () => {
        let rolls = ['crit'];
        let options = {cover: 2, sharpShooter: 0}
        expect(attack.applyCover(rolls, options)).toEqual(['crit'])
    })

    it('should reduce cover by 1 if sharpshooter is 1', () => {
        let rolls = ['hit', 'hit'];
        let options = {cover: 2, sharpShooter: 1}
        expect(attack.applyCover(rolls, options)).toEqual(['miss', 'hit']);
    })

    it('should reduce cover by 2 if sharpshooter is 2', () => {
        let rolls = ['hit', 'hit'];
        let options = {cover: 2, sharpShooter: 2}
        expect(attack.applyCover(rolls, options)).toEqual(['hit', 'hit']);
    })
})

describe('massageOptions', () => {
    it('should default to 0 cover', () => {
        expect(attack.massageOptions({}).cover).toBe(0)
    })

    it('should default to 0 sharpShooter', () => {
        expect(attack.massageOptions({}).sharpShooter).toBe(0)
    })
})

