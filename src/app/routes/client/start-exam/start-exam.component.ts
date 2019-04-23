import { ShareService } from '@core/startup/share.service';
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
  tag: any;
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
    private modal: ModalHelper,
    public shareService: ShareService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      let _id = data._id;

      if (_id == 0) {
        // mock-exam
        this.tag = this.shareService.getTag();


      } else {
        // formal-exam
        this.paper = this.shareService.getPaper();


      }
    })

  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());

  }

}
