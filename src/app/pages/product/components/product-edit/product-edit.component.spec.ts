import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from "@angular/material/card";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { of, throwError } from "rxjs";
import { SNACKBAR_CONFIGURATION } from "../../../../shared/constants/snackbar-configuration";
import { Fabrication } from "../../enums/fabrication";
import { Product } from "../../interfaces/product";
import { ProductService } from "../../services/product.service";
import { ProductEditComponent } from './product-edit.component';

const ID = 'abc';

describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;
  let service: ProductService;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let snackbar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductEditComponent],
      imports: [MatSnackBarModule, MatCardModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: Router,
          useValue: {
            navigateByUrl: (url: string) => {
            }
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (param: string) => ID
              }
            }
          }
        },
        {
          provide: ProductService,
          useValue: {
            findById: (id: string) => of(),
            update: (product: Product) => of()
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    snackbar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be ngOnInit', () => {
    const fetchProductSpy = spyOn(component, 'fetchProduct').and.stub();

    component.ngOnInit();

    expect(fetchProductSpy).toHaveBeenCalled();
  });

  it('should be fetchProduct', () => {
    const mock = {
      id: '1',
      name: 'test',
      price: 1,
      size: 1,
      fabrication: Fabrication.NATIONAL
    } as Product;

    const findByIdSpy = spyOn(service, 'findById').and.returnValue(of(mock));

    component.fetchProduct();

    expect(component.product).toEqual(mock);
    expect(findByIdSpy).toHaveBeenCalledWith(ID);
    expect(component.id).toEqual(ID);
  });

  it('should be fetchProduct when has error', () => {
    const errorMock = {
      error: {
        message: 'test'
      }
    };

    const findByIdSpy = spyOn(service, 'findById').and.returnValue(throwError(() => errorMock));
    const onFetchErrorSpy = spyOn(component, 'onFetchError').and.stub();

    component.fetchProduct();

    expect(component.product).toBeUndefined();
    expect(findByIdSpy).toHaveBeenCalledWith(ID);
    expect(onFetchErrorSpy).toHaveBeenCalledWith(errorMock.error);
    expect(component.id).toEqual(ID);
  });

  it('should be onFetchError', () => {
    const error = {
      status: 500,
      message: 'test'
    };

    const openSpy = spyOn(snackbar, 'open').and.stub();
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.stub();

    component.onFetchError(error);

    expect(openSpy).toHaveBeenCalledWith(error.message, undefined, SNACKBAR_CONFIGURATION);
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/produtos');
  });

  it('should be onSubmit', () => {
    const product: Product = {
      id: '1',
      name: 'test',
      price: 1,
      size: 1,
      fabrication: Fabrication.NATIONAL
    };

    component.loading = true;
    component.id = ID;

    const updateSpy = spyOn(service, 'update').and.returnValue(of({} as Product));
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.stub();

    component.onSubmit(product);

    expect(component.loading).toBeFalse();
    expect(updateSpy).toHaveBeenCalledWith(ID, product);
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/produtos');
  });

  it('should be onSubmit when has error', () => {
    const product = {
      id: '1',
      name: 'test',
      price: 1,
      size: 1,
      fabrication: Fabrication.NATIONAL
    } as Product;

    const errorMock = {
      error: {
        message: 'test'
      }
    };

    component.loading = true;
    component.id = ID;

    const updateSpy = spyOn(service, 'update').and.returnValue(throwError(() => errorMock));
    const openSpy = spyOn(snackbar, 'open').and.stub();

    component.onSubmit(product);

    expect(component.loading).toBeFalse();
    expect(updateSpy).toHaveBeenCalledWith(ID, product);
    expect(openSpy).toHaveBeenCalledWith(errorMock.error.message, undefined, SNACKBAR_CONFIGURATION);
  });
});
