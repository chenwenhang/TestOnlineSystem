import { StartupService } from '@core';
import { Component, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-client-userinfo',
  templateUrl: './userinfo.component.html',
})
export class ClientUserinfoComponent implements OnInit {
  loading = false;
  avatarUrl: string;

  user = JSON.parse(localStorage.getItem('user'));
  occupation = [];

  constructor(
    public http: _HttpClient,
    public msg: NzMessageService,
    public startupService: StartupService
  ) {

  }


  ngOnInit() {
    this.http.get(`/manage/occupation?_allow_anonymous=true`).subscribe((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        let tmp = res.data[i].occupation;
        this.occupation.push(tmp);
      }
    })
  }

  save() {
    // 深复制的坑，记录！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    let tmp = JSON.parse(JSON.stringify(this.user));
    delete tmp.avatar;
    this.http.put('/manage/user/edit?_allow_anonymous=true', tmp).subscribe((res: any) => {
      if (!res.code) {
        this.msg.error(res.msg);
        return;
      }
      this.msg.success(res.msg);
      this.startupService.setUser(this.user);
    });
  }

  forget() {

  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      if (!isJPG && !isPNG) {
        this.msg.error('只能上传PNG或JPG格式图片！');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('图片必须小于2MB！');
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.msg.error('图片必须大于300x300！');
          observer.complete();
          return;
        }

        observer.next((isJPG || isPNG) && isLt2M && dimensionRes);
        observer.complete();
      });
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width === height && width >= 300);
      };
    });
  }

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
          this.user.avatar = img;
          this.startupService.setUser(this.user);
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }
}
