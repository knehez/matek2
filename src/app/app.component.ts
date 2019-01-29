import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';

enum MISSING_PLACE {
  FIRST,
  SECOND,
  THIRD
}

enum TASK_TYPE {
  SIMPLE_PLUS_MINUS,
  RELATIONS
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  userName = '';
  testStarted: Boolean = false;
  taskNumber = 1;
  questionsInTest = 20;
  correctAnswers = 0;
  testFinished = false;
  currentQuestionIndex = 0;
  solution;
  userSolution;
  currentCorrectAnswer = '';
  timerStream;
  correctSet = [];
  wrongSet = [];
  countdown = 0;
  endResult = '';
  modalText = '';
  displayModal = false;
  missingPlace: MISSING_PLACE;
  taskType: TASK_TYPE;
  // in order to use the enum in the html template
  MISSING_PLACE = MISSING_PLACE;
  TASK_TYPE = TASK_TYPE;
  firstNumber: number;
  secondNumber: number;
  thirdNumber: number;
  forthNumber: number;
  operation1 = '';
  operation2 = '';

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
    setTimeout(() => {
      try {
        this.myScrollContainer.nativeElement.scrollIntoView(false);
      } catch (err) { console.log(err); }
    }, 500);
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

  checkSolution(answer?: string) {
    if (answer !== undefined) {
      this.userSolution = answer;
    }

    this.timerStream.unsubscribe();

    if ('' + this.userSolution === this.currentCorrectAnswer) {
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

    this.taskType = this.getRandomElement([TASK_TYPE.SIMPLE_PLUS_MINUS, TASK_TYPE.RELATIONS])[0];
    this.operation1 = this.getRandomElement([' + ', ' - '])[0];
    this.operation2 = this.getRandomElement([' + ', ' - '])[0];

    switch (this.taskType) {
      case TASK_TYPE.SIMPLE_PLUS_MINUS:
        this.generateSimplePlusMinusExercise();
        break;
      case TASK_TYPE.RELATIONS:
        this.generateRelationsExercise();
        break;
    }

    this.userSolution = '';
    this.startCountdownTimer();
  }

  generateRelationsExercise() {
    let result1 = -1;

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
      this.currentCorrectAnswer = '<';
    }

    if (result1 > result2) {
      this.currentCorrectAnswer = '>';
    }

    if (result1 === result2) {
      this.currentCorrectAnswer = '=';
    }

  }

  generateSimplePlusMinusExercise() {
    let result = -1;

    while (result < 1 || result > 99) {
      this.firstNumber = Math.floor(Math.random() * 99) + 1;
      this.secondNumber = Math.floor(Math.random() * 99) + 1;
      switch (this.operation1) {
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
        this.currentCorrectAnswer = '' + this.firstNumber;
        break;
      case 2:
        this.missingPlace = MISSING_PLACE.SECOND;
        this.currentCorrectAnswer = '' + this.secondNumber;
        break;
      case 3:
        this.missingPlace = MISSING_PLACE.THIRD;
        this.currentCorrectAnswer = '' + this.thirdNumber;
        break;
    }
  }

  getRandomElement(elements: Array<any>) {
    return elements.sort(() => .5 - Math.random());
  }
}
