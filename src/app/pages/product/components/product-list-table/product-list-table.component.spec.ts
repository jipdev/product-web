import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";
import { ProductListTableComponent } from './product-list-table.component';

describe('ProductListTableComponent', () => {
  let component: ProductListTableComponent;
  let fixture: ComponentFixture<ProductListTableComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListTableComponent],
      imports: [MatTableModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: (url: string[]) => null
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListTableComponent);
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

    expect(emitSpy).toHaveBeenCalledWith({ index, id, table: component.table });
  });

  it('should be edit', () => {
    const id = '1';

    const navigateSpy = spyOn(router, 'navigate').and.stub();

    component.edit(id);

    expect(navigateSpy).toHaveBeenCalledWith(['/produtos', id]);
  });
});
