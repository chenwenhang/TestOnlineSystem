import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema, SFComponent } from '@delon/form';

@Component({
  selector: 'app-manage-paper-manage-edit',
  templateUrl: './edit.component.html',
})
export class ManagePaperManageEditComponent implements OnInit {
  record: any = {};
  i: any;
  occupation = [];
  question = [];
  questionName = [];
  user = JSON.parse(localStorage.getItem('user'));

  @ViewChild('sf') sf: SFComponent;
  schema: SFSchema = {
    properties: {
      title: { type: 'string', title: '标题' },
      instructions: { type: 'string', title: '考卷概述' },
      occupation: { type: 'string', title: '适用职业', enum: [] },
      // total_mark: { type: 'string', title: '总分' },
      is_valid: {
        type: 'boolean',
        title: '是否有效',
        enum: [
          { label: '有效', value: true },
          { label: '禁用', value: false },
        ],
        default: true
      },
      is_public: {
        type: 'boolean',
        title: '是否公开',
        enum: [
          { label: '公开', value: true },
          { label: '私有', value: false },
        ],
        default: true
      },
      start_time: { type: 'string', title: '考试时间', format: 'date-time', default: new Date },
      end_time: { type: 'string', format: 'date-time', },
      questions: {
        type: "array",
        title: "添加试题",
        maxItems: 15,
        items: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              title: "试题",
              enum: [],
              ui: {
                widget: 'select',
                grid: { span: 24 },
              }
            },
            score: {
              type: 'number',
              title: "分值"
            }
          },
          required: [
            "_id", "score"
          ],
          ui: {
            spanLabel: 4,
            spanControl: 20
          }
        },
      },
    },
    required: ['title', 'occupation', 'is_valid', 'is_public', 'start_time','end_time'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $questions: {
      grid: { span: 24, arraySpan: 24 },
    },
    $title: {
      widget: 'string',
      grid: { span: 24 },
    },
    $instructions: {
      widget: 'textarea',
      autosize: { minRows: 2, maxRows: 6 },
      grid: { span: 24 },
    },
    $occupation: {
      widget: 'select',
      grid: { span: 24 },
    },
    // $total_mark: {
    //   widget: 'string',
    //   grid: { span: 24 },
    // },
    $is_valid: {
      widget: 'radio',
      styleType: "button",
      grid: { span: 24 },
    },
    $is_public: {
      widget: 'radio',
      styleType: "button",
      grid: { span: 24 },
    },
    $start_time: {
      widget: 'date', end: 'end_time',
      grid: { span: 24 },
    },
    $end_time: {
      widget: 'date', end: 'end_time',
      grid: { span: 24 },
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.get(`/manage/occupation?_allow_anonymous=true`).subscribe((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        let tmp = res.data[i].occupation;
        this.occupation.push({ label: tmp, value: tmp });
      }
      this.schema.properties.occupation.enum = this.occupation;
      this.sf.refreshSchema();
      // console.log(this.occupation);
    })
    this.http.get(`/manage/question?_allow_anonymous=true`).subscribe((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        var tmp = res.data[i];
        this.question.push(tmp);
        this.questionName.push({ label: tmp.content, value: tmp._id });
      }
      // console.log(this.question);
      // console.log(this.questionName);
      this.schema.properties.questions.items.properties._id.enum = this.questionName;
      this.sf.refreshSchema();
      // console.log(this.occupation);
    })
  }

  save(value: any) {
    // 作者 
    // 时间合法性
    // 总分 
    // 试题 
    value.total_mark = 0;
    for (let i = 0; i < value.questions.length; i++) {
      value.total_mark += value.questions[i].score;
    }

    let tmpQuestion = JSON.parse(JSON.stringify(value.questions));
    delete value.questions;
    value.questions = [];
    for (let i = 0; i < tmpQuestion.length; i++) {
      for (let j = 0; j < this.question.length; j++) {
        if (tmpQuestion[i]._id == this.question[j]._id) {
          this.question[j].score = tmpQuestion[i].score;
          value.questions.push(this.question[j]);
        }
      }
    }

    // console.log(value);

    if (value._id) {
      this.http.put(`/manage/paper/edit?_allow_anonymous=true`, value).subscribe((res: any) => {
        if (!res.code) {
          this.msgSrv.error(res.msg);
          return;
        }
        this.msgSrv.success(res.msg);
        this.modal.close(true);
      });
    } else {
      delete value._id;
      value.create_user = this.user.username;
      this.http.post(`/manage/paper/add?_allow_anonymous=true`, value).subscribe((res: any) => {
        if (!res.code) {
          this.msgSrv.error(res.msg);
          return;
        }
        this.msgSrv.success(res.msg);
        this.modal.close(true);
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}
