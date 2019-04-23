import { ClientFormalExamViewComponent } from './view/view.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';
import { ClientStartExamComponent } from '../start-exam/start-exam.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-formal-exam',
  templateUrl: './formal-exam.component.html',
})
export class ClientFormalExamComponent implements OnInit {
  url = `/manage/paper?_allow_anonymous=true`;
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
      title: {
        type: 'string',
        title: '标题'
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '标题', index: 'title', width: '25%' },
    { title: '作者', index: 'create_user' },
    { title: '适用职业', index: 'occupation' },
    { title: '创建时间', index: 'create_time' },
    {
      title: '',
      buttons: [
        {
          text: '查看',
          icon: 'zoom-in',
          click: (item: any) => {
            this.modal
              .createStatic(ClientFormalExamViewComponent, { i: item })
              .subscribe(() => this.st.reload());
          }
        },
        {
          text: '开始考试',
          icon: 'edit',
          click: (item: any) => {
            this.router.navigate(
              ['/client/start-exam'],
              {
                queryParams: { '_id': item._id }
              }
            );
          }
        },
      ]
    }
  ];

  constructor(
    private router: Router,
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
  ) { }

  ngOnInit() { }



}
