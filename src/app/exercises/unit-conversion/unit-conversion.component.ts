import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-unit-conversion',
  templateUrl: './unit-conversion.component.html',
  styleUrls: ['./unit-conversion.component.css']
})
export class UnitConversionComponent implements OnInit, OnDestroy {
  @Input() event: Observable<void>;
  @Input() testFinished: boolean;
  @Output() solutionEvent = new EventEmitter<any>();

  question: string;
  correctAnswer;

  fromValue;
  fromUnit;
  toUnit;

  userSolution;
  subscription;

  ngOnInit() {
    this.generateMultiplicationExercise();
    this.subscription = this.event.subscribe(() => this.generateMultiplicationExercise());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  checkSolution() {

    this.userSolution = Number(('' + this.userSolution).replace(',','.'));

    if(Math.abs(this.userSolution - Number(this.correctAnswer)) < 0.1)
    {
      this.userSolution = this.correctAnswer;
    }

    const solution = { correctAnswer: this.correctAnswer, userSolution: this.userSolution };
    this.solutionEvent.emit(solution);
  }

  getRandomNumber(minimum, maximum, precision) {
    minimum = minimum === undefined ? 0 : minimum;
    maximum = maximum === undefined ? 9007199254740992 : maximum;
    precision = precision === undefined ? 0 : precision;
  
    let random = Math.random() * (maximum - minimum) + minimum;
  
    return random.toFixed(precision);
  }

  generateMultiplicationExercise() {
    let result = -1;
    let lengthUnits = [
      {text:'mm', order: 0, multiplication: 10}, 
      {text:'cm', order: 1, multiplication: 10},
      {text:'dm', order: 2, multiplication: 10},
      {text:'m', order: 3, multiplication: 1000},
      {text:'km', order: 4, multiplication: 1}
    ];
    
    let weightUnits = [
      {text:'mg', order: 0, multiplication: 1000}, 
      {text:'g', order: 1, multiplication: 10},
      {text:'dkg', order: 2, multiplication: 100},
      {text:'kg', order: 3, multiplication: 1000},
      {text:'t', order: 4, multiplication: 1}
    ];

    let volumeUnits = [
      {text:'ml', order: 0, multiplication: 10}, 
      {text:'cl', order: 1, multiplication: 10},
      {text:'dl', order: 2, multiplication: 10},
      {text:'l', order: 3, multiplication: 100},
      {text:'hl', order: 4, multiplication: 1}
    ];

    let whichUnit = this.getRandomElement([volumeUnits, weightUnits, lengthUnits])[0];
    this.fromUnit = this.getRandomElement([...whichUnit])[0];
    
    while(true)
    {
      this.toUnit = this.getRandomElement([...whichUnit])[0];
      if(this.fromUnit != this.toUnit)
      {
        break;
      }
    }                                        
    this.fromValue = this.getRandomNumber(0, 100, this.getRandomNumber(0, 3, 0));
    
    let multiplicator = 1;
    if(this.fromUnit.order < this.toUnit.order)
    {
      for(let i = this.fromUnit.order; i < this.toUnit.order; i++)
      {
        multiplicator *= whichUnit[i].multiplication;
        console.log(i + ' ' + multiplicator + ' mult:' + whichUnit[i].multiplication);
      }
      multiplicator = 1.0 / multiplicator;
    }
    else
    {
      for(let i = this.fromUnit.order - 1; i >= this.toUnit.order; i--)
      {
        multiplicator *= whichUnit[i].multiplication;
        console.log(whichUnit[i].text + ' ' + multiplicator + ' mult:' + whichUnit[i].multiplication);
      }
    }

    this.correctAnswer = '' + (this.fromValue * multiplicator);
    this.toUnit = this.toUnit.text;
    this.fromUnit = this.fromUnit.text;
    this.fromValue = ('' + this.fromValue).replace('.',',');
    console.log(this.correctAnswer);
    this.userSolution = '';
  }

  getRandomElement(elements: Array<any>) {
    return elements.sort(() => .5 - Math.random());
  }

}
