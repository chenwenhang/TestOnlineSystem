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

  viewHistory() {
    this.router.navigate(['/client/history-detail'], { queryParams: { 'mock': 0 } });

  }

  home() {
    this.router.navigate(['/dashboard']);
  }

}
