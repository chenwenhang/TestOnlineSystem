import { ManageQuestionManageViewComponent } from './view/view.component';
import { ManageQuestionManageEditComponent } from './edit/edit.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, XlsxService } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';
var dateFormat = require('dateformat');

@Component({
  selector: 'app-manage-question-manage',
  templateUrl: './question-manage.component.html',
  styleUrls: ['./question-manage.component.less'],
})
export class ManageQuestionManageComponent implements OnInit {
  url = `/manage/question?_allow_anonymous=true`;
  req = {
    reName: {
      pi: 'page',
      ps: 'size'
    }
  }
  res = {
    reName: {
      total: 'count',
      list: 'data'
    }
  };
  searchSchema: SFSchema = {
    properties: {
      content: {
        type: 'string',
        title: '题干'
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '题干', index: 'content', width: '40%' },
    { title: '类型', index: 'type' },
    { title: '标签', index: 'tag', render: 'custom', },
    { title: '创建时间', index: 'create_time' },
    {
      title: '',
      buttons: [
        {
          text: '查看',
          icon: 'zoom-in',
          click: (item: any) => {
            this.modal
              .createStatic(ManageQuestionManageViewComponent, { i: item })
              .subscribe(() => this.st.reload());
          }
        },
        {
          text: '编辑',
          icon: 'edit',
          click: (item: any) => {
            this.modal
              .createStatic(ManageQuestionManageEditComponent, { i: item })
              .subscribe(() => this.st.reload());
          }
        },
        {
          text: '删除',
          icon: 'delete',
          click: (item: any) => {
            this.delete(item)
          }
        },
      ]
    }
  ];

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private xlsx: XlsxService,
  ) { }

  ngOnInit() { }

  add() {
    this.modal
      .createStatic(ManageQuestionManageEditComponent, { i: { _id: 0 } })
      .subscribe(() => this.st.reload());
  }

  delete(item: any) {
    this.http.delete(`/manage/question/delete?_allow_anonymous=true`, item).subscribe((res: any) => {
      if (!res.code) {
        this.msgSrv.error(res.msg);
        return;
      }
      this.msgSrv.success(res.msg);
      this.st.reload();
    })
  }

  change(e: Event) {
    const node = e.target as HTMLInputElement;
    let data: any;
    let questions = [];
    this.xlsx.import(node.files![0]).then(res => {
      data = res.Sheet1;
      for (let i = 0; i < data.length; i++) {
        let que = data[i];
        let tmp = {
          type: que[0],
          content: que[1],
          analysis: que[2].split(','),
          right: que[3],
          explanation: que[4],
          tag: que[5].split(','),
          create_time: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')
        }
        questions.push(tmp);
      }
      this.http.post(`/manage/question/addMultiple?_allow_anonymous=true`, questions).subscribe((res: any) => {
        if (!res.code) {
          this.msgSrv.error(res.msg);
          return;
        }
        this.msgSrv.success(res.msg);
      });

    });
    // node.value = '';


  }
}
