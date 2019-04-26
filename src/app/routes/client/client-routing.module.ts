import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientMockExamComponent } from './mock-exam/mock-exam.component';
import { ClientFormalExamComponent } from './formal-exam/formal-exam.component';
import { ClientExamHistoryComponent } from './exam-history/exam-history.component';
import { ClientQuestionCollectionComponent } from './question-collection/question-collection.component';
import { ClientUserinfoComponent } from './userinfo/userinfo.component';
import { ClientStartExamComponent } from './start-exam/start-exam.component';
import { ClientHistoryDetailComponent } from './history-detail/history-detail.component';
import { ClientDataAnalysisComponent } from './data-analysis/data-analysis.component';

const routes: Routes = [

  { path: 'mock-exam', component: ClientMockExamComponent },
  { path: 'formal-exam', component: ClientFormalExamComponent },
  { path: 'exam-history', component: ClientExamHistoryComponent },
  { path: 'question-collection', component: ClientQuestionCollectionComponent },
  { path: 'userinfo', component: ClientUserinfoComponent },
  { path: 'start-exam', component: ClientStartExamComponent },
  { path: 'history-detail', component: ClientHistoryDetailComponent },
  { path: 'data-analysis', component: ClientDataAnalysisComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
