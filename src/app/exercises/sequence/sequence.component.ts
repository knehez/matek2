import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.css']
})
export class SequenceComponent implements OnInit, OnDestroy {
  @Input() event: Observable<void>;
  @Input() testFinished: boolean;
  @Output() solutionEvent = new EventEmitter<any>();
  subscription;
  correctAnswer: string;
  userSolution;
  firstNumber;
  secondNumber;
  thirdNumber;

  constructor() { }

  ngOnInit(): void {
    this.generateSequenceExercise();
    this.subscription = this.event.subscribe(() => this.generateSequenceExercise());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  checkSolution() {
    const solution = { correctAnswer: this.correctAnswer, userSolution: this.userSolution };
    this.solutionEvent.emit(solution);
  }

  generateSequenceExercise() {
    let result = -1;

    switch (this.getRandomElement(['+', '-'])[0]) {
      case '+':
        while (result < 1 || result > 99) {
          const increment = Math.floor(Math.random() * 6) + 4;
          this.firstNumber = Math.floor(Math.random() * 60) + 20;
          this.secondNumber = this.firstNumber + increment;
          this.thirdNumber = this.secondNumber + increment;
          result = this.thirdNumber + increment;
        }
        break;
      case '-':
        while (result < 1 || result > 99) {
          const increment = Math.floor(Math.random() * 6) + 4;
          this.firstNumber = Math.floor(Math.random() * 60) + 20;
          this.secondNumber = this.firstNumber - increment;
          this.thirdNumber = this.secondNumber - increment;
          result = this.thirdNumber - increment;
        }
        break;
    }

    this.correctAnswer = '' + result;
    this.userSolution = '';
  }

  getRandomElement(elements: Array<any>) {
    return elements.sort(() => .5 - Math.random());
  }
}
