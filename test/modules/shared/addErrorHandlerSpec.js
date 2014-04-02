define(['modules/shared/addErrorHandlers'], function(addErrorHandlers) {
    'use strict';
    describe('modules.shared.addErrorHandlers', function() {

        it('should add two methods to the scope', function() {
            var scope = {};
            addErrorHandlers(scope);
            expect(scope.hasError).toBeDefined();
            expect(scope.errorText).toBeDefined();
        });

        it('the added hasError should detect if there is an error', function() {
            var scope = {
                errors: [
                    {
                        property: 'test'
                    }
                ]
            };
            addErrorHandlers(scope);
            var hasError = scope.hasError('test');
            expect(hasError).toBe(true);
            hasError = scope.hasError('test2');
            expect(hasError).toBe(false);
        });

        it('the added errorText should return the error text if there is one', function() {
            var scope = {
                errors: [
                    {
                        property: 'empty',
                        message: 'empty'
                    },
                    {
                        property: 'test',
                        message: 'bar'
                    }
                ]
            };
            addErrorHandlers(scope);
            var errorText = scope.errorText('test');
            expect(errorText).toBe('bar');
            errorText = scope.errorText('test2');
            expect(errorText).toBe('');
        });
    });
});