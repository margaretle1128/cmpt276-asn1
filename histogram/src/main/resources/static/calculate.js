var grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
    49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];

function calFreq(arr){
    var frequency = {};
    var letterGrades = document.querySelectorAll('.hist-left');
    letterGrades.forEach(function(letterGrade) {
        var gradeValue = letterGrade.textContent;
        frequency[gradeValue] = 0;
    });
    for (let i = 0; i < arr.length; i++) {
        switch (true) {
          case arr[i] >= parseFloat(document.querySelector('.a-plus-grade').value):
            frequency['A+']++;
            break;
          case arr[i] >= parseFloat(document.querySelector('.a-grade').value):
            frequency['A']++;
            break;
          case arr[i] >= parseFloat(document.querySelector('.a-minus-grade').value):
            frequency['A-']++;
            break;
          case arr[i] >= parseFloat(document.querySelector('.b-plus-grade').value):
            frequency['B+']++;
            break;
          case arr[i] >= parseFloat(document.querySelector('.b-grade').value):
            frequency['B']++;
            break;
          case arr[i] >= parseFloat(document.querySelector('.b-minus-grade').value):
            frequency['B-']++;
            break;
          case arr[i] >= parseFloat(document.querySelector('.c-plus-grade').value):
            frequency['C+']++;
            break;
          case arr[i] >= parseFloat(document.querySelector('.c-grade').value):
            frequency['C']++;
            break;
          case arr[i] >= parseFloat(document.querySelector('.c-minus-grade').value):
            frequency['C-']++;
            break;
          case arr[i] >= parseFloat(document.querySelector('.d-grade').value):
            frequency['D']++;
            break;
          case arr[i] >= parseFloat(document.querySelector('.f-grade').value):
            frequency['F']++;
            break;
        }
    }
    return frequency;
}

var gradeFreq = calFreq(grades);
console.log("init: ");
console.log(gradeFreq);

function updateHistogram(gradeFreq) {
    var bars = document.querySelectorAll('.bar');
    var categories = Object.keys(gradeFreq);
    
    for (var i = 0; i < categories.length; i++) {
      var category = categories[i];
      var freq = gradeFreq[category];
      var bar = bars[i];
      bar.style.width = freq * 20 + 20 + 'px'; 
      bar.textContent = freq;
    }
}
updateHistogram(gradeFreq);

var gradeInputs = document.querySelectorAll('.bounds input[type="text"]');
var validBounds = true;
gradeInputs.forEach(function(input, index) {
  input.addEventListener('keyup', function(evt) {
    var currentGrade = parseFloat(this.value);
    console.log("current bound " + currentGrade)
    if (input.value.trim() === '') {
        this.setCustomValidity('Please enter a grade.');
        this.reportValidity();
        validBounds = false;
    }
    else if(isNaN(currentGrade)){
        this.setCustomValidity('Please enter a valid grade value.');
        this.reportValidity();
        validBounds = false;
    }
    else if(index == 0 && currentGrade < parseFloat(gradeInputs[index + 1].value)){
        console.log("Invalid grade input for Max grade");
        this.setCustomValidity('Please enter a value greater than A+.');
        this.reportValidity();
        validBounds = false;
    }
    else if(index == (gradeInputs.length - 1) && currentGrade >= parseFloat(gradeInputs[index - 1].value)){
        console.log("Invalid grade input for F grade");
        this.setCustomValidity('Please enter a value lower than D.');
        this.reportValidity();
        validBounds = false;
    }
    else if(index == 1 && currentGrade == parseFloat(gradeInputs[index - 1].value)){
        this.setCustomValidity('');
        validBounds = true;
        gradeFreq = calFreq(grades);
        console.log("umm ");
        console.log(gradeFreq);
        updateHistogram(gradeFreq);
    }
    else if(index != 0 && index != (gradeInputs.length - 1) && currentGrade >= parseFloat(gradeInputs[index - 1].value)){
        console.log("Higher value");
        this.setCustomValidity('Please enter a value lower than the value above.');
        this.reportValidity();
        validBounds = false;
    }
    else if(index != 0 && index != (gradeInputs.length - 1) && currentGrade <= parseFloat(gradeInputs[index + 1].value)){
        console.log("Lower value");
        this.setCustomValidity('Please enter a value higher than the value below.');
        this.reportValidity();
        validBounds = false;
    }
    else{
        this.setCustomValidity('');
        validBounds = true;
        gradeFreq = calFreq(grades);
        console.log("change bound: ");
        console.log(gradeFreq);
        updateHistogram(gradeFreq);
    }
  });
});

var btn = document.querySelector('input[value="SUBMIT"]');
var newGrade = document.querySelector('.grade-input')
btn.addEventListener('click', function(evt) {
    evt.preventDefault();
    console.log("grade input: " + parseFloat(document.querySelector('.grade-input').value))
    if(validBounds == false){
        console.log("duma")
        alert("Please enter valid lower bounds before submitting a new grade.");
    }
    else{
        var maxGradeInput = parseFloat(document.getElementsByClassName('max-grade')[0].value);
        var fGradeInput = parseFloat(document.getElementsByClassName('f-grade')[0].value); 
        var input = parseFloat(document.querySelector('.grade-input').value);
        if (isNaN(input)){
            console.log("NaN input")
            newGrade.setCustomValidity('Please enter a valid grade value.');
            newGrade.reportValidity();
        }
        else if(input > maxGradeInput){
            newGrade.setCustomValidity('Please enter a value lower than max grade.');
            newGrade.reportValidity();
        }
        else if(input < fGradeInput){
            newGrade.setCustomValidity('Please enter a value greater than F grade.');
            newGrade.reportValidity();
        }
        else{
            this.setCustomValidity('');
            grades.push(input);
            gradeFreq = calFreq(grades);
            console.log("add grade: ");
            console.log(gradeFreq);
            updateHistogram(gradeFreq);
        }
    }
});

newGrade.addEventListener('input', function() {
    newGrade.setCustomValidity('');
});