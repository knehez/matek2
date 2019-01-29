import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-simple-operation',
  templateUrl: './simple-operation.component.html',
  styleUrls: ['./simple-operation.component.css']
})
export class SimpleOperationComponent implements OnInit, OnDestroy {
  @Input() event: Observable<void>;
  @Input() testFinished: boolean;
  @Output() solutionEvent = new EventEmitter<any>();

  missingPlace;
  firstNumber;
  secondNumber;
  thirdNumber;
  operation;
  correctAnswer;

  userSolution;
  MISSING_PLACE: 'FIRST' | 'SECOND' | 'THIRD';

  subscription;

  constructor() { }

  ngOnInit() {
    this.generateSimplePlusMinusExercise();
    this.subscription = this.event.subscribe(() => this.generateSimplePlusMinusExercise());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  checkSolution() {
    const solution = { correctAnswer: this.correctAnswer, userSolution: this.userSolution };
    this.solutionEvent.emit(solution);
  }

  generateSimplePlusMinusExercise() {
    let result = -1;

    this.operation = this.getRandomElement([' + ', ' - '])[0];

    while (result < 1 || result > 99) {
      this.firstNumber = Math.floor(Math.random() * 99) + 1;
      this.secondNumber = Math.floor(Math.random() * 99) + 1;
      switch (this.operation) {
        case ' + ':
          result = this.firstNumber + this.secondNumber;
          break;
        case ' - ':
          result = this.firstNumber - this.secondNumber;
          break;
        default:
          result = -1;
      }
    }

    this.thirdNumber = result;

    switch (this.getRandomElement([1, 2, 3])[0]) {
      case 1:
        this.missingPlace = 'FIRST';
        this.correctAnswer = '' + this.firstNumber;
        break;
      case 2:
        this.missingPlace = 'SECOND';
        this.correctAnswer = '' + this.secondNumber;
        break;
      case 3:
        this.missingPlace = 'THIRD';
        this.correctAnswer = '' + this.thirdNumber;
        break;
    }

    this.userSolution = '';
  }

  getRandomElement(elements: Array<any>) {
    return elements.sort(() => .5 - Math.random());
  }
}
