import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientMockExamComponent } from './mock-exam/mock-exam.component';
import { ClientFormalExamComponent } from './formal-exam/formal-exam.component';
import { ClientUserinfoComponent } from './userinfo/userinfo.component';
import { ClientExamHistoryComponent } from './exam-history/exam-history.component';
import { ClientQuestionCollectionComponent } from './question-collection/question-collection.component';

const routes: Routes = [

  { path: 'mock-exam', component: ClientMockExamComponent },
  { path: 'formal-exam', component: ClientFormalExamComponent },
  { path: 'userinfo', component: ClientUserinfoComponent },
  { path: 'exam-history', component: ClientExamHistoryComponent },
  { path: 'question-collection', component: ClientQuestionCollectionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
