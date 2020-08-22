const $btn = document.getElementById('btn-kick');
const $btnSuperKick = document.getElementById('btn-kick-super-kick');
const $logo = document.getElementsByClassName('logo');
const $log = document.getElementById('logBattle');
let round = 1;

const character = {
    name: 'Picachu',
    defaultHP: 100,
    DamageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
}

const enemy = {
    name: 'Chatmander',
    defaultHP: 100,
    DamageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
}

$btn.addEventListener('click', () => {
    inLog('Раунд - ' + round++);

    const characterDamage = random(20);
    const enemyDamage = random(20);

    roundLog(characterDamage, enemyDamage);

    changeHP(characterDamage, character);
    changeHP(enemyDamage, enemy);
    resaultRaund();
})

$btnSuperKick.addEventListener('click', () => {
    inLog('Super Kick');

    const damage = random(30);
    inLog(character.name + ' нанес сокрушительный удар ' + enemy.name + ' нанеся ' + damage + '  урона\n');

    changeHP(damage, enemy);
    btnEnableState($btnSuperKick);
})

$logo[0].addEventListener('click', () => {
    console.log('Restart');

    init();    
})

function init() {
    clearLog();
    inLog('Start Game!\n------------------\n');

    resetCharacter(character);
    resetCharacter(enemy);

    btnEnableState($btn, true);
    btnEnableState($btnSuperKick, true);
}

function resetCharacter(person) {
    person.DamageHP = person.defaultHP;
    person.elProgressbar.classList.remove('low');
    person.elProgressbar.classList.remove('critical');

    renderHP(person);
}

function renderHPLife(person) {
    person.elHP.innerText = person.DamageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
    if (person.DamageHP < person.defaultHP * 0.66) {
        person.elProgressbar.classList.add('low');
    }
    if (person.DamageHP < person.defaultHP * 0.33) {
        person.elProgressbar.classList.add('critical');
    }

    person.elProgressbar.style.width = person.DamageHP + '%';
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function changeHP(count, person) {
    person.DamageHP < count ? person.DamageHP = 0 : person.DamageHP -= count;

    renderHP(person);
}

function resaultRaund() {
    let characterIsLive = true;
    let enemyIsLive = true;

    function victoryAlert(person) {
        inLog('------------------\n' + person.name + " одержал победу сохранив " + person.DamageHP + " очков жизни.")
    }

    if (character.DamageHP <= 0) {
        characterIsLive = false;
        endGame();
    }

    if (enemy.DamageHP <= 0) {
        enemyIsLive = false;
        endGame();
    }

    if (!characterIsLive && !enemyIsLive) {        
        inLog('------------------\n' + "Ничья! Оба бойца упали без сил")
        return;
    }

    if (!characterIsLive) {
        victoryAlert(enemy);
    }

    if (!enemyIsLive) {
        victoryAlert(character);
    }

    return;
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

function btnEnableState(btn, isEnable = false) {
    if (!isEnable) {
        btn.disabled = true;
        btn.style.opacity = '0.3';
    } else {
        btn.disabled = false;
        btn.style.opacity = '1';
    }
}

function inLog(string) {
    $log.value += string + '\n';

    $log.scrollTop = $log.scrollHeight;
}

function clearLog() {
    $log.value = '';
}

function roundLog(characterDamage, enemyDamage) {
    let str = character.name + ' нанес ' + enemyDamage + ' урона\n';
    str += enemy.name + ' нанес ' + characterDamage + ' урона\n';

    inLog(str);
}

function endGame() {
    btnEnableState($btn);
    btnEnableState($btnSuperKick);
}

init();