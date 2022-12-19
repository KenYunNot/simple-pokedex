function kgToPound(kg) {
    const poundsInKg = 2.20462;
    let pounds = (parseFloat(kg) * poundsInKg).toFixed(1);
    return `${pounds} lbs`
}

function meterToFoot(meter) {
    const feetInMeter = 3.28084;
    let feet = (parseFloat(meter) * feetInMeter);
    let inches = parseInt((feet % 1) * 12);
    if (inches < 10) return `${parseInt(feet)}\' 0${inches}\"`;
    else return `${feet}\' ${inches}\"`;
}

let metric = true;
const heightElement = document.getElementById('height');
const weightElement = document.getElementById('weight');
const metricHeight = heightElement.innerHTML.split(" ");
const metricWeight = weightElement.innerHTML.split(" ");
const imperialHeight = meterToFoot(metricHeight[0])
const imperialWeight = kgToPound(metricWeight[0]);

document.querySelectorAll("span.convert-tooltip").forEach((elem) => {
    elem.addEventListener('click', (event) => {
        console.log("Clicked");
        if (metric) {
            heightElement.innerHTML = imperialHeight;
            weightElement.innerHTML = imperialWeight;
            metric = false;
        }
        else {
            heightElement.innerHTML = `${metricHeight[0]} m`;
            weightElement.innerHTML = `${metricWeight[0]} kg`;
            metric = true;
        }
    });
});