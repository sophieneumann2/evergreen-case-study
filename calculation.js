const currentTime = new Date();
const currentYear = currentTime.getFullYear();
const yearOfBirthElement = document.getElementById('yearOfBirth');
const ageOfRetirementElement = document.getElementById('ageOfRetirement');
const workStartElement = document.getElementById('workstart-year');
const salaryMonthlyElement = document.getElementById('salary-monthly');

const checkInflationElement = document.getElementById('checkInflation');
const checkSalaryIncreaseElement = document.getElementById(
  'checkSalaryIncrease'
);
const regionElement = document.getElementById('region');
const setDesiredRetirementElement = document.getElementById(
  'val-desiredRetirement'
);
const evalDesiredRetirementElement = document.getElementById('retirementGoal');
const retirementBruttoElement = document.getElementById('retirementBrutto');
const retirementNettoElement = document.getElementById('retirementNetto');
const retirementGapElement = document.getElementById('retirementGap');

const averageYearlySalary = 40551;
let entgeltpunkte = 0;
let retirementBrutto = 0;
let retirementNetto = 0;
let retirementGap = 0;
let ageOfRetirement = 0;
let workStart = 0;
let salaryMonthly = 0;
let yearOfBirth = 0;
let ageOfWorkStart = 0;
let workingYears = 0;
let retirementGoal = 0;
let zugangsfaktor = 0;
let yearPoints = 0;

function calculateRetirement() {
  yearOfBirth = yearOfBirthElement.valueAsNumber;
  ageOfRetirement = ageOfRetirementElement.valueAsNumber;
  workStart = workStartElement.valueAsNumber;
  salaryMonthly = salaryMonthlyElement.valueAsNumber;
  ageOfWorkStart = workStart - yearOfBirth;
  workingYears = ageOfRetirement - ageOfWorkStart;
  retirementGoal = setDesiredRetirementElement.value;

  // Calculate Entgeltpunkte
  if (!checkSalaryIncreaseElement.checked) {
    entgeltpunkte = (workingYears * salaryMonthly * 12) / averageYearlySalary;
  } else {
    yearPoints = 0;
    for (let year = 0; year < workingYears; year++) {
      yearPoints += Math.pow(1.02, year);
    }
    entgeltpunkte = (yearPoints * salaryMonthly * 12) / averageYearlySalary;
  }
  entgeltpunkte = entgeltpunkte.toFixed(3);

  // Calculate Zugangsfaktor
  if (ageOfRetirement == 67) {
    zugangsfaktor = 1;
  } else if (ageOfRetirement < 67) {
    zugangsfaktor = 1 - (67 - ageOfRetirement) * 0.003 * 12;
    if (zugangsfaktor < 0.892) zugangsfaktor = 0.892;
  } else {
    zugangsfaktor = 1 + (ageOfRetirement - 67) * 0.005 * 12;
  }

  // Calculate Bruttorente
  let regionFactor = 0;
  if (regionElement.value == 'east') {
    regionFactor = 33.47;
  } else if (regionElement.value == 'west') {
    regionFactor = 34.19;
  }

  retirementBrutto = entgeltpunkte * zugangsfaktor * regionFactor;
  retirementGap = retirementGoal - retirementBrutto;

  evalDesiredRetirementElement.innerText = setDesiredRetirementElement.value;
  retirementBruttoElement.innerText = retirementBrutto.toFixed(2);
  retirementNettoElement.innerText = (retirementBrutto - 100).toFixed(2);
  retirementGapElement.innerText = retirementGap.toFixed(2);
}

const monthlySavingRateElement = document.getElementById('monthlySavingRate');
let monthlySavingRate = 0;
const livingExpectationYears = 90;
let yearsOfRetirement = 0;
let yearsOfSaving = 0;
let currentRiskStage = 0;
function calculateMonthlySavings() {
  yearsOfRetirement = livingExpectationYears - ageOfRetirement;
  yearsOfSaving = ageOfRetirement - (currentYear - yearOfBirth);
  currentRiskStage = document.getElementById('riskStage').innerHTML;
  monthlySavingRate = Math.round(
    (yearsOfRetirement * retirementGap.toFixed(2)) /
      (yearsOfSaving * currentRiskStage)
  );
  monthlySavingRateElement.innerText = monthlySavingRate;
}
