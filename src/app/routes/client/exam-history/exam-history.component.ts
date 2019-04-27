import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent,XlsxService } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-exam-history',
  templateUrl: './exam-history.component.html',
})
export class ClientExamHistoryComponent implements OnInit {
  username = JSON.parse(localStorage.getItem('user')).username;
  url = `/manage/paper_history?_allow_anonymous=true&username=${this.username}`;
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
    { title: '适用职业', index: 'occupation', default: "模拟考试" },
    { title: '得分', index: 'my_mark' },
    { title: '总分', index: 'total_mark' },
    {
      title: '',
      buttons: [
        {
          text: '查看解析',
          icon: 'zoom-in',
          click: (item: any) => {
            this.router.navigate(['/client/history-detail'], { queryParams: { '_id': item._id } });

          }
        },
      ]
    }
  ];

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private router: Router,
    private xlsx: XlsxService,
  ) { }

  ngOnInit() { }
}
