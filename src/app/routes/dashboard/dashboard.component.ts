import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
  tags: any;

  constructor(
    private http: _HttpClient
  ) { }

  ngOnInit() {
    this.http.get(`/manage/tag?_allow_anonymous=true`).subscribe((res: any) => {
      let tmpTags = [];
      let tmp = res.data;
      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i].tag == "驾照考试" || tmp[i].tag == "常识" || tmp[i].tag == "计算机组成原理") {
          continue;
        }
        tmpTags.push({
          'x': tmp[i].tag,
          'value': Math.floor(Math.random()*99899999 +10000001),
          'category': tmp[i].tag
        });
        if(tmp[i].tag == "Angular"){
          tmpTags.push({
            'x': 'Angular',
            'value': 1383220000,
            'category': 'Angular'
          });
        }
      }
      this.tags = tmpTags;
    });
  }

}
