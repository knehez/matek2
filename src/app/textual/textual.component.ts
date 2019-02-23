import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-textual',
  templateUrl: './textual.component.html',
  styleUrls: ['./textual.component.css']
})
export class TextualComponent implements OnInit, OnDestroy {
  @Input() event: Observable<void>;
  @Input() testFinished: boolean;
  @Output() solutionEvent = new EventEmitter<any>();

  question: string;
  correctAnswer;

  userSolution;
  MISSING_PLACE: 'FIRST' | 'SECOND' | 'THIRD';

  subscription;

  constructor() { }

  ngOnInit() {
    this.generateTextualExercise();
    this.subscription = this.event.subscribe(() => this.generateTextualExercise());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  checkSolution() {
    const solution = { correctAnswer: this.correctAnswer, userSolution: this.userSolution };
    this.solutionEvent.emit(solution);
  }

  generateTextualExercise() {
    this.question = this.getRandomElement(['Zoli bácsi', 'Marika néni', 'Pali bácsi', 'Zsóka néni'])[0];

    const animal1 = this.getRandomElement([2, 3, 4, 5, 6, 7])[0];
    this.question += ' ' + animal1 + ' ';
    const legs = this.getRandomElement([2, 4])[0];

    switch (legs) {
      case 2:
      this.question += this.getRandomElement(['kacsájának', 'libájának', 'galambjának', 'tyúkjának'])[0];
      this.correctAnswer = '' + (animal1 * 2);
        break;
      case 4:
      this.question += this.getRandomElement(['kutyájának', 'macskájának', 'malacának', 'tehenének', 'kecskéjének'])[0];
      this.correctAnswer = '' + (animal1 * 4);
        break;
    }
    this.question += ' hány lába van összesen?';

    this.userSolution = '';
  }

  getRandomElement(elements: Array<any>) {
    return elements.sort(() => .5 - Math.random());
  }
}
