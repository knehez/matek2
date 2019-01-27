import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

export enum MISSING_PLACE {
  FIRST,
  SECOND,
  THIRD
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  userName = '';
  testStarted: Boolean = false;
  taskNumber = 1;
  questionsInTest = 20;
  correctAnswers = 0;
  testFinished = false;
  currentQuestionIndex = 0;
  solution;
  userSolution;
  currentCorrectAnswer = -1;
  timerStream;
  correctSet = [];
  wrongSet = [];
  countdown = 0;
  endResult = '';
  modalText = '';
  displayModal = false;
  missingPlace: MISSING_PLACE;
  // in order to use the enum in the html template
  MISSING_PLACE = MISSING_PLACE;
  firstNumber: number;
  secondNumber: number;
  thirdNumber: number;
  operation = '';

  constructor() { }

  get result(): string {
    return 'Eredmény: ' + this.questionsInTest + ' / ' + this.correctAnswers + ' jó válasz = ' +
      + (this.correctAnswers * 100 / this.questionsInTest).toPrecision(2) + ' %';
  }

  public startTest() {
    if (this.testStarted) {
      return;
    }
    this.testStarted = true;

    this.currentQuestionIndex = 0;
    this.setNextQuestions();
  }

  startCountdownTimer() {
    const timer = Observable.timer(0, 1000);
    this.timerStream = timer.subscribe(t => this.tickerFunc(t));
  }

  randomSpaces() {
    const n = Math.floor((Math.random() * 10) + 1);
    let ret = '';
    for (let i = 0; i < n; i++) {
      ret += ' ';
    }
    return ret;
  }

  tickerFuncSecureResults(t) {
    this.endResult = this.result + this.randomSpaces();
  }

  tickerFunc(t) {
    this.endResult = this.result + this.randomSpaces();
    // 60 másodperctől számol vissza
    this.countdown = 60 * 1000 - t * 1000;
    if (this.countdown === 0) {
      this.userSolution = 'timeout';
      this.checkSolution();
    }
  }

  checkSolution() {
    this.timerStream.unsubscribe();

    if (parseInt(this.userSolution, 10) === this.currentCorrectAnswer) {
      this.modalText = 'A válasz helyes!';
      this.correctAnswers++;
    } else if (this.userSolution === 'timeout') {
      this.modalText = 'Lejárt az idő!';
    } else {
      this.modalText = 'Sajnos a válasz helytelen!';
    }

    this.displayModal = true;
  }

  setNextQuestions() {
    if (this.testFinished) {
      return;
    }

    if (this.currentQuestionIndex === this.questionsInTest) {
      this.testFinished = true;
      this.modalText = 'Vége a tesztnek';
      this.displayModal = true;
      const timer = Observable.timer(0, 1000);
      this.timerStream = timer.subscribe(t => this.tickerFuncSecureResults(t));
      return;
    }

    this.currentQuestionIndex++;

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
        this.missingPlace = MISSING_PLACE.FIRST;
        this.currentCorrectAnswer = this.firstNumber;
        break;
      case 2:
        this.missingPlace = MISSING_PLACE.SECOND;
        this.currentCorrectAnswer = this.secondNumber;
        break;
      case 3:
        this.missingPlace = MISSING_PLACE.THIRD;
        this.currentCorrectAnswer = this.thirdNumber;
        break;
    }

    this.userSolution = '';
    this.startCountdownTimer();
  }

  getRandomElement(operations: Array<any>) {
    return operations.sort(() => .5 - Math.random());
  }
}
