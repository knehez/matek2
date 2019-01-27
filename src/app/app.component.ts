import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

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
  currentQuestion = '';
  currentQuestionIndex = 0;
  solution;
  currentSolution;
  currentCorrectAnswer = -1;
  timerStream;
  correctSet = [];
  wrongSet = [];
  countdown = 0;
  endResult = '';
  modalText = '';
  displayModal = false;

  constructor() { }

  get result(): string {
    return 'Eredmény: ' + this.questionsInTest + '-ből ' + this.correctAnswers + ' jó válasz = ' +
      + (this.correctAnswers * 100 / this.questionsInTest).toPrecision(2) + ' %';
  }

  public startTest() {
    // this.ngxSmartModalService.setModalData(this.modalText, 'modalText');
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
      this.currentSolution = 'timeout';
      this.checkSolution();
    }
  }

  checkSolution() {
    this.timerStream.unsubscribe();

    if (parseInt(this.currentSolution, 10) === this.currentCorrectAnswer) {
      this.modalText = 'A válasz helyes!';
      this.correctAnswers++;
    } else if (this.currentSolution === 'timeout') {
      this.modalText = 'Lejárt az idő!';
    } else {
      this.modalText = 'Sajnos a válasz helytelen!';
    }

    this.displayModal = true;
  }

  setNextQuestions() {
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
    let firstNumber: number, secondNumber: number;
    const randomoperation = this.getRandomOperation();

    while (result < 1 || result > 99) {
      firstNumber = Math.floor(Math.random() * 99) + 1;
      secondNumber = Math.floor(Math.random() * 99) + 1;
      switch (randomoperation[0]) {
        case '+':
          result = firstNumber + secondNumber;
          break;
        case '-':
          result = firstNumber - secondNumber;
          break;
        default:
          result = -1;
      }
    }
    this.currentQuestion = firstNumber + ' ' + randomoperation[0] + ' ' + secondNumber;
    this.solution = result;
    this.currentSolution = '';
    this.currentCorrectAnswer = result;
    this.startCountdownTimer();
  }

  getRandomOperation() {
    const operations = ['+', '-'];
    return operations.sort(() => .5 - Math.random());
  }
}
