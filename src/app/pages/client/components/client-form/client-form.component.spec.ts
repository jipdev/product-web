import { SimpleChanges } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { Client } from "../../interfaces/client";
import { ClientFormComponent } from './client-form.component';

describe('ClientFormComponent', () => {
  let component: ClientFormComponent;
  let fixture: ComponentFixture<ClientFormComponent>;
  let formBuilder: FormBuilder;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientFormComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatSelectModule
      ],
      providers: [
        {
          provide: Router,
          useValue: {
            navigateByUrl: (url: string) => null
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFormComponent);
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

    component.initialValue = {} as Client;

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
      email: [null, [Validators.required, Validators.email]],
      cpf: [null, Validators.required],
      gender: [null, Validators.required]
    });
  });

  it('should be updateForm', () => {
    const name = 'test';

    component.initialValue = { name } as Client;
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

    expect(navigateByUrlSpy).toHaveBeenCalledWith('/clientes');
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
