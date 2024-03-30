import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharingService } from '../../../CORE/services/sharing.service';
import { ITask } from '../../../CORE/models/task.interface';
import { LocalStorageService } from '../../../CORE/services/localStorage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskComponent implements OnInit{
  public checkoutForm: any;
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  tasks: ITask[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private sharingService: SharingService,
    private localtStorageService:LocalStorageService
  ) {
    this.checkoutForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: '',
      status: false,
    });
  }
  ngOnInit(): void {
    if(this.isLocalStorageAvailable) {
      var arrTasks = this.localtStorageService.getDataLocal('Tasks')
      if(arrTasks){
        this.tasks = JSON.parse(arrTasks);
        this.sharingService.arrSharingObservableData = this.tasks;
      }else{
        this.tasks = []
      }
    }
  }

  onSubmit(value: ITask) {
    if (this.checkoutForm.valid) {
      this.sharingService.arrSharingObservable.subscribe((t)=>{this.tasks = t})
      if(this.tasks.findIndex((e)=>e.title === value.title)  !== -1){
        alert('This task already exists');
      }else{
        value.id = this.tasks.length === 0 ? 1 : this.tasks[this.tasks.length - 1].id + 1;
        this.tasks.push(value);
        this.sharingService.arrSharingObservableData = this.tasks;
        this.sharingService.alertBSData=true;
        this.localtStorageService.setDataLocal('Tasks', JSON.stringify(this.tasks));
      }
    } else {
      console.log('Faltan campos por llenar');
    }
  }
}
