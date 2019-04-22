import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { SFSchema, SFUISchema, SFButton, SFComponent } from '@delon/form';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-client-userinfo',
  templateUrl: './userinfo.component.html',
})
export class ClientUserinfoComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  occupation = [];
  @ViewChild('sf') sf: SFComponent;
  schema: SFSchema = {
    properties: {
      avatar: {
        type: 'string',
        title: '头像',
        ui: {
          widget: 'upload',
          action: '/login/upload?_allow_anonymous=true',
          resReName: 'resource_id',
          urlReName: 'url',
          name: this.user._id
        },
      },
      username: { type: 'string', title: '帐号', minLength: 6, maxLength: 15, readOnly: true },
      nickname: { type: 'string', title: '昵称' },
      occupation: { type: 'string', title: '职业', enum: [] },
      email: { type: 'string', title: '邮箱', format: 'email' },
    },
    required: ['username', 'nickname', 'occupation', 'email'],
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
    },
    $email: {
      widget: 'string',
      grid: { span: 24 },
    },
  };
  constructor(
    public http: _HttpClient,
    public msg: NzMessageService,
  ) {

  }


  ngOnInit() {
    // delete this.user.occupation;
    this.http.get(`/manage/occupation?_allow_anonymous=true`).subscribe((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        let tmp = res.data[i].occupation;
        this.occupation.push({ label: tmp, value: tmp });
      }
      this.schema.properties.occupation.enum = this.occupation;
      this.sf.refreshSchema();
    })
    this.http.get(`/manage/user/detail?_allow_anonymous=true&_id=${this.user._id}`).subscribe((res: any) => {
      this.user = res.data;
    })
  }

  save(value: any) {
    // console.log(value);
    this.http.put('/manage/user/edit?_allow_anonymous=true', value).subscribe((res: any) => {
      if (!res.code) {
        this.msg.error(res.msg);
        return;
      }
      this.msg.success(res.msg);

    });
  }

  forget() {

  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}
