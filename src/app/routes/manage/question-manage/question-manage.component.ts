import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STColumnTag } from '@delon/abc';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-manage-question-manage',
  templateUrl: './question-manage.component.html',
})
export class ManageQuestionManageComponent implements OnInit {
  url = `/user`;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号'
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '编号', width: '50px', index: 'no' },
    { title: '题型', index: 'type' },
    { title: '题干',   index: 'body' },
    { title: '创建者', index: 'author' },
    { title: '创建时间', type: 'date', index: 'time' },
    { title: '标签', render: 'custom', index: 'tag' },
    {
      title: '',
      buttons: [
        { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}
