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
import { Product } from "../../../product/interfaces/product";
import { Gender } from "../../enums/gender";
import { Client } from "../../interfaces/client";
import { ClientService } from "../../services/client.service";
import { ClientListComponent } from './client-list.component';

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;
  let service: ClientService;
  let snackbar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientListComponent],
      imports: [HttpClientTestingModule, MatTableModule, MatSnackBarModule, MatIconModule, MatCardModule, LoadingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ClientService,
          useValue: {
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
    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ClientService);
    snackbar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be ngOnInit', () => {
    const fetchClientsSpy = spyOn(component, 'fetchClients').and.stub();

    component.ngOnInit();

    expect(fetchClientsSpy).toHaveBeenCalled();
  });

  it('should be fetchClients', () => {
    const mock: Client[] = [
      {
        id: '1',
        cpf: '123456789',
        email: 'test@email.com',
        gender: Gender.FEMALE,
        name: 'Test'
      }
    ]

    component.loading = true;

    const findAllSpy = spyOn(service, 'findAll').and.returnValue(of(mock));

    component.fetchClients();

    expect(component.loading).toBeFalse();
    expect(component.clients).toEqual(mock);
    expect(findAllSpy).toHaveBeenCalled();
  });

  it('should be fetchClients when has error', () => {
    const errorMock = {
      error: {
        message: 'test'
      }
    };

    component.loading = true;

    const findAllSpy = spyOn(service, 'findAll').and.returnValue(throwError(() => errorMock));
    const openSpy = spyOn(snackbar, 'open').and.stub();

    component.fetchClients();

    expect(component.loading).toBeFalse();
    expect(component.clients).toBeUndefined();
    expect(findAllSpy).toHaveBeenCalled();
    expect(openSpy).toHaveBeenCalledWith(errorMock.error.message, '', SNACKBAR_CONFIGURATION);
  });

  it('should be remove', () => {
    const id = '1';
    const client: Client = {
      id,
      cpf: '12345447',
      name: 'Test',
      gender: Gender.MALE,
      email: 'test@email.com'
    };

    const params = {
      id,
      index: 0,
      table: {} as MatTable<Client>
    };

    component.clients = [client, client];

    const removeSpy = spyOn(service, 'remove').and.returnValue(of(client));
    const onRemoveSuccessSpy = spyOn(component, 'onRemoveSuccess').and.callThrough();

    component.remove(params);

    expect(component.clients.length).toEqual(1);
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

    component.remove({ id: '1', index: 0, table: {} as MatTable<Client> });

    expect(removeSpy).toHaveBeenCalledWith(id);
    expect(openSpy).toHaveBeenCalledWith(errorMock.error.message, '', SNACKBAR_CONFIGURATION);
  });


  it('should be onRemoveSuccess', () => {
    const client = {} as Client;

    const params = {
      id: '',
      index: 0,
      table: {
        renderRows() {
        }
      } as MatTable<Product>
    }

    component.clients = [client, client];

    const renderRowsSpy = spyOn(params.table, 'renderRows').and.stub();

    component.onRemoveSuccess(params);

    expect(component.clients.length).toEqual(1);
    expect(renderRowsSpy).toHaveBeenCalled();
  });
});
