import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'passport-register-result',
  templateUrl: './register-result.component.html',
})
export class UserRegisterResultComponent {
  params = { username: '' };
  username = '';
  constructor(
    route: ActivatedRoute,
    public msg: NzMessageService,
  ) {
    route.queryParams.subscribe((params: Params) => {
      console.log(route.snapshot.queryParams);

      console.log(params);

      this.params.username = this.username = params['username'];
    });
    // this.params.username = this.username = route.snapshot.queryParams.username || 'ng-alain@example.com';
  }
}
