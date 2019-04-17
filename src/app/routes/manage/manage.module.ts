import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ManageRoutingModule } from './manage-routing.module';
import { ManageQuestionManageComponent } from './question-manage/question-manage.component';
import { ManageQuestionManageEditComponent } from './question-manage/edit/edit.component';
import { ManageQuestionManageViewComponent } from './question-manage/view/view.component';
import { ManageUserManageComponent } from './user-manage/user-manage.component';
import { ManageUserManageEditComponent } from './user-manage/edit/edit.component';
import { ManageUserManageViewComponent } from './user-manage/view/view.component';
import { ManageTagManageComponent } from './tag-manage/tag-manage.component';
import { ManageTagManageEditComponent } from './tag-manage/edit/edit.component';
import { ManageTagManageViewComponent } from './tag-manage/view/view.component';
import { ManagePaperManageComponent } from './paper-manage/paper-manage.component';
import { ManagePaperManageEditComponent } from './paper-manage/edit/edit.component';
import { ManagePaperManageViewComponent } from './paper-manage/view/view.component';
import { ManageOccupationManageComponent } from './occupation-manage/occupation-manage.component';
import { ManageOccupationManageEditComponent } from './occupation-manage/edit/edit.component';
import { ManageOccupationManageViewComponent } from './occupation-manage/view/view.component';

const COMPONENTS = [
  ManageQuestionManageComponent,
  ManageUserManageComponent,
  ManageTagManageComponent,
  ManagePaperManageComponent,
  ManageOccupationManageComponent];
const COMPONENTS_NOROUNT = [
  ManageQuestionManageEditComponent,
  ManageQuestionManageViewComponent,
  ManageUserManageEditComponent,
  ManageUserManageViewComponent,
  ManageTagManageEditComponent,
  ManageTagManageViewComponent,
  ManagePaperManageEditComponent,
  ManagePaperManageViewComponent,
  ManageOccupationManageEditComponent,
  ManageOccupationManageViewComponent];

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
