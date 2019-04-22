import { ManagePaperManageEditComponent } from './edit/edit.component';
import { ManagePaperManageViewComponent } from './view/view.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-manage-paper-manage',
  templateUrl: './paper-manage.component.html',
})
export class ManagePaperManageComponent implements OnInit {
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
    { title: '是否有效', index: 'is_valid', render: 'custom1',  },
    { title: '是否公开', index: 'is_public', render: 'custom2',  },
    {
      title: '',
      buttons: [
        {
          text: '查看',
          icon: 'zoom-in',
          click: (item: any) => {
            this.modal
              .createStatic(ManagePaperManageViewComponent, { i: item })
              .subscribe(() => this.st.reload());
          }
        },
        {
          text: '编辑',
          icon: 'edit',
          click: (item: any) => {
            this.modal
              .createStatic(ManagePaperManageEditComponent, { i: item })
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
    this.modal
      .createStatic(ManagePaperManageEditComponent, { i: { _id: 0 } })
      .subscribe(() => this.st.reload());
  }

  delete(item: any) {
    this.http.delete(`/manage/paper/delete?_allow_anonymous=true`, item).subscribe((res: any) => {
      if (!res.code) {
        this.msgSrv.error(res.msg);
        return;
      }
      this.msgSrv.success(res.msg);
      this.st.reload();
    })
  }

}
