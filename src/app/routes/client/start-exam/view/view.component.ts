import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-start-exam-view',
  templateUrl: './view.component.html',
})
export class ClientStartExamViewComponent implements OnInit {
  record: any = {};
  i: any;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  viewHistory(value: any) {
    // console.log(value);
    
    this.router.navigate(['/client/history-detail'], { queryParams: { '_id': value._id } });

  }

  home() {
    this.router.navigate(['/dashboard']);
  }

  close() {

  }

}
