import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-history-detail',
  templateUrl: './history-detail.component.html',
})
export class ClientHistoryDetailComponent implements OnInit {
  option = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
  paper: any;

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      let _id = data._id;
      this.http.get(`/manage/paper_history/detail?_allow_anonymous=true&_id=${_id}`).subscribe((res: any) => {
        this.paper = res.data[0];
        console.log(this.paper);
        
      });
    });
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}
