import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ClientQuestionCollectionViewComponent } from './view/view.component';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-client-question-collection',
  templateUrl: './question-collection.component.html',
})
export class ClientQuestionCollectionComponent implements OnInit {
  username = JSON.parse(localStorage.getItem('user')).username;
  url = `/manage/question_collection?_allow_anonymous=true&username=${this.username}`;
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
              .createStatic(ClientQuestionCollectionViewComponent, { i: item })
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
  ) { }

  ngOnInit() { }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  delete(item: any) {
    this.http.delete(`/manage/question_collection/delete?_allow_anonymous=true`, item).subscribe((res: any) => {
      if (!res.code) {
        this.msgSrv.error(res.msg);
        return;
      }
      this.msgSrv.success(res.msg);
      this.st.reload();
    })
  }

}
