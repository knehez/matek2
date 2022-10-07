import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

export enum TASK_TYPE {
  SIMPLE_PLUS_MINUS,
  RELATIONS,
  SEQUENCE,
  TEXTUAL,
  MULTIPLICATION,
  UNIT_CONVERSION
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('scrollMe', { static: false }) private myScrollContainer: ElementRef;
  eventsSubject: Subject<void> = new Subject<void>();

  userName = '';
  testStarted: boolean = false;
  taskNumber = 1;
  questionsInTest = 20;
  correctAnswers = 0;
  testFinished = false;
  currentQuestionIndex = 0;
  solution;
  userSolution;
  currentCorrectAnswer = '';
  timerStream;
  countdown = 0;
  endResult = '';
  modalText = '';
  displayModal = false;
  taskType: TASK_TYPE;
  // in order to use the enum in the html template
  TASK_TYPE = TASK_TYPE;

  get result(): string {
    return 'Eredmény: ' + this.questionsInTest + ' / ' + this.correctAnswers;
  }

  get resultRate(): string {
    return 'Jó válaszok: ' +
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
    // 180 másodperctől számol vissza
    this.countdown = 180 * 1000 - t * 1000;
    if (this.countdown === 0) {
      this.userSolution = 'timeout';
      this.checkSolution();
    }
  }

  gotSolution($event) {
    this.userSolution = $event.userSolution;
    this.currentCorrectAnswer = $event.correctAnswer;
    this.checkSolution();
  }

  checkSolution(answer?: string) {
    if (answer !== undefined) {
      this.userSolution = answer;
    }

    if (this.userSolution === '') {
      return;
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

    this.taskType = TASK_TYPE.UNIT_CONVERSION;

    this.userSolution = '';
    this.startCountdownTimer();
    this.testFinished = false;
    this.eventsSubject.next();
  }

  getRandomElement(elements: Array<any>) {
    return elements.sort(() => .5 - Math.random());
  }
}
