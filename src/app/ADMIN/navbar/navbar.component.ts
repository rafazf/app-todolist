import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../../CORE/models/task.interface';
import { SharingService } from '../../CORE/services/sharing.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  alertColor;

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
}
