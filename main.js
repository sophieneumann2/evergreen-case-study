const startScreenElement = document.getElementById('scn-start');
const configureAgeElement = document.getElementById('div-birth');
const configureWorkElement = document.getElementById('div-workSettings');
const configureRetirementElement = document.getElementById(
  'div-retirementSettings'
);
const furtherSettingsElement = document.getElementById(
  'div-retirementFurtherSettings'
);
const configureDataSectionElement = document.getElementById(
  'scn-configurePersonalData'
);
const resultSectionElement = document.getElementById('scn-calculatedData');
const explanationSectionElement = document.getElementById('scn-explanation');
const nextButtonsElement = document.querySelectorAll('.btn-next');
const previousButtonsElement = document.querySelectorAll('.btn-previous');
const previousSectionButtonsElement =
  document.querySelectorAll('.btn-previous-scn');

const configurationElements = [
  configureAgeElement,
  configureWorkElement,
  configureRetirementElement,
  furtherSettingsElement
];

const allSectionElements = [
  startScreenElement,
  configureDataSectionElement,
  resultSectionElement,
  explanationSectionElement
];

const startButtonElement = document.getElementById('btn-start');
const calculateButtonElement = document.getElementById('btn-doCalculation');
const explanationButtonElement = document.getElementById('btn-explanation');

const riskStageValueElements = document.querySelectorAll('.riskStage');

function displayDiv(divToDisplay, allPossibleElements) {
  const divThatShouldBeDisplayed = allPossibleElements[divToDisplay];
  const divsThatShouldBeHidden = Object.values(allPossibleElements).filter(
    (div) => div !== divThatShouldBeDisplayed
  );
  divThatShouldBeDisplayed.style.display = '';

  for (const div of divsThatShouldBeHidden) {
    div.style.display = 'none';
  }
}

let currentDivDisplayed = 0;
let currentScnDisplayed = 0;

startButtonElement.addEventListener('click', () => {
  document.getElementById('heading').style.display = '';
  currentDivDisplayed = 0;
  currentScnDisplayed++;
  displayDiv(currentScnDisplayed, allSectionElements);
  displayDiv(currentDivDisplayed, configurationElements);
});

calculateButtonElement.addEventListener('click', () => {
  currentDivDisplayed = 0;
  currentScnDisplayed++;
  displayDiv(currentDivDisplayed, configurationElements);
  displayDiv(currentScnDisplayed, allSectionElements);
  checkForEmptyData();
  calculateRetirement();
  updateChart();
  calculateMonthlySavings();
});

explanationButtonElement.addEventListener('click', () => {
  currentScnDisplayed++;
  displayDiv(currentScnDisplayed, allSectionElements);
});

for (let nextButton of nextButtonsElement) {
  nextButton.addEventListener('click', () => {
    currentDivDisplayed++;
    displayDiv(currentDivDisplayed, configurationElements);
  });
}

for (let previousButton of previousButtonsElement) {
  previousButton.addEventListener('click', () => {
    currentDivDisplayed--;
    displayDiv(currentDivDisplayed, configurationElements);
  });
}

for (let previousScnButton of previousSectionButtonsElement) {
  previousScnButton.addEventListener('click', () => {
    currentScnDisplayed--;
    displayDiv(currentScnDisplayed, allSectionElements);
  });
}

const riskStageElement = document.getElementById('range_riskStage');

function showValue(newValue) {
  riskStageValueElements.forEach((value) => (value.innerHTML = newValue));
  calculateMonthlySavings();
}

const showMoreButtonElements = document.querySelectorAll('.btn-show-me-more');

showMoreButtonElements.forEach((button) => {
  button.addEventListener('click', () => {
    const possibleExplanationElements =
      button.parentElement.parentElement.querySelectorAll('.explanation');
    const buttonsInParent =
      button.parentElement.parentElement.querySelectorAll('.btn-show-me-more');
    let indexButton = 0;
    buttonsInParent.forEach((currentButton, currentIndex) => {
      if (currentButton == button) {
        indexButton = currentIndex;
      }
    });

    possibleExplanationElements.forEach((explanation, indexExplanation) => {
      if (indexExplanation != indexButton) {
        if (explanation.classList.contains('open'))
          explanation.classList.remove('open');
      }
    });
    possibleExplanationElements[indexButton].classList.toggle('open');
  });
});

//Manipulate Grid Breakpoints in explanation section
