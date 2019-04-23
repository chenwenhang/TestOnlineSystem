import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  paper: any;
  tag: any;

  setPaper(paper: any) {
    this.paper = paper;
  }

  getPaper() {
    return this.paper;
  }

  setTag(tag: any) {
    this.tag = tag;
  }

  getTag() {
    return this.tag;
  }

  constructor() { }

}