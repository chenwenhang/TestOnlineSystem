import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ClientRoutingModule } from './client-routing.module';
import { ClientMockExamComponent } from './mock-exam/mock-exam.component';
import { ClientMockExamEditComponent } from './mock-exam/edit/edit.component';
import { ClientMockExamViewComponent } from './mock-exam/view/view.component';
import { ClientFormalExamComponent } from './formal-exam/formal-exam.component';
import { ClientFormalExamViewComponent } from './formal-exam/view/view.component';
import { ClientExamHistoryComponent } from './exam-history/exam-history.component';
import { ClientQuestionCollectionComponent } from './question-collection/question-collection.component';
import { ClientQuestionCollectionEditComponent } from './question-collection/edit/edit.component';
import { ClientQuestionCollectionViewComponent } from './question-collection/view/view.component';
import { ClientUserinfoComponent } from './userinfo/userinfo.component';
import { ClientStartExamComponent } from './start-exam/start-exam.component';
import { ClientStartExamEditComponent } from './start-exam/edit/edit.component';
import { ClientStartExamViewComponent } from './start-exam/view/view.component';

const COMPONENTS = [
  ClientMockExamComponent,
  ClientFormalExamComponent,
  ClientExamHistoryComponent,
  ClientQuestionCollectionComponent,
  ClientUserinfoComponent,
  ClientStartExamComponent];
const COMPONENTS_NOROUNT = [
  ClientMockExamEditComponent,
  ClientMockExamViewComponent,
  ClientFormalExamViewComponent,
  ClientQuestionCollectionEditComponent,
  ClientQuestionCollectionViewComponent,
  ClientStartExamEditComponent,
  ClientStartExamViewComponent];

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
