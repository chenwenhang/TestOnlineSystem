import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ManageUserManageViewComponent } from './view/view.component';
import { ManageUserManageEditComponent } from './edit/edit.component';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-manage-user-manage',
  templateUrl: './user-manage.component.html',
})
export class ManageUserManageComponent implements OnInit {
  url = `/manage/user?_allow_anonymous=true`;
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
      username: {
        type: 'string',
        title: '帐号'
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '帐号', index: 'username' },
    { title: '昵称', index: 'nickname' },
    { title: '职业', index: 'occupation' },
    { title: '邮箱', index: 'email' },
    {
      title: '权限',
      index: 'power',
      format: (item, col) => { 
        return item.power==1?"管理员":(item.power==2?"发布者":"普通用户");
      }
    },
    {
      title: '',
      buttons: [
        {
          text: '查看',
          icon: 'zoom-in',
          click: (item: any) => {
            this.modal
              .createStatic(ManageUserManageViewComponent, { i: item })
              .subscribe(() => this.st.reload());
          }
        },
        {
          text: '编辑',
          icon: 'edit',
          click: (item: any) => {
            this.modal
              .createStatic(ManageUserManageEditComponent, { i: item })
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
      .createStatic(ManageUserManageEditComponent, { i: { _id: 0 } })
      .subscribe(() => this.st.reload());
  }

  delete(item: any) {
    this.http.delete(`/manage/user/delete?_allow_anonymous=true`, item).subscribe((res: any) => {
      if (!res.code) {
        this.msgSrv.error(res.msg);
        return;
      }
      this.msgSrv.success(res.msg);
      this.st.reload();
    })
  }
}
