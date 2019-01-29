import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrls: ['./relation.component.css']
})
export class RelationComponent implements OnInit, OnDestroy {
  @Input() testFinished: boolean;
  @Input() refresh: number;
  @Input() event: Observable<void>;
  @Output() solutionEvent = new EventEmitter<any>();

  firstNumber;
  secondNumber;
  thirdNumber;
  forthNumber;
  operation1;
  operation2;

  correctAnswer;
  subscription;

  constructor() { }

  ngOnInit() {
    this.generateRelationsExercise();
    this.subscription = this.event.subscribe(() => this.generateRelationsExercise());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  checkSolution(userSolution) {
    const solution = { correctAnswer: this.correctAnswer, userSolution: userSolution };
    this.solutionEvent.emit(solution);
  }

  generateRelationsExercise() {
    let result1 = -1;

    this.operation1 = this.getRandomElement([' + ', ' - '])[0];
    this.operation2 = this.getRandomElement([' + ', ' - '])[0];

    while (result1 < 1 || result1 > 99) {
      this.firstNumber = Math.floor(Math.random() * 99) + 1;
      this.secondNumber = Math.floor(Math.random() * 99) + 1;
      switch (this.operation1) {
        case ' + ':
          result1 = this.firstNumber + this.secondNumber;
          break;
        case ' - ':
          result1 = this.firstNumber - this.secondNumber;
          break;
        default:
          result1 = -1;
      }
    }

    let result2 = -1;

    while (result2 < 1 || result2 > 99) {
      this.thirdNumber = Math.floor(Math.random() * 99) + 1;
      this.forthNumber = Math.floor(Math.random() * 99) + 1;
      switch (this.operation2) {
        case ' + ':
          result2 = this.thirdNumber + this.forthNumber;
          break;
        case ' - ':
          result2 = this.thirdNumber - this.forthNumber;
          break;
        default:
          result2 = -1;
      }
    }

    if (result1 < result2) {
      this.correctAnswer = '<';
    }

    if (result1 > result2) {
      this.correctAnswer = '>';
    }

    if (result1 === result2) {
      this.correctAnswer = '=';
    }
  }

  getRandomElement(elements: Array<any>) {
    return elements.sort(() => .5 - Math.random());
  }
}
