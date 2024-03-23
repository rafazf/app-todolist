import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask } from '../models/task.interface';
export interface Persona {
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class SharingService {
  private alertBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get alertBS(){
    return this.alertBehaviorSubject.asObservable();
  }
  set alertBSData(alert:boolean){
    this.alertBehaviorSubject.next(alert);
  }
  //************************************************* */
  private arrTasksBehaviorSubject: BehaviorSubject<ITask[]> =
    new BehaviorSubject<ITask[]>([]);

  get arrSharingObservable() {
    return this.arrTasksBehaviorSubject.asObservable();
  }
  set arrSharingObservableData(data: ITask[]) {
    this.arrTasksBehaviorSubject.next(data);
  }

  //************************************************* */

  private sharingObservablePrivate: BehaviorSubject<ITask> =
    new BehaviorSubject<ITask>({
      id:1,
      title: 'task',
      description: 'Description',
      status: false,
    });

  get sharingObservable() {
    return this.sharingObservablePrivate.asObservable();
  }

  set sharingObservableData(data: ITask) {
    this.sharingObservablePrivate.next(data);
  }



  constructor() {}
}
