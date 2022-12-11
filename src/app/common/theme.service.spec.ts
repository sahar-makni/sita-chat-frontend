import {ThemeService} from './theme.service';
import {USER_THEME} from '../utils/const/general';

// these are few tests that I would have written more if I had more time
describe(ThemeService.name, () => {
  let service: ThemeService;
  let documentMock: jasmine.SpyObj<Document>;
  let storageMock: jasmine.SpyObj<Storage>;
  beforeEach(() => {
    documentMock = jasmine.createSpyObj('document', ['getElementById']);
    storageMock = jasmine.createSpyObj('localStorage', ['getItem', 'setItem']);

    service = new ThemeService(documentMock, storageMock);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
  it('should get theme from local storage', () => {
    // GIVEN
    storageMock.getItem.and.returnValue('ARYA_BLUE');
    // WHEN
    const theme = service.getTheme();
    // THEN
    expect(theme).toEqual('ARYA_BLUE');
    expect(storageMock.getItem).toHaveBeenCalledWith(USER_THEME);
  });
  it('should set the saved theme from local storage ', () => {
    // GIVEN
    const linkElement = {} as HTMLLinkElement ;
    documentMock.getElementById.and.returnValue(linkElement);
    storageMock.getItem.and.returnValue('ARYA_BLUE');
    // // WHEN
    service.switchTheme('SAGA_BLUE');
    // // THEN
    expect(storageMock.setItem).toHaveBeenCalledWith(USER_THEME, 'SAGA_BLUE');
    expect(linkElement.href).toEqual('saga-blue.css');
  });
});
