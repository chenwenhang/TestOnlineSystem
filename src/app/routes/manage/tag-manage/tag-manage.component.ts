import { ManageTagManageViewComponent } from './view/view.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ManageTagManageEditComponent } from './edit/edit.component';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-manage-tag-manage',
  templateUrl: './tag-manage.component.html',
})
export class ManageTagManageComponent implements OnInit {
  url = `/manage/tag?_allow_anonymous=true`;
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
      tag: {
        type: 'string',
        title: '标签名'
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    // { title: '编号', index: '_id' },
    { title: '标签名', index: 'tag' },
    {
      title: '',
      buttons: [
        {
          text: '查看',
          icon: 'zoom-in',
          click: (item: any) => {
            this.modal
              .createStatic(ManageTagManageViewComponent, { i: item })
              .subscribe(() => this.st.reload());
          }
        },
        {
          text: '编辑',
          icon: 'edit',
          click: (item: any) => {
            this.modal
              .createStatic(ManageTagManageEditComponent, { i: item })
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
      .createStatic(ManageTagManageEditComponent, { i: { _id: 0 } })
      .subscribe(() => this.st.reload());
  }

  delete(item: any) {
    this.http.delete(`/manage/tag/delete?_allow_anonymous=true`, item).subscribe((res: any) => {
      if (!res.code) {
        this.msgSrv.error(res.msg);
        return;
      }
      this.msgSrv.success(res.msg);
      this.st.reload();
    })
  }

}
