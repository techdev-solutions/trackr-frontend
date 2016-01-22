define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('base.filters.configValueFilter', function () {
        baseTestSetup();

        it('should parse a config key to a config value', inject(function(configValueFilter) {
            expect(configValueFilter('portalUrl')).toBeDefined();
        }));

        it('should throw when a value does not exist', inject(function (configValueFilter) {
            expect( function() { configValueFilter('totally_not_existing_key'); }).toThrow('Configuration key totally_not_existing_key not found.');
        }));
    });
});
