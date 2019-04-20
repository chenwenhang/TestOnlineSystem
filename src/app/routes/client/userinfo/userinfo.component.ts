import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-client-userinfo',
  templateUrl: './userinfo.component.html',
})
export class ClientUserinfoComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  occupation = [];
  constructor(
    public http: _HttpClient,
    public msg: NzMessageService,
  ) {

  }


  ngOnInit() {
    // delete this.user.occupation;
    this.http.get('/manage/occupation?_allow_anonymous=true').subscribe((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        let tmp = res.data[i].occupation;
        this.occupation.push(tmp);
      }
    });


  }

  saveInfomation() {
    // console.log(this.user);
    this.http.put('/manage/user/edit?_allow_anonymous=true', this.user).subscribe((res: any) => {
      if (!res.code) {
        this.msg.success(res.msg);
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
