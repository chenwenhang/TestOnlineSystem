import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema, SFUISchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';
import { of } from 'rxjs';
import { ShareService } from '@core/startup/share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-mock-exam',
  templateUrl: './mock-exam.component.html',
})
export class ClientMockExamComponent implements OnInit {
  i: any;
  tag = [];
  button = {
    submit: '开始考试',
    reset: ''
  }
  schema: SFSchema = {
    properties: {
      discription: { type: 'string', title: '描述', ui: { spanControl: 15 } },
      tag: { type: 'string', title: '标签', ui: { spanControl: 15 } },
    },
    required: ['tag'],
  };
  ui: SFUISchema = {
    $discription: {
      widget: 'text',
      defaultText: '通过选择类别开始随机组卷生成的考试。用户若选择模拟考试，系统将根据用户在以下阶段填写的相关需求（如选择考察CSS、HTML知识内容或是JAVA知识内容、考试的时间等），智能地从题库中抽取题目，组编成一份完整而符合用户需求的试卷，自动匹配给用户。并且在考试结束后可以进入最后一个阶段，用户在此阶段可以立刻查看试卷分析。若不想立刻查看也可之后在考试记录中查找。',
      grid: { span: 4 },
    },
    $tag: {
      widget: 'select',
      mode: 'tags',
      grid: { span: 4 },
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
    private msgSrv: NzMessageService,
    public shareService: ShareService,
    public http: _HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.http.get(`/manage/tag?_allow_anonymous=true`).subscribe((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        let tmp = res.data[i].tag;
        this.tag.push({ label: tmp, value: tmp });
      }
      // console.log(this.tag);
    })
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  submit($event) {
    let tagArray = $event.tag;
    this.shareService.setTag(tagArray);

    this.router.navigate(['/client/start-exam'], { queryParams: { '_id': 0 } });
  }

}
