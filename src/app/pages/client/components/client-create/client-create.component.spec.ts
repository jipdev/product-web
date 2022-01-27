import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from "@angular/material/card";
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { of, throwError } from "rxjs";
import { SNACKBAR_CONFIGURATION } from "../../../../shared/constants/snackbar-configuration";
import { Client } from "../../interfaces/client";
import { ClientService } from "../../services/client.service";
import { ClientCreateComponent } from './client-create.component';

describe('ClientCreateComponent', () => {
  let component: ClientCreateComponent;
  let fixture: ComponentFixture<ClientCreateComponent>;
  let service: ClientService;
  let snackbar: MatSnackBar;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientCreateComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatCardModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ClientService, useValue: {
            create: (client: Client) => of()
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: (url: string[]) => null
          },
        },
        {
          provide: MatSnackBar,
          useValue: {
            open: (text: string, action: string, config: MatSnackBarConfig) => null
          }
        }
      ]
    })
      .compileComponents();
  })
  ;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCreateComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ClientService);
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
      email: 'test@email.com'
    } as Client;

    const client = {
      ...params,
      id: 'test'
    }

    component.loading = true;

    const createSpy = spyOn(service, 'create').and.returnValue(of(client));
    const navigateSpy = spyOn(router, 'navigate').and.stub();

    component.onSubmit(params);

    expect(createSpy).toHaveBeenCalledWith(params);
    expect(navigateSpy).toHaveBeenCalledWith(['clientes', client.id]);
    expect(component.loading).toBeFalse();
  });

  it('should be onSubmit when has error', () => {
    const params = {
      name: 'test',
      email: 'test@email.com'
    } as Client;

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
