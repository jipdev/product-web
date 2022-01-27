import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from "@angular/material/card";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of, throwError } from "rxjs";
import { SNACKBAR_CONFIGURATION } from "../../../../shared/constants/snackbar-configuration";
import { Product } from "../../interfaces/product";
import { ProductService } from "../../services/product.service";
import { ProductCreateComponent } from './product-create.component';

describe('ProductCreateComponent', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;
  let service: ProductService;
  let snackbar: MatSnackBar;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCreateComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule, MatCardModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCreateComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService);
    snackbar = TestBed.inject(MatSnackBar);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be onSubmit', () => {
    const params = {
      name: 'test',
      size: 1,
      price: 1
    } as Product;

    const mock = {
      ...params,
      id: 'test'
    }

    component.loading = true;

    const createSpy = spyOn(service, 'create').and.returnValue(of(mock));
    const navigateSpy = spyOn(router, 'navigate').and.stub();

    component.onSubmit(params);

    expect(createSpy).toHaveBeenCalledWith(params);
    expect(navigateSpy).toHaveBeenCalledWith(['produtos', mock.id]);
    expect(component.loading).toBeFalse();
  });

  it('should be onSubmit when has error', () => {
    const params = {
      name: '',
      size: 1,
      price: 1
    } as Product;

    const errorMock = {
      error: {
        message: 'test'
      }
    };

    component.loading = true;

    const createSpy = spyOn(service, 'create').and.returnValue(throwError(() => errorMock));
    const openSpy = spyOn(snackbar, 'open').and.stub();

    component.onSubmit(params);

    expect(createSpy).toHaveBeenCalledWith(params);
    expect(openSpy).toHaveBeenCalledWith(errorMock.error.message, undefined, SNACKBAR_CONFIGURATION);
    expect(component.loading).toBeFalse();
  });
});
