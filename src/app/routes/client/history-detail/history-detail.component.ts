import { Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

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
    private msgSrv: NzMessageService,
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
    // add to collection
    if (!this.collectionNum[num]) {
      let que = JSON.parse(JSON.stringify(this.paper.questions[num]));
      que.username = this.username;
      que.question_id = que._id;
      delete que._id;
      this.http.post(`/manage/question_collection/add?_allow_anonymous=true`, que).subscribe((res: any) => {
        this.msgSrv.success("收藏成功！");
      })
      // delete from collection
    } else {
      this.http.delete(`/manage/question_collection/delete?_allow_anonymous=true&question_id=${this.paper.questions[num]._id}&username=${this.username}`).subscribe((res: any) => {
        this.msgSrv.success("取消收藏成功！");
      })
    }
  }
}
