import { ClientStartExamViewComponent } from './view/view.component';
import { ShareService } from '@core/startup/share.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema, SFUISchema, SFComponent } from '@delon/form';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { addMinutes } from 'date-fns';
var validator = require('validator');
var dateFormat = require('dateformat');

@Component({
  selector: 'app-client-start-exam',
  templateUrl: './start-exam.component.html',
})
export class ClientStartExamComponent implements OnInit {
  mock: any;
  paper: any;
  option = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
  answer = [];
  target: any;
  config = {
    template: '$!d!天$!h!时$!m!分$!s!秒',
    // leftTime: 35999.9,
    stopTime: null,
    clock: ['d', 100, 2, 'h', 24, 2, 'm', 60, 2, 's', 60, 2, 'u', 10, 1]
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: _HttpClient,
    private modal: ModalHelper,
    public shareService: ShareService,
  ) { }

  ngOnInit() {
    // console.log("???");

    let tmp = JSON.parse(localStorage.getItem('paper'));
    if (tmp) {
      // if mock exam
      if (!tmp.end_time) {
        let r = confirm("当前有模拟考试正在进行，是否继续作答？");
        if (r) {
          this.paper = tmp;
          this.mock = "1";
          this.answer = this.paper.answers;
        } else {
          this.initNewExam();

        }
      } else {
        // if formal exam
        // if localStorage & valid
        let nowTimestamp = new Date().getTime();
        let endTimeStamp = this.getTimeStamp(tmp.end_time);
        if (nowTimestamp < endTimeStamp) {
          let r = confirm("当前有正式考试正在进行且未超过截止时间，是否继续作答！");
          if (r) {
            this.paper = tmp;
            this.mock = "0";
            this.answer = this.paper.answers;
            this.config.stopTime = endTimeStamp;

          } else {
            this.initNewExam();

          }
          // if not valid
        } else {
          this.initNewExam();

        }
      }
    } else {
      this.initNewExam();

    }
  }

  // start a new exam 
  initNewExam() {
    localStorage.setItem("paper", null);
    this.route.queryParams.subscribe(data => {
      // url can only pass string
      this.mock = data.mock;
      this.paper = this.shareService.getPaper();
      // if 
      if (!this.paper) {
        alert("当前没有考试！");
        this.router.navigate(['/dashboard']);
        return;
        // window.location.href="/#/dashboard";
      }
      // if mock exam
      if (this.mock == "1") {

        // if formal exam
      } else {
        // console.log(this.paper)
        // this.target = this.getTimeStamp(this.paper.end_time)/1000;
        this.config.stopTime = this.getTimeStamp(this.paper.end_time);


        // console.log(this.target)

        // this.target = addMinutes(new Date, 1000);

      }
      if (this.paper) {
        for (let k = 0; k < this.paper.questions.length; k++) {
          this.answer.push(null);
        }
      }
    })
  }

  autoSubmit() {
    // is_finish_exam
    for (let i = 0; i < this.answer.length; i++) {
      // transfer answer
      if (Array.isArray(this.answer[i])) {
        let j: number;
        let str = "";
        for (j = 0; j < this.answer[i].length - 1; j++) {
          if (this.answer[i][j]) {
            str += this.answer[i][j] + ","
          }
        }
        if (this.answer[i][j]) {
          str += this.answer[i][j];
        }
        this.answer[i] = str
      }
    }
    // if mock exam
    if (this.mock == "1") {
      // add end_time
      this.paper.end_time = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
    }
    // add username
    this.paper.username = JSON.parse(localStorage.getItem('user')).username;
    // add answer to questions
    for (let j = 0; j < this.paper.questions.length; j++) {
      this.paper.questions[j].answer = this.answer[j];
    }
    // console.log(this.paper);
    this.http.post(`/manage/paper_history/add?_allow_anonymous=true`, this.paper).subscribe((res: any) => {
      this.modal
        .createStatic(ClientStartExamViewComponent, { i: res.data })
        .subscribe();
    });
  }

  submit() {
    // is_finish_exam
    for (let i = 0; i < this.answer.length; i++) {
      if (this.answer[i] == null) {
        let r = confirm("有试题尚未完成，确认交卷吗？");
        if (r) {
        } else {
          return;
        }
      }
      // transfer answer
      if (Array.isArray(this.answer[i])) {
        let j: number;
        let str = "";
        for (j = 0; j < this.answer[i].length - 1; j++) {
          if (this.answer[i][j]) {
            str += this.answer[i][j] + ","
          }
        }
        if (this.answer[i][j]) {
          str += this.answer[i][j];
        }
        this.answer[i] = str
      }
    }

    // if mock exam
    if (this.mock == "1") {
      // add end_time
      this.paper.end_time = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
    }
    // add username
    this.paper.username = JSON.parse(localStorage.getItem('user')).username;

    // add answer to questions
    for (let j = 0; j < this.paper.questions.length; j++) {
      this.paper.questions[j].answer = this.answer[j];

    }

    // console.log(this.paper);
    this.http.post(`/manage/paper_history/add?_allow_anonymous=true`, this.paper).subscribe((res: any) => {
      this.modal
        .createStatic(ClientStartExamViewComponent, { i: res.data })
        .subscribe();
    });

  }

  updateAnswer(value: any, num: number, index: number) {
    if (this.answer[num] === null) {
      let length = this.paper.questions[num].analysis.length;
      this.answer[num] = [];
      for (let k = 0; k < length; k++) {
        this.answer[num].push(null);
      }
    }

    if (value.length > 0) {
      this.answer[num][index] = value[0];
    } else {
      this.answer[num][index] = null;
    }
  }

  saveExam(value: any) {
    this.paper.answers = this.answer;
    localStorage.setItem("paper", JSON.stringify(this.paper));
  }

  getTimeStamp(str: string) {
    let date = str;
    date = date.substring(0, 19);
    date = date.replace(/-/g, '/');
    let timestamp = new Date(date).getTime();
    return timestamp;
  }

  isMatch(value: any) {
    if (value === null || value == undefined)
      return true;
    let str = String(value);
    return validator.matches(str, '^([A-O],)*[A-O]$');
  }

}
