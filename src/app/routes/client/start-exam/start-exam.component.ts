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
  paper: any;

  constructor(
    private route: ActivatedRoute,
    private http: _HttpClient,
    private modal: ModalHelper,
    public shareService: ShareService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      // url can only pass string
      let mock = data.mock;
      if (mock=="0") {
        console.log("not mock");

      } else {
        console.log("mock");

      }
      this.paper = this.shareService.getPaper();
    })

  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());

  }

}
