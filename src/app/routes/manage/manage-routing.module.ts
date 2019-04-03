import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageQuestionManageComponent } from './question-manage/question-manage.component';
import { ManageExamManageComponent } from './exam-manage/exam-manage.component';
import { ManageJobManageComponent } from './job-manage/job-manage.component';
import { ManageUserManageComponent } from './user-manage/user-manage.component';

const routes: Routes = [

  { path: 'question-manage', component: ManageQuestionManageComponent },
  { path: 'exam-manage', component: ManageExamManageComponent },
  { path: 'job-manage', component: ManageJobManageComponent },
  { path: 'user-manage', component: ManageUserManageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
