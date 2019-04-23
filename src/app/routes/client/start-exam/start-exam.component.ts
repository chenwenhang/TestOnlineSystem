import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-start-exam',
  templateUrl: './start-exam.component.html',
})
export class ClientStartExamComponent implements OnInit {
  url = `/user`;
  _id: any;
  paper: any;
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
    { title: '编号', index: 'no' },
    { title: '调用次数', type: 'number', index: 'callNo' },
    { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    { title: '时间', type: 'date', index: 'updatedAt' },
    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private http: _HttpClient,
    private modal: ModalHelper
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      let _id = data._id;
      this.http.get(`/manage/paper/detail?_allow_anonymous=true&_id=${_id}`).subscribe((res: any) => {
        this.paper = res.data[0];
        console.log(this.paper);


      })
    })
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());

  }

}
