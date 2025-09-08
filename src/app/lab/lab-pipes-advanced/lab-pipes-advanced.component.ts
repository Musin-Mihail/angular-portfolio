import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';

import { StatusFilterPipe } from '../../shared/pipes/status-filter.pipe';

interface User {
  id: number;
  name: string;
  status: 'активен' | 'неактивен';
}

@Component({
  selector: 'app-lab-pipes-advanced',
  standalone: true,
  imports: [CommonModule, StatusFilterPipe],
  templateUrl: './lab-pipes-advanced.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabPipesAdvancedComponent implements OnInit {
  private nextId = 4;

  private masterUsersList: User[] = [
    { id: 2, name: 'Борис', status: 'неактивен' },
    { id: 3, name: 'Виктория', status: 'активен' },
  ];

  public users = signal<User[]>([]);
  public usersJson = signal('');

  ngOnInit(): void {
    this.users.set(this.masterUsersList.map(u => ({ ...u })));
    this.updateUsersJson();
  }

  mutateUserStatus(): void {
    const userToChange = this.masterUsersList.find((u) => u.id === 2);
    if (userToChange) {
      userToChange.status = userToChange.status === 'активен' ? 'неактивен' : 'активен';
    }
    this.updateUsersJson();
  }

  addUser(): void {
    const newUser: User = {
      id: this.nextId++,
      name: `Пользователь ${this.nextId - 1}`,
      status: 'активен',
    };
    this.masterUsersList.push(newUser);
    this.users.set(this.masterUsersList.map(u => ({ ...u })));
    this.updateUsersJson();
  }

  private updateUsersJson(): void {
    this.usersJson.set(JSON.stringify(this.masterUsersList, null, 2));
  }
}
