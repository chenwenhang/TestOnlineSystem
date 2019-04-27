import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { of } from 'rxjs';

@Component({
  selector: 'app-manage-occupation-manage-edit',
  templateUrl: './edit.component.html',
})
export class ManageOccupationManageEditComponent implements OnInit {
  record: any = {};
  i: any;
  tag = [];
  schema: SFSchema = {
    properties: {
      occupation: { type: 'string', title: '职业' },
      tag: { type: 'string', title: '标签' },
    },
    required: ['occupation', 'tag'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $occupation: {
      widget: 'string',
      grid: { span: 24 },
    },
    $tag: {
      widget: 'select',
      mode: 'tags',
      grid: { span: 24 },
      asyncData: () => of([
        {
          label: '选择标签',
          group: true,
          children: this.tag
        }]),
      default: null,
      maxMultipleCount:3
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.get(`/manage/tag?_allow_anonymous=true`).subscribe((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        let tmp = res.data[i].tag;
        this.tag.push({ label: tmp, value: tmp });
      }
    })
  }

  save(value: any) {
    if (value._id) {
      this.http.put(`/manage/occupation/edit?_allow_anonymous=true`, value).subscribe((res: any) => {
        if (!res.code) {
          this.msgSrv.error(res.msg);
          return;
        }
        this.msgSrv.success(res.msg);
        this.modal.close(true);
      });
    } else {
      delete value._id;
      this.http.post(`/manage/occupation/add?_allow_anonymous=true`, value).subscribe((res: any) => {
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
