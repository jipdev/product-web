import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTable, MatTableModule } from "@angular/material/table";
import { of, throwError } from "rxjs";
import { LoadingModule } from "../../../../shared/components/loading/loading.module";
import { SNACKBAR_CONFIGURATION } from "../../../../shared/constants/snackbar-configuration";
import { Fabrication } from "../../enums/fabrication";
import { Product } from "../../interfaces/product";
import { ProductService } from "../../services/product.service";
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let service: ProductService;
  let snackbar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [HttpClientTestingModule, MatTableModule, MatSnackBarModule, MatIconModule, MatCardModule, LoadingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ProductService, useValue: {
            findAll: () => of(),
            remove: (id: string) => of()
          }
        },
        {
          provide: MatSnackBar,
          useValue: {
            open: (msg: string, action: string, cfg: MatSnackBarConfig) => null
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService);
    snackbar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be ngOnInit', () => {
    const fetchProductsSpy = spyOn(component, 'fetchProducts').and.stub();

    component.ngOnInit();

    expect(fetchProductsSpy).toHaveBeenCalled();
  });

  it('should be fetchProducts', () => {
    const mock: Product[] = [
      {
        id: '1',
        name: 'Test',
        fabrication: Fabrication.NATIONAL,
        size: 1,
        price: 1
      }
    ]

    component.loading = true;

    const findAllSpy = spyOn(service, 'findAll').and.returnValue(of(mock));

    component.fetchProducts();

    expect(component.loading).toBeFalse();
    expect(component.products).toEqual(mock);
    expect(findAllSpy).toHaveBeenCalled();
  });

  it('should be fetchProducts when has error', () => {
    const errorMock = {
      error: {
        message: 'test'
      }
    };

    component.loading = true;

    const findAllSpy = spyOn(service, 'findAll').and.returnValue(throwError(() => errorMock));
    const openSpy = spyOn(snackbar, 'open').and.stub();

    component.fetchProducts();

    expect(component.loading).toBeFalse();
    expect(component.products).toBeUndefined();
    expect(findAllSpy).toHaveBeenCalled();
    expect(openSpy).toHaveBeenCalledWith(errorMock.error.message, '', SNACKBAR_CONFIGURATION);
  });

  it('should be remove', () => {
    const id = '1';
    const product: Product = {
      id,
      name: 'test',
      fabrication: Fabrication.NATIONAL,
      price: 1,
      size: 1
    }

    const params = {
      id,
      index: 0,
      table: {} as MatTable<Product>
    };

    component.products = [product, product];

    const removeSpy = spyOn(service, 'remove').and.returnValue(of(product));
    const onRemoveSuccessSpy = spyOn(component, 'onRemoveSuccess').and.callThrough();

    component.remove(params);

    expect(removeSpy).toHaveBeenCalledWith(id);
    expect(onRemoveSuccessSpy).toHaveBeenCalledWith(params);
  });

  it('should be remove when has error', () => {
    const id = '1';
    const errorMock = {
      error: {
        message: 'test'
      }
    };

    const removeSpy = spyOn(service, 'remove').and.returnValue(throwError(() => errorMock));
    const openSpy = spyOn(snackbar, 'open').and.stub();

    component.remove({ id: '1', index: 0, table: {} as MatTable<Product> });

    expect(removeSpy).toHaveBeenCalledWith(id);
    expect(openSpy).toHaveBeenCalledWith(errorMock.error.message, '', SNACKBAR_CONFIGURATION);
  });

  it('should be onRemoveSuccess', () => {
    const product = {} as Product;

    const params = {
      id: '',
      index: 0,
      table: {
        renderRows() {
        }
      } as MatTable<Product>
    }

    component.products = [product, product];

    const renderRowsSpy = spyOn(params.table, 'renderRows').and.stub();

    component.onRemoveSuccess(params);

    expect(component.products.length).toEqual(1);
    expect(renderRowsSpy).toHaveBeenCalled();
  });
});
