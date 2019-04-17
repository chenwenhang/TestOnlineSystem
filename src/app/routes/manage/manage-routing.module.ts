import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageQuestionManageComponent } from './question-manage/question-manage.component';
import { ManageUserManageComponent } from './user-manage/user-manage.component';
import { ManageTagManageComponent } from './tag-manage/tag-manage.component';
import { ManagePaperManageComponent } from './paper-manage/paper-manage.component';
import { ManageOccupationManageComponent } from './occupation-manage/occupation-manage.component';

const routes: Routes = [

  { path: 'question-manage', component: ManageQuestionManageComponent },
  { path: 'user-manage', component: ManageUserManageComponent },
  { path: 'tag-manage', component: ManageTagManageComponent },
  { path: 'paper-manage', component: ManagePaperManageComponent },
  { path: 'occupation-manage', component: ManageOccupationManageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
