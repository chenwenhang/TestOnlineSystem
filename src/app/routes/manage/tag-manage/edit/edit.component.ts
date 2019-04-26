import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-manage-tag-manage-edit',
  templateUrl: './edit.component.html',
})
export class ManageTagManageEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      tag: { type: 'string', title: '标签名', maxLength: 50 },
    },
    required: ['tag'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $tag: {
      widget: 'string',
      grid: { span: 24 },
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) { }

  ngOnInit(): void {
    
  }

  save(value: any) {
    if (value._id) {
      this.http.put(`/manage/tag/edit?_allow_anonymous=true`, value).subscribe((res: any) => {
        if (!res.code) {
          this.msgSrv.error(res.msg);
          return;
        }
        this.msgSrv.success(res.msg);
        this.modal.close(true);
      });
    }else{
      delete value._id;
      this.http.post(`/manage/tag/add?_allow_anonymous=true`, value).subscribe((res: any) => {
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
