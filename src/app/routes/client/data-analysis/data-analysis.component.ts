import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-client-data-analysis',
  templateUrl: './data-analysis.component.html',
})
export class ClientDataAnalysisComponent implements OnInit {
  username = JSON.parse(localStorage.getItem('user')).username;
  paper: any;
  total: any;
  rate: any;
  collect: any;
  salesData: any;

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() {
    this.http.get(`/manage/data_analysis?_allow_anonymous=true&username=${this.username}`).subscribe((res: any) => {
      this.salesData = [];
      this.paper = res.data[0];
      this.total = res.data[1];
      this.rate = (res.data[2] * 100).toFixed(2) + " %";
      for (var index in res.data[3]) {
        this.salesData.push({
          x: index,
          y: res.data[3][index]
        })
      }
      this.collect = res.data[4];
      // console.log(this.salesData);

    });

  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}
