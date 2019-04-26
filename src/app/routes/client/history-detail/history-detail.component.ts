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
  username = JSON.parse(localStorage.getItem('user')).username;
  paper: any;
  collectionNum: any;
  collectionId = [];

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
        this.collectionNum = [];
        for (let i = 0; i < this.paper.questions.length; i++) {
          // this.collectionNum.push("0");
          this.collectionId.push(this.paper.questions[i]._id);
        }
        let tmp = {
          collectionId: this.collectionId,
          username: this.username
        }
        this.http.post(`/manage/question_collection/check?_allow_anonymous=true`, tmp).subscribe((res: any) => {
          // console.log(res);
          this.collectionNum = res.data;

        })

      });
    });
  }

  // before change 
  change(num: any) {
    // console.log(this.paper);
    // console.log(this.collectionNum[num]);

    // add to collection
    if (!this.collectionNum[num]) {
      let que = JSON.parse(JSON.stringify(this.paper.questions[num]));
      que.username = this.username;
      que.question_id = que._id;
      delete que._id;

      this.http.post(`/manage/question_collection/add?_allow_anonymous=true`, que).subscribe((res: any) => {
        // console.log(res);
        console.log(res);


      })
      // delete from collection
    } else {
      this.http.delete(`/manage/question_collection/delete?_allow_anonymous=true&question_id=${this.paper.questions[num]._id}&username=${this.username}`).subscribe((res: any) => {
        // console.log(res);
        console.log(res);


      })
    }


    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }


}
