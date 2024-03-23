import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ListTaskComponent } from './list-task/list-task.component';
import { CoreModule } from '../../CORE/core.module';
import { SharingService } from '../../CORE/services/sharing.service';
import { Observable } from 'rxjs';
import { ITask } from '../../CORE/models/task.interface';
@Component({
  selector: 'manage-task',
  standalone: true,
  imports: [
    CommonModule,NavbarComponent,AddTaskComponent,ListTaskComponent,CoreModule
  ],
  templateUrl: './manage-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class ManageTaskComponent {
  data$ : Observable<ITask>;
  
  constructor(private sharingService:SharingService) {
    this.data$ = sharingService.sharingObservable;
  }
 }
