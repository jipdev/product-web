import { SimpleChanges } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxMaskModule } from "ngx-mask";
import { Product } from "../../interfaces/product";
import { ProductFormComponent } from './product-form.component';

fdescribe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let formBuilder: FormBuilder;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        NgxMaskModule.forRoot()
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be ngOnInit', () => {
    const buildFormSpy = spyOn(component, 'buildForm').and.stub();

    component.ngOnInit();

    expect(buildFormSpy).toHaveBeenCalled();
  });

  it('should be ngOnChanges', () => {
    const changes = {
      initialValue: {
        firstChange: true
      }
    } as unknown as SimpleChanges

    component.initialValue = {} as Product;

    const updateFormSpy = spyOn(component, 'updateForm').and.stub();

    component.ngOnChanges(changes);

    expect(updateFormSpy).toHaveBeenCalled();
  });

  it('should be buildForm', () => {
    const groupSpy = spyOn(formBuilder, 'group')
      .and.stub()
      .and.returnValue(new FormGroup({}));

    component.buildForm();

    expect(component.form).toBeDefined();
    expect(groupSpy).toHaveBeenCalledWith({
      name: [null, Validators.required],
      fabrication: [null, Validators.required],
      size: [null, Validators.required],
      price: [null, Validators.required],
    });
  });

  it('should be updateForm', () => {
    const name = 'test';

    component.initialValue = { name } as Product;
    component.form = new FormGroup({
      name: new FormControl()
    });

    const patchValueSpy = spyOn(component.form, 'patchValue').and.callThrough();
    const updateValueAndValiditySpy = spyOn(component.form, 'updateValueAndValidity').and.callThrough();

    component.updateForm();

    expect(component.form.value).toEqual({ name });
    expect(patchValueSpy).toHaveBeenCalledWith({ name });
    expect(updateValueAndValiditySpy).toHaveBeenCalled();
  });

  it('should be hasError and return true', () => {
    component.form = new FormGroup({
      test: new FormControl(null, Validators.required)
    });

    component.form.get('test')?.markAsTouched();

    expect(component.hasError('test', 'required')).toBeTrue();
  });

  it('should be hasError and return false', () => {
    component.form = new FormGroup({
      test: new FormControl(null, Validators.required)
    });

    component.form.get('test')?.markAsTouched();
    component.form.get('test')?.patchValue('1');

    expect(component.hasError('test', 'required')).toBeFalse();
  });

  it('should be backToList', () => {
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.stub();

    component.backToList();

    expect(navigateByUrlSpy).toHaveBeenCalledWith('/produtos');
  });

  it('should submit', () => {
    const value = 1;

    component.form = new FormGroup({
      test: new FormControl(value, Validators.required)
    });

    const emitSpy = spyOn(component.onSubmit, 'emit').and.stub();

    component.submit();

    expect(emitSpy).toHaveBeenCalledWith({ test: value });
  });
});
