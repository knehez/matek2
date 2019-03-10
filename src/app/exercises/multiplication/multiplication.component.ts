import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-multiplication',
  templateUrl: './multiplication.component.html',
  styleUrls: ['./multiplication.component.css']
})
export class MultiplicationComponent implements OnInit, OnDestroy {
  @Input() event: Observable<void>;
  @Input() testFinished: boolean;
  @Output() solutionEvent = new EventEmitter<any>();

  question: string;
  correctAnswer;

  firstNumber;
  secondNumber;

  userSolution;
  subscription;
  operation;

  ngOnInit() {
    this.generateMultiplicationExercise();
    this.subscription = this.event.subscribe(() => this.generateMultiplicationExercise());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  checkSolution() {
    const solution = { correctAnswer: this.correctAnswer, userSolution: this.userSolution };
    this.solutionEvent.emit(solution);
  }

  generateMultiplicationExercise() {
    let result = -1;

    this.operation = this.getRandomElement(['*', ':'])[0];
    this.firstNumber = this.getRandomElement([3, 4, 5, 6, 8])[0];
    this.secondNumber = this.getRandomElement([5, 6, 7, 8, 9])[0];

    switch (this.operation) {
      case '*':
        this.correctAnswer = '' + this.firstNumber * this.secondNumber;
        break;
      case ':':
        result = this.firstNumber * this.secondNumber;
        this.correctAnswer = '' + this.secondNumber;
        this.secondNumber = this.firstNumber;
        this.firstNumber = result;
        break;
      default:
        break;
    }
    this.userSolution = '';
  }

  getRandomElement(elements: Array<any>) {
    return elements.sort(() => .5 - Math.random());
  }
}
