import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ITask } from '../../CORE/models/task.interface';
import { SharingService } from '../../CORE/services/sharing.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit{
  alertColor;
  nTasks=0;
  nTCompleted=0;
  cdr = inject(ChangeDetectorRef);

  constructor(private sharingService: SharingService) {
    this.alertColor = sharingService.alertBS;
    this.sharingService.alertBS.subscribe((value) => {
      if (value === true) {
        setTimeout(() => {
          this.sharingService.alertBSData = false;
        }, 1000);
      }
    });   
  }
  
  ngOnInit(): void {
    this.sharingService.arrSharingObservable.subscribe((data: Array<ITask>) =>{
      this.nTasks = data.length;
    })
    this.sharingService.arrSharingObservable.subscribe({
      next:(data:Array<ITask>)=>
      {
        this.nTCompleted = data.filter((t : ITask) => t.status === true).length;
        this.cdr.detectChanges()
      },
    })
    
  }
}