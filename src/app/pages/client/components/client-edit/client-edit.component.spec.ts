import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from "@angular/material/card";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { of, throwError } from "rxjs";
import { SNACKBAR_CONFIGURATION } from "../../../../shared/constants/snackbar-configuration";
import { Gender } from "../../enums/gender";
import { Client } from "../../interfaces/client";
import { ClientService } from "../../services/client.service";
import { ClientEditComponent } from './client-edit.component';

const ID = 'abc';

describe('ClientEditComponent', () => {
  let component: ClientEditComponent;
  let fixture: ComponentFixture<ClientEditComponent>;
  let service: ClientService;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let snackbar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientEditComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatCardModule],
      schemas: [NO_ERRORS_SCHEMA],
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
          provide: ClientService,
          useValue: {
            findById: (id: string) => of(),
            update: (client: Client) => of()
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEditComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ClientService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    snackbar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be ngOnInit', () => {
    const fetchClientSpy = spyOn(component, 'fetchClient').and.stub();

    component.ngOnInit();

    expect(fetchClientSpy).toHaveBeenCalled();
  });

  it('should be fetchClient', () => {
    const mock = {
      name: 'test',
      cpf: '123445678',
      gender: Gender.MALE,
      email: 'test@email.com'
    } as Client;

    component.loading.client = true;

    const findByIdSpy = spyOn(service, 'findById').and.returnValue(of(mock));

    component.fetchClient();

    expect(component.loading.client).toBeFalse();
    expect(component.client).toEqual(mock);
    expect(findByIdSpy).toHaveBeenCalledWith(ID);
    expect(component.id).toEqual(ID);
  });

  it('should be fetchClient when has error', () => {
    const errorMock = {
      error: {
        message: 'test'
      }
    };

    component.loading.client = true;

    const findByIdSpy = spyOn(service, 'findById').and.returnValue(throwError(() => errorMock));
    const onFetchErrorSpy = spyOn(component, 'onFetchError').and.stub();

    component.fetchClient();

    expect(component.loading.client).toBeFalse();
    expect(component.client).toBeUndefined();
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
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/clientes');
  });

  it('should be onSubmit', () => {
    const client = {
      email: 'test@email',
      cpf: '123456789',
      name: 'test',
      gender: Gender.MALE
    } as Client;

    component.loading.submit = true;
    component.id = ID;

    const updateSpy = spyOn(service, 'update').and.returnValue(of({} as Client));
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.stub();

    component.onSubmit(client);

    expect(component.loading.submit).toBeFalse();
    expect(updateSpy).toHaveBeenCalledWith(ID, client);
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/clientes');
  });

  it('should be onSubmit when has error', () => {
    const client = {
      email: 'test@email',
      cpf: '123456789',
      name: 'test',
      gender: Gender.MALE
    } as Client;

    const errorMock = {
      error: {
        message: 'test'
      }
    };

    component.loading.submit = true;
    component.id = ID;

    const updateSpy = spyOn(service, 'update').and.returnValue(throwError(() => errorMock));
    const openSpy = spyOn(snackbar, 'open').and.stub();

    component.onSubmit(client);

    expect(component.loading.submit).toBeFalse();
    expect(updateSpy).toHaveBeenCalledWith(ID, client);
    expect(openSpy).toHaveBeenCalledWith(errorMock.error.message, undefined, SNACKBAR_CONFIGURATION);
  });
});
