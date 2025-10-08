import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { provideRouter, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({ standalone: true, template: '' })
class ProjectsComponent {}

@Component({ standalone: true, template: '' })
class LabComponent {}

@Component({ standalone: true, template: '' })
class HomeComponent {}

@Component({
  standalone: true,
  selector: 'app-host-component',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
class HostComponent {}

describe('App Routes', () => {
  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        provideRouter([
          { path: '', component: HomeComponent },
          { path: 'projects', component: ProjectsComponent },
          { path: 'lab', component: LabComponent },
          { path: '**', redirectTo: '', pathMatch: 'full' },
        ]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(HostComponent);
  });

  it('should navigate to the default route ("")', async () => {
    await router.navigate(['']);
    await fixture.whenStable();
    expect(location.path()).toBe('');
  });

  it('should navigate to "projects"', async () => {
    await router.navigate(['/projects']);
    await fixture.whenStable();
    expect(location.path()).toBe('/projects');
  });

  it('should redirect an unknown path to the default route', async () => {
    await router.navigate(['/some/non-existent/path']);
    await fixture.whenStable();
    expect(location.path()).toBe('');
  });
});
