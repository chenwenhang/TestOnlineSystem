import { ManageOccupationManageEditComponent } from './edit/edit.component';
import { ManageOccupationManageViewComponent } from './view/view.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-manage-occupation-manage',
  templateUrl: './occupation-manage.component.html',
})
export class ManageOccupationManageComponent implements OnInit {
  url = `/manage/occupation?_allow_anonymous=true`;
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
      occupation: {
        type: 'string',
        title: '职业名'
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '职业名', index: 'occupation' },
    { title: '标签', index: 'tag', render: 'custom', },
    {
      title: '',
      buttons: [
        {
          text: '查看',
          icon: 'zoom-in',
          click: (item: any) => {
            this.modal
              .createStatic(ManageOccupationManageViewComponent, { i: item })
              .subscribe(() => this.st.reload());
          }
        },
        {
          text: '编辑',
          icon: 'edit',
          click: (item: any) => {
            this.modal
              .createStatic(ManageOccupationManageEditComponent, { i: item })
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
      .createStatic(ManageOccupationManageEditComponent, { i: { _id: 0 } })
      .subscribe(() => this.st.reload());
  }

  delete(item: any) {
    this.http.delete(`/manage/occupation/delete?_allow_anonymous=true`, item).subscribe((res: any) => {
      if (!res.code) {
        this.msgSrv.error(res.msg);
        return;
      }
      this.msgSrv.success(res.msg);
      this.st.reload();
    })
  }

}
