(function () {
  'use strict';

  var wheel = document.getElementById('lotteryWheel');
  var spinButton = document.getElementById('spinButton');
  var spinButtonText = document.getElementById('spinButtonText');
  var resultValue = document.getElementById('resultValue');

  var values = [
    { number: 1, code: 'TF', label: '1 - TF' },
    { number: 2, code: 'EF', label: '2 - EF' },
    { number: 3, code: 'NO', label: '3 - NO' },
    { number: 4, code: 'ET', label: '4 - ET' },
    { number: 5, code: 'BG', label: '5 - BG' },
    { number: 6, code: 'ER', label: '6 - ER' },
    { number: 7, code: 'ET', label: '7 - ET' },
    { number: 8, code: 'MO', label: '8 - MO' },
    { number: 9, code: 'ML', label: '9 - ML' },
    { number: 10, code: 'A', label: '10 - A' },
    { number: 11, code: 'MS', label: '11 - MS' },
    { number: 12, code: 'ED', label: '12 - ED' }
  ];
  var segmentAngle = 360 / values.length;
  var currentRotation = 0;
  var isSpinning = false;

  function getRandomIndex() {
    // Crypto random gives better randomness where available.
    if (window.crypto && window.crypto.getRandomValues) {
      var randomArray = new Uint32Array(1);
      window.crypto.getRandomValues(randomArray);
      return randomArray[0] % values.length;
    }

    return Math.floor(Math.random() * values.length);
  }

  function spinWheel() {
    if (isSpinning) {
      return;
    }

    isSpinning = true;
    spinButton.disabled = true;
    spinButtonText.textContent = 'SPINNING...';
    resultValue.textContent = '--';

    var selectedIndex = getRandomIndex();
    var selectedValue = values[selectedIndex];

    // Segment centers are placed at 15, 45, 75 ... 345 degrees from the top.
    // To stop the chosen segment under the top pointer, rotate by the negative center angle.
    var selectedCenterAngle = (selectedIndex * segmentAngle) + (segmentAngle / 2);
    var stopAngle = (360 - selectedCenterAngle) % 360;

    var currentNormalized = ((currentRotation % 360) + 360) % 360;
    var extraTurns = 5 + Math.floor(Math.random() * 3); // 5 to 7 full turns
    var deltaToStop = (stopAngle - currentNormalized + 360) % 360;

    currentRotation += (extraTurns * 360) + deltaToStop;
    wheel.style.transform = 'rotate(' + currentRotation + 'deg)';

    window.setTimeout(function () {
      resultValue.textContent = selectedValue.label;
      spinButtonText.textContent = 'SPIN AGAIN';
      spinButton.disabled = false;
      isSpinning = false;
    }, 3400);
  }

  spinButton.addEventListener('click', spinWheel);
})();
