jest.dontMock('../logger');

describe('Instantiate Logger', function() {
  it('must have a module name and the default namespace', function() {
    import Logger from '../logger';
    var customModule = 'my-module';

    var testLogger = new Logger('my-module');

    expect(testLogger.moduleName).toBe(customModule);
    expect(testLogger.namespace).toBe('default');
  });

  it('must have a custom namespace', function() {
    import Logger from '../logger';
    var customNameSpace = 'components';

    var testLogger = new Logger('second-module', customNameSpace);

    expect(testLogger.namespace).toBe(customNameSpace);
  });

  it('should compute the right prefix', function() {
    import Logger from '../logger';
    var customModule = 'my-module';
    var customNameSpace = 'components';

    var testLogger = new Logger(customModule, customNameSpace);

    expect(testLogger.getPrefix()).toBe('[components][my-module]');
  });
});
