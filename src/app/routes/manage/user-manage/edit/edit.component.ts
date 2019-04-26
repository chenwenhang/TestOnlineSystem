import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema, SFComponent } from '@delon/form';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-manage-user-manage-edit',
  templateUrl: './edit.component.html',
})
export class ManageUserManageEditComponent implements OnInit {
  record: any = {};
  i: any;
  occupation = [];
  @ViewChild('sf') sf: SFComponent;
  schema: SFSchema = {
    properties: {
      username: { type: 'string', title: '帐号', minLength: 6, maxLength: 15, readOnly: false },
      nickname: { type: 'string', title: '昵称' },
      occupation: { type: 'string', title: '职业', enum: [] },
      email: { type: 'string', title: '邮箱', format: 'email' },
      power: {
        type: 'string',
        title: '权限',
        enum: [
          { label: '管理员', value: '1' },
          { label: '发布者', value: '2' },
          { label: '普通用户', value: '3' }
        ],
        default: '3'
      },
    },
    required: ['username', 'nickname', 'occupation', 'email', 'power'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $username: {
      widget: 'string',
      grid: { span: 24 },
    },
    $nickname: {
      widget: 'string',
      grid: { span: 24 },
    },
    $occupation: {
      widget: 'select',
      grid: { span: 24 },
      // asyncData: () => of([
      //   {
      //     label: '选择职业',
      //     group: true,
      //     children: this.occupation
      //   }]).pipe(delay(1200))
    },
    $email: {
      widget: 'string',
      grid: { span: 24 },
    },
    $power: {
      widget: 'select',
      grid: { span: 24 },
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.get(`/manage/occupation?_allow_anonymous=true`).subscribe((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        let tmp = res.data[i].occupation;
        this.occupation.push({ label: tmp, value: tmp });
      }
      this.schema.properties.occupation.enum = this.occupation;
      this.schema.properties.username.readOnly = this.i._id == 0 ? false : true;
      this.sf.refreshSchema();
      // console.log(this.occupation);
    })
  }

  save(value: any) {
    if (value._id) {
      this.http.put(`/manage/user/edit?_allow_anonymous=true`, value).subscribe((res: any) => {
        if (!res.code) {
          this.msgSrv.error(res.msg);
          return;
        }
        this.msgSrv.success(res.msg);
        this.modal.close(true);
      });
    } else {
      delete value._id;
      this.http.post(`/manage/user/add?_allow_anonymous=true`, value).subscribe((res: any) => {
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
