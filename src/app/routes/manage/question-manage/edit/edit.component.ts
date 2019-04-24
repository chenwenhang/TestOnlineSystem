import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-manage-question-manage-edit',
  templateUrl: './edit.component.html',
})
export class ManageQuestionManageEditComponent implements OnInit {
  record: any = {};
  i: any;
  tag = [];
  schema: SFSchema = {
    properties: {
      type: {
        type: 'string', title: '类型',
        enum: [
          { label: "单选题", value: "单选题" },
          { label: "多选题", value: "多选题" },
          { label: "判断题", value: "判断题" },
          { label: "排序题", value: "排序题" },
          { label: "填空题", value: "填空题" },
        ],
        default: "单选题",
      },
      content: { type: 'string', title: '题干' },
      analysis: {
        type: "array",
        title: "添加选项",
        maxItems: 15,
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              title: "选项",
              ui: {
                widget: 'textarea',
                autosize: { maxRows: 6 },
              }
            }
          },
          required: [
            "name"
          ],
          ui: {
            spanLabel: 4,
            spanControl: 20
          }
        },
      },
      right: { 
        type: 'string', 
        title: '正确答案', 
        description: '注：<br>单选题直接输入大写字母；<br>排序题和多选题输入大写字母，以逗号隔开；<br>判断题输入A表示正确，输入B表示错误；<br>填空题直接输入答案' },
      tag: { type: 'string', title: '标签' },
      explanation: {
        type: 'string',
        title: '解析',
      },
    },
    required: ['type', 'content', 'right', 'tag'],

    if: {
      properties: {
        type: { enum: ["单选题", "多选题", "排序题"] },
      }
    },
    then: {
      required: ['analysis'],
    },
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $type: {
      widget: 'radio',
      styleType: "button",
      grid: { span: 24 },
    },
    $content: {
      widget: 'textarea',
      autosize: { maxRows: 6 },
      grid: { span: 24 },
    },
    $analysis: {
      grid: { span: 24, arraySpan: 24 },
    },
    $right: {
      widget: 'string',
      grid: { span: 24 },
    },
    $explanation: {
      widget: 'textarea',
      autosize: { maxRows: 6 },
      grid: { span: 24 },
    },
    $tag: {
      widget: 'select',
      mode: 'tags',
      grid: { span: 24 },
      asyncData: () => of([
        {
          label: '选择标签',
          group: true,
          children: this.tag
        }]),
      default: null,
      maxMultipleCount: 3
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) { }

  ngOnInit(): void {
    if (this.i._id) {
      if (this.i.type == '单选题' || this.i.type == '多选题' || this.i.type == '排序题') {
        let tmp = this.i.analysis;
        delete this.i.analysis;
        this.i.analysis = [];
        for (let j = 0; j < tmp.length; j++) {
          this.i.analysis.push({ name: tmp[j] })
        }
        // console.log(this.i);
      }
    }
    this.http.get(`/manage/tag?_allow_anonymous=true`).subscribe((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        let tmp = res.data[i].tag;
        this.tag.push({ label: tmp, value: tmp });
      }
      // console.log(this.tag);
    })
  }

  save(value: any) {
    if (value.type == '单选题' || value.type == '多选题' || value.type == '排序题') {
      for (let i = 0; i < value.analysis.length; i++) {
        value.analysis[i] = value.analysis[i].name;
      }
    }
    if (value._id) {
      this.http.put(`/manage/question/edit?_allow_anonymous=true`, value).subscribe((res: any) => {
        if (!res.code) {
          this.msgSrv.error(res.msg);
          return;
        }
        this.msgSrv.success(res.msg);
        this.modal.close(true);
      });
    } else {
      delete value._id;
      this.http.post(`/manage/question/add?_allow_anonymous=true`, value).subscribe((res: any) => {
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
