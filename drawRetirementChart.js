const drawRetirementElement = document.getElementById('draw-retirement');
const drawRetirementGapElement = document.getElementById('draw-retirementGap');

function updateChart() {
  const retirementWidth = Math.round(
    (retirementBrutto * 100) / setDesiredRetirementElement.value
  );
  const retirementGapWidth = 100 - retirementWidth;
  drawRetirementElement.style.width = retirementWidth;
  drawRetirementElement.innerText = `${Math.round(retirementBrutto)} €`;
  drawRetirementGapElement.style.width = retirementGapWidth;
  drawRetirementGapElement.innerText = `${Math.round(retirementGap)} €`;
}
