import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ClientListTableComponent } from './client-list-table.component';

describe('ClientListTableComponent', () => {
  let component: ClientListTableComponent;
  let fixture: ComponentFixture<ClientListTableComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientListTableComponent],
      imports: [MatTableModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListTableComponent);
    component = fixture.componentInstance;
    component.data = [];
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be remove', () => {
    const id = '1';
    const index = 0;
    const emitSpy = spyOn(component.removeItem, 'emit').and.stub();

    component.remove(index, id);

    expect(emitSpy).toHaveBeenCalledWith({ index, id });
  });

  it('should be edit', () => {
    const id = '1';

    const navigateSpy = spyOn(router, 'navigate').and.stub();

    component.edit(id);

    expect(navigateSpy).toHaveBeenCalledWith(['clientes', id]);
  });
});
