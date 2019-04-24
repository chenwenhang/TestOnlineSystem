import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-manage-paper-manage-view',
  templateUrl: './view.component.html',
})
export class ManagePaperManageViewComponent implements OnInit {
  record: any = {};
  i: any;
  option = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];


  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient
  ) { }

  ngOnInit(): void {
    
  }

  close() {
    this.modal.destroy();
  }
}
