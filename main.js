const startScreenElement = document.getElementById('div-start');
const configureAgeElement = document.getElementById('div-birth');
const configureWorkElement = document.getElementById('div-workSettings');
const configureRetirementElement = document.getElementById(
  'div-retirementSettings'
);
const furtherSettingsElement = document.getElementById(
  'div-retirementFurtherSettings'
);
const resultSectionElement = document.getElementById('scn-calculatedData');
const nextButtonsElement = document.querySelectorAll('.btn-next');
const previousButtonsElement = document.querySelectorAll('.btn-previous');

const configurationElements = [
  configureAgeElement,
  configureWorkElement,
  configureRetirementElement,
  furtherSettingsElement
];

const startButtonElement = document.getElementById('btn-start');
const calculateButtonElement = document.getElementById('btn-doCalculation');

function displayDiv(divToDisplay) {
  const divThatShouldBeDisplayed = configurationElements[divToDisplay];
  const divsThatShouldBeHidden = Object.values(configurationElements).filter(
    (div) => div !== divThatShouldBeDisplayed
  );
  divThatShouldBeDisplayed.style.display = '';

  for (const div of divsThatShouldBeHidden) {
    div.style.display = 'none';
  }
}

let currentDivDisplayed = 0;

startButtonElement.addEventListener('click', () => {
  startScreenElement.style.display = 'none';
  document.getElementById('heading').style.display = '';
  document.getElementById('scn-configurePersonalData').style.display = '';
  let currentDivDisplayed = 0;
  displayDiv(currentDivDisplayed);
});

calculateButtonElement.addEventListener('click', () => {
  resultSectionElement.style.display = '';
  calculateRetirement();
  updateChart(myChart);
  calculateMonthlySavings();
});

for (let nextButton of nextButtonsElement) {
  nextButton.addEventListener('click', () => {
    currentDivDisplayed++;
    displayDiv(currentDivDisplayed);
  });
}

for (let previousButton of previousButtonsElement) {
  previousButton.addEventListener('click', () => {
    currentDivDisplayed--;
    displayDiv(currentDivDisplayed);
  });
}

const riskStageElement = document.getElementById('range_riskStage');

function showValue(newValue) {
  document.getElementById('riskStage').innerHTML = newValue;
  calculateMonthlySavings();
}
