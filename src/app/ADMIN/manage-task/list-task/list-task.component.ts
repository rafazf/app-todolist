import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SharingService } from '../../../CORE/services/sharing.service';
import { ITask } from '../../../CORE/models/task.interface';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../../CORE/services/localStorage.service';
import { ReactiveFormsModule,FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'list-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './list-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListTaskComponent {
  showTasksDone = input.required<boolean>();
  data$: Observable<ITask[]>;

  newData: ITask[] = [];
  doNotEnableEditing = true;
  formEditTask;
  constructor(
    public sharingService: SharingService,
    public localStorageService: LocalStorageService,
    public _fb: FormBuilder
  ) {
    this.data$ = this.sharingService.arrSharingObservable;
    this.formEditTask = this._fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      id:0
    })
  }
  removeTask(e: Event) {
    var element = e.target as HTMLLIElement;
    this.newData = JSON.parse(this.localStorageService.getDataLocal('Tasks') || '[]');
    this.newData = this.newData.filter((el) => {
      return el.id !== Number(element.id);
    });
    this.sharingService.arrSharingObservableData = this.newData;
    this.localStorageService.setDataLocal(
      'Tasks',
      JSON.stringify(this.newData)
    );
  }

  changeTaskStatus(e: Event) {
    var element = e.target as HTMLLIElement;
    this.newData = JSON.parse(this.localStorageService.getDataLocal('Tasks') || '[]');
    this.newData = this.newData.map((item) =>
      item.id === Number(element.id) ? { ...item, status: !item.status } : item
    );
    this.localStorageService.setDataLocal(
      'Tasks',
      JSON.stringify(this.newData)
    );
    this.sharingService.arrSharingObservableData = this.newData;
  }

  editTasks(e:Event){
    var element = e.target as HTMLLIElement;
    this.newData = JSON.parse(this.localStorageService.getDataLocal('Tasks') || '[]');
    this.newData = this.newData.filter((item)=>item.id === Number(element.id) ? {...item}:'')
    this.formEditTask.controls.title.setValue(this.newData[0].title);
    this.formEditTask.controls.description.setValue(this.newData[0].description);
    this.formEditTask.controls.id.setValue(this.newData[0].id);
    this.closeModalEditing();    
  }

  saveEditTask(){
    if(this.formEditTask.valid){
      let dataUpdate:ITask[] = JSON.parse(this.localStorageService.getDataLocal('Tasks') || '[]');
      dataUpdate.map((item)=>{
        if(item.id === this.formEditTask.value.id){
          item.title= this.formEditTask.value.title!;
          item.description= this.formEditTask.value.description!;          
        }
      })
      this.localStorageService.setDataLocal("Tasks",JSON.stringify(dataUpdate));
      this.sharingService.arrSharingObservableData = dataUpdate;
    }else{
      alert('Faltan datos por llenar')
    }
  }

  closeModalEditing(){
    this.doNotEnableEditing = !this.doNotEnableEditing;
  }
}
