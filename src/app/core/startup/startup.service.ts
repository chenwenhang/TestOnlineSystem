import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ACLService } from '@delon/acl';

import { NzIconService, NzMessageService } from 'ng-zorro-antd';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private injector: Injector
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaHttp(resolve: any, reject: any) {
    zip(
      this.httpClient.get('assets/tmp/app-data.json')
    ).pipe(
      // 接收其他拦截器后产生的异常消息
      catchError(([appData]) => {
        resolve(null);
        return [appData];
      })
    ).subscribe(([appData]) => {

      // application data
      const res: any = appData;
      // 应用信息：包括站点名、描述、年份
      this.settingService.setApp(res.app);
      // 用户信息：包括姓名、头像、邮箱地址
      this.settingService.setUser(res.user);
      // ACL：设置权限为全量
      this.aclService.setFull(true);
      // 初始化菜单
      this.menuService.add(res.menu);
      // 设置页面标题的后缀
      this.titleService.suffix = res.app.name;
    },
      () => { },
      () => {
        resolve(null);
      });
  }

  private viaMock(resolve: any, reject: any) {
    const tokenData = this.tokenService.get();
    // console.log(tokenData);
    if (!tokenData.token) {
      this.injector.get(Router).navigateByUrl('/passport/login');
      resolve({});
      return;
    }
    // mock
    const app: any = {
      name: `ng-alain`,
      description: `Ng-zorro admin panel front-end framework`
    };
    // const user: any = {
    //   name: 'Admin',
    //   avatar: './assets/tmp/img/avatar.jpg',
    //   email: 'cipchk@qq.com',
    //   power: 1,
    //   token: '123456789'
    // };
    // 应用信息：包括站点名、描述、年份
    tokenData.avatar='./assets/tmp/img/avatar.jpg';

    this.settingService.setApp(app);
    // 用户信息：包括姓名、头像、邮箱地址
    this.settingService.setUser(tokenData);
    // ACL：设置权限为全量
    this.aclService.setFull(true);
    // 初始化菜单
    this.menuService.add([
      {
        text: '客户端',
        group: true,
        children: [
          {
            text: '模拟考试',
            link: '/client/mock-exam',
            icon: { type: 'icon', value: 'file' }
          },
          {
            text: '正式考试',
            link: '/client/formal-exam',
            icon: { type: 'icon', value: 'file-text' }
          },
          {
            text: '考试记录',
            link: '/client/exam-history',
            icon: { type: 'icon', value: 'folder' }
          },
          {
            text: '我的收藏',
            link: '/client/question-collection',
            icon: { type: 'icon', value: 'star' }
          },
          {
            text: '我的信息',
            link: '/client/userinfo',
            icon: { type: 'icon', value: 'info' }
          }
        ]
      },
      {
        text: '内容发布端',
        group: true,
        hide: tokenData.power <= 2 ? false : true,
        children: [
          {
            text: '试题管理',
            link: '/manage/question-manage',
            icon: { type: 'icon', value: 'appstore' }
          },
          {
            text: '考卷管理',
            link: '/manage/paper-manage',
            icon: { type: 'icon', value: 'profile' },
            shortcutRoot: true
          },
          {
            text: '职业管理',
            link: '/manage/occupation-manage',
            icon: { type: 'icon', value: 'rocket' },
            hide: tokenData.power <= 1 ? false : true,
            shortcutRoot: true
          },
          {
            text: '标签管理',
            link: '/manage/tag-manage',
            icon: { type: 'icon', value: 'tags' },
            hide: tokenData.power <= 1 ? false : true,
            shortcutRoot: true
          },
          {
            text: '用户管理',
            link: '/manage/user-manage',
            icon: { type: 'icon', value: 'user' },
            hide: tokenData.power <= 1 ? false : true,
            shortcutRoot: true
          }
        ]
      }
    ]);

    // 设置页面标题的后缀
    this.titleService.suffix = app.name;
    // if(true){
    //   console.log(this.menuService.menus);
    // }

    resolve({});
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      // this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      this.viaMock(resolve, reject);


    });
  }
}
