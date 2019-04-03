import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ManageRoutingModule } from './manage-routing.module';
import { ManageQuestionManageComponent } from './question-manage/question-manage.component';
import { ManageQuestionManageEditComponent } from './question-manage/edit/edit.component';
import { ManageQuestionManageViewComponent } from './question-manage/view/view.component';
import { ManageExamManageComponent } from './exam-manage/exam-manage.component';
import { ManageExamManageEditComponent } from './exam-manage/edit/edit.component';
import { ManageExamManageViewComponent } from './exam-manage/view/view.component';
import { ManageJobManageComponent } from './job-manage/job-manage.component';
import { ManageJobManageEditComponent } from './job-manage/edit/edit.component';
import { ManageJobManageViewComponent } from './job-manage/view/view.component';
import { ManageUserManageComponent } from './user-manage/user-manage.component';
import { ManageUserManageEditComponent } from './user-manage/edit/edit.component';
import { ManageUserManageViewComponent } from './user-manage/view/view.component';

const COMPONENTS = [
  ManageQuestionManageComponent,
  ManageExamManageComponent,
  ManageJobManageComponent,
  ManageUserManageComponent];
const COMPONENTS_NOROUNT = [
  ManageQuestionManageEditComponent,
  ManageQuestionManageViewComponent,
  ManageExamManageEditComponent,
  ManageExamManageViewComponent,
  ManageJobManageEditComponent,
  ManageJobManageViewComponent,
  ManageUserManageEditComponent,
  ManageUserManageViewComponent];

@NgModule({
  imports: [
    SharedModule,
    ManageRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ManageModule { }
