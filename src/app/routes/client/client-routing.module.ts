import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientMockExamComponent } from './mock-exam/mock-exam.component';
import { ClientFormalExamComponent } from './formal-exam/formal-exam.component';
import { ClientExamHistoryComponent } from './exam-history/exam-history.component';
import { ClientQuestionCollectionComponent } from './question-collection/question-collection.component';
import { ClientUserinfoComponent } from './userinfo/userinfo.component';

const routes: Routes = [

  { path: 'mock-exam', component: ClientMockExamComponent },
  { path: 'formal-exam', component: ClientFormalExamComponent },
  { path: 'exam-history', component: ClientExamHistoryComponent },
  { path: 'question-collection', component: ClientQuestionCollectionComponent },
  { path: 'userinfo', component: ClientUserinfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
