import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from "@angular/material/icon";
import { NavigationEnd, Router, RouterEvent } from "@angular/router";
import { Subject } from "rxjs";
import { NavbarComponent } from './navbar.component';

const routerEventSubject = new Subject<RouterEvent>();

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [MatIconModule],
      providers: [
        {
          provide: Router,
          useValue: {
            navigateByUrl: (url: string) => {},
            events: routerEventSubject.asObservable()
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be ngOnInit', () => {
    const listenNavigationSpy = spyOn(component, 'listenNavigation').and.stub();

    component.ngOnInit();

    expect(listenNavigationSpy).toHaveBeenCalled();
  });

  it('should be listenNavigation', () => {
    const expectedRoute = '/test/1';

    component.listenNavigation();

    routerEventSubject.next(new NavigationEnd(1, '/test', expectedRoute));

    expect(component.activeUrl).toEqual(expectedRoute);
  });

  it('should be goTo', () => {
    const url = '/test';

    const navigateSpy = spyOn(router, 'navigateByUrl').and.stub();

    component.goTo(url);

    expect(navigateSpy).toHaveBeenCalledWith(url);
  });
});
