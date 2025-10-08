import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, debounceTime, map, startWith } from 'rxjs/operators';

import { Project } from './project.model';
import { ProjectService } from './project.service';

interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('itemAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class ProjectsComponent {
  private projectService = inject(ProjectService);
  public searchControl = new FormControl<string>('', { nonNullable: true });

  private readonly initialState: ProjectsState = { projects: [], loading: true, error: null };

  private state = toSignal(
    this.projectService.getProjects().pipe(
      map((projects): ProjectsState => ({ projects, loading: false, error: null })),
      startWith(this.initialState),
      catchError((err) => {
        console.error('Ошибка при загрузке проектов:', err);
        const errorMessage = 'Не удалось загрузить проекты. Попробуйте обновить страницу.';
        return of<ProjectsState>({ projects: [], loading: false, error: errorMessage });
      })
    ),
    { initialValue: this.initialState }
  );

  public readonly isLoading = computed(() => this.state().loading);
  public readonly errorMsg = computed(() => this.state().error);

  private readonly searchTerm = toSignal(this.searchControl.valueChanges.pipe(debounceTime(300)), {
    initialValue: '',
  });

  public readonly filteredProjects = computed(() => {
    const allProjects = this.state().projects;
    const term = this.searchTerm().toLowerCase();

    if (!term) {
      return allProjects;
    }

    return allProjects.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tags.some((tag) => tag.toLowerCase().includes(term))
    );
  });
}
