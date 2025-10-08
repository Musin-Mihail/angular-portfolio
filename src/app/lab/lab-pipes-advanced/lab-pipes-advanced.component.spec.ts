import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { StatusFilterPipe } from '../../shared/pipes/status-filter.pipe';
import { LabPipesAdvancedComponent } from './lab-pipes-advanced.component';

describe('LabPipesAdvancedComponent', () => {
  let component: LabPipesAdvancedComponent;
  let fixture: ComponentFixture<LabPipesAdvancedComponent>;
  let renderedList: HTMLElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabPipesAdvancedComponent, StatusFilterPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(LabPipesAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const getRenderedListItems = (): HTMLElement[] => {
    return Array.from(fixture.nativeElement.querySelectorAll('ul li'));
  };

  it('should initialize and show only active users', () => {
    renderedList = getRenderedListItems();
    expect(renderedList.length).toBe(1);
    expect(renderedList[0].textContent).toContain('Виктория (активен)');
  });

  it('mutateUserStatus should NOT update the view because the pipe is pure', () => {
    const initialListText = getRenderedListItems().map((li) => li.textContent);
    component.mutateUserStatus();
    fixture.detectChanges();

    const newListText = getRenderedListItems().map((li) => li.textContent);
    expect(newListText).toEqual(initialListText);

    const borisUser = JSON.parse(component.usersJson()).find((u: { id: number }) => u.id === 2);
    expect(borisUser.status).toBe('активен');
  });

  it('addUser should update the view because it provides a new array reference', () => {
    const initialCount = getRenderedListItems().length;
    expect(initialCount).toBe(1);

    component.addUser();
    fixture.detectChanges();

    const newCount = getRenderedListItems().length;
    expect(newCount).toBe(initialCount + 1);
    const lastItem = getRenderedListItems().pop();
    expect(lastItem?.textContent).toContain('Пользователь 4 (активен)');
  });

  it('should not throw an error if the user to mutate is not found', () => {
    const originalMasterList = (component as any).masterUsersList;
    (component as any).masterUsersList = originalMasterList.filter(
      (u: { id: number }) => u.id !== 2
    );

    expect(() => component.mutateUserStatus()).not.toThrow();

    (component as any).masterUsersList = originalMasterList;
  });
});
