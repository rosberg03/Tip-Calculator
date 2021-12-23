
// CONSTS
const billAmount = document.getElementById('bill');
const peopleAmount = document.getElementById('people');
const radioCustom = document.getElementById('radio-custom');
const tipAmount = document.getElementById('tip-amount');
const totalAmount = document.getElementById('total-amount');
const btnReset = document.getElementById('btn-reset');

const radioBtns = [];
const radioLbls = [];

for (let i = 1; i < 6; i++) {
    radioBtns.push(document.getElementById(`radio-${i}`));
    radioLbls.push(document.getElementById(`radio-l-${i}`));
}

// MUTABLES
let radioCustomPrev = "";
let hasEdited = false;


const getPercentage = () => {
    let percentage = '0';
    radioBtns.forEach((elem, index) => {
        if (elem.checked) {
            percentage = radioLbls[index].innerHTML;
        } 
    });

    if (radioCustom.classList.contains('selected') && radioCustom.value) {
        percentage = radioCustom.value;
    } 

    percentage = percentage.replace('%','');
    return Number(percentage);
};

const computeTip = () => {
    const percentage = getPercentage();
    const bill = Number(billAmount.value);
    const people = Number(peopleAmount.value);

    let tip = percentage / 100 * bill;
    let total = tip + bill;

    tip /= people;
    total /= people;

    tip = tip > 100.00 ? tip.toFixed(0) : tip.toFixed(2);
    total = total > 100.00 ? total.toFixed(0) : total.toFixed(2);

    tipAmount.innerHTML = tip == 69.00 ? 'NICE' : tip;
    totalAmount.innerHTML = total == 69.00 ? 'NICE' : total;

    if (!hasEdited) {
        btnReset.classList.add('pressable');
        hasEdited = true;
    }
};


radioBtns.forEach((elem) => {
    elem.addEventListener('click', () => {
        radioCustom.classList.remove('selected');
        computeTip();
    })
});

radioCustom.addEventListener('click', () => {
    radioCustom.classList.add('selected');
    radioBtns.forEach((elem) => {
        elem.checked = false;
    })

    computeTip();
});


radioCustom.addEventListener('input', () => {
    if(radioCustom.value.length >= 5) {
        radioCustom.value = radioCustom.value.slice(0, -1); 
        return;
    }

    // check if backspace has been pressed, if so, remove last digit
    // This is because backspace will otherwise only remove the %
    if(radioCustom.value + '%' === radioCustomPrev) {
        radioCustom.value = radioCustom.value.slice(0, -1); 
    }

    // remove all non numeric characters and append %
    radioCustom.value = radioCustom.value.replace(/\D/g,'');
    if (radioCustom.value) radioCustom.value += '%';

    radioCustomPrev = radioCustom.value;


    computeTip();
});

billAmount.addEventListener('input', () => {
    if(billAmount.value.length >= 6) {
        billAmount.value = billAmount.value.slice(0, -1); 
        return;
    }

    computeTip();
});

peopleAmount.addEventListener('input', () => {
    if(peopleAmount.value.length >= 3) {
        peopleAmount.value = peopleAmount.value.slice(0, -1); 
        return;
    }

    computeTip();
});

btnReset.addEventListener('click', () => {
    if(hasEdited) {
        billAmount.value = '';
        peopleAmount.value = '1';
        radioCustom.value = '';
        radioCustom.classList.remove('selected');

        radioBtns.forEach((elem) => {
            elem.checked = false;
        });

        computeTip();
        btnReset.classList.remove('pressable');
        hasEdited = false;
    }
});