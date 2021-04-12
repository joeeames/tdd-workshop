module.exports.calculate = calculateAttack;
module.exports.countHits = countHits;
module.exports.applySurge = applySurge;
module.exports.applyCover = applyCover;
module.exports.applyArmor = applyArmor;
module.exports.massageOptions = massageOptions;



function calculateAttack(rolls, options = {}) {
    let adjustedOptions = massageOptions(options)

    let modifiedRolls = applySurge(rolls, adjustedOptions)

    modifiedRolls = applyCover(modifiedRolls, adjustedOptions);

    modifiedRolls = applyArmor(modifiedRolls, adjustedOptions);

    let hits = countHits(modifiedRolls, adjustedOptions);
    return hits;
}


function countHits(rolls) {
    return rolls.reduce((acc, curVal) => {
        return (curVal === 'hit' || curVal === 'crit') ? acc + 1 : acc
    }, 0);
}

function applySurge(rolls, options) {
    return rolls.map(roll => {
        if (options.surgeToHit && roll === 'surge') {
            return 'hit';
        }
        if (options.surgeToCrit && roll === 'surge') {
            return 'crit';
        }
        return roll;
    });
}

function applyCover(rolls, options) {
    let remainingCover = options.cover - options.sharpShooter;
    return rolls.map(roll => {
        if (remainingCover > 0 && roll === 'hit') {
            remainingCover--;
            return 'miss';
        } else {
            return roll;
        }
    });
}

function applyArmor(rolls, options) {
    let remainingImpact = options.impact;
    return rolls.map(roll => {
        if (options.armor && roll === 'hit') {
            if(remainingImpact > 0) {
                remainingImpact--;
                return 'crit'
            } else
                return 'miss';
        } else {
            return roll;
        }
    });
}

function massageOptions(options) {
    let adjusted = {...options}
    if(typeof adjusted.cover !== 'number') {
        adjusted.cover = 0;
    }
    if(typeof adjusted.sharpShooter !== 'number') {

        adjusted.sharpShooter = 0;
    }
    return adjusted;
}