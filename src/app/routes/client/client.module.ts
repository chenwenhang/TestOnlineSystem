import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ClientRoutingModule } from './client-routing.module';
import { ClientMockExamComponent } from './mock-exam/mock-exam.component';
import { ClientFormalExamComponent } from './formal-exam/formal-exam.component';
import { ClientFormalExamViewComponent } from './formal-exam/view/view.component';
import { ClientExamHistoryComponent } from './exam-history/exam-history.component';
import { ClientQuestionCollectionComponent } from './question-collection/question-collection.component';
import { ClientQuestionCollectionEditComponent } from './question-collection/edit/edit.component';
import { ClientQuestionCollectionViewComponent } from './question-collection/view/view.component';
import { ClientUserinfoComponent } from './userinfo/userinfo.component';
import { ClientStartExamComponent } from './start-exam/start-exam.component';
import { ClientStartExamViewComponent } from './start-exam/view/view.component';
import { ClientHistoryDetailComponent } from './history-detail/history-detail.component';
import { ClientHistoryDetailEditComponent } from './history-detail/edit/edit.component';
import { ClientHistoryDetailViewComponent } from './history-detail/view/view.component';

const COMPONENTS = [
  ClientMockExamComponent,
  ClientFormalExamComponent,
  ClientExamHistoryComponent,
  ClientQuestionCollectionComponent,
  ClientUserinfoComponent,
  ClientStartExamComponent,
  ClientHistoryDetailComponent];
const COMPONENTS_NOROUNT = [
  ClientFormalExamViewComponent,
  ClientQuestionCollectionEditComponent,
  ClientQuestionCollectionViewComponent,
  ClientStartExamViewComponent,
  ClientHistoryDetailEditComponent,
  ClientHistoryDetailViewComponent];

@NgModule({
  imports: [
    SharedModule,
    ClientRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ClientModule { }
