import { ShareService } from '@core/startup/share.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema, SFUISchema, SFComponent } from '@delon/form';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-start-exam',
  templateUrl: './start-exam.component.html',
})
export class ClientStartExamComponent implements OnInit {
  paper: any;
  option = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
  answer = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: _HttpClient,
    private modal: ModalHelper,
    public shareService: ShareService,
  ) { }

  ngOnInit() {
    let tmp = JSON.parse(localStorage.getItem('paper'));
    if (tmp) {
      let nowTimestamp = new Date().getTime();
      let endTimeStamp = this.getTimeStamp(tmp.end_time);
      // if localStorage & valid
      if (nowTimestamp < endTimeStamp) {
        this.paper = tmp;
        alert("当前有考试正在进行且合法，请继续作答！");
        // if not valid
      } else {
        this.initNewExam();
      }
    } else {
      this.initNewExam();
    }
  }

  // start a new exam 
  initNewExam() {
    this.route.queryParams.subscribe(data => {
      // url can only pass string
      let mock = data.mock;
      this.paper = this.shareService.getPaper();
      // if 
      if (!this.paper) {
        alert("当前没有考试！");
        this.router.navigate(['/dashboard']);
      }
      // if mock exam
      if (mock == "0") {

        // if formal exam
      } else {

      }
      if (this.paper)
        for (let k = 0; k < this.paper.questions.length; k++) {
          this.answer.push(null);
        }
    })
  }

  submit() {
    for (let i = 0; i < this.answer.length; i++) {
      if (this.answer[i] == null) {
        alert("请完成所有试题！！");
        return;
      }
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
    // console.log(this.answer);

    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
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
    localStorage.setItem("paper", JSON.stringify(this.paper));
  }

  getTimeStamp(str: string) {
    let date = str;
    date = date.substring(0, 19);
    date = date.replace(/-/g, '/');
    let timestamp = new Date(date).getTime();
    return timestamp;
  }
}
