define([], function () {
    'use strict';
    return {
        employees: [
            {id: 0, firstName: 'Hans', lastName: 'Mustermann', credentials: {id: 0, enabled: true, email: 'hans.mustermann@techdev.de', authorities: [
                {authority: 'ROLE_EMPLOYEE'}
            ]}}
        ]
    };
});
