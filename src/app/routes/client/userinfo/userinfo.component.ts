import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-client-userinfo',
  templateUrl: './userinfo.component.html',
})
export class ClientUserinfoComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
