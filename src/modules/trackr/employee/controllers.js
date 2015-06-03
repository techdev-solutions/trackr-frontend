define(
    [
        './selfController',
        './selfEditController',
        './timesheet/timesheetController',
        './timesheet/timesheetOverviewController',
        './vacation/listController',
        './vacation/newController',
        './address_book/addressBookController',
        './sick_days/sickDaysController',
        './sick_days/sickDaysEditController'
    ],
    function(SelfController, SelfEditController, TimeSheetController, TimesheetOverviewController, VacationListController,
             VacationNewController, AddressBookController, SickDaysController, SickDaysEditController) {
        'use strict';
        return {
            init: function(module) {
                module.controller('trackr.employee.controllers.self', SelfController);
                module.controller('trackr.employee.controllers.self-edit', SelfEditController);
                module.controller('trackr.employee.controllers.timesheet', TimeSheetController);
                module.controller('trackr.employee.controllers.timesheet-overview', TimesheetOverviewController);
                module.controller('trackr.employee.controllers.vacation-list', VacationListController);
                module.controller('trackr.employee.controllers.vacation-new', VacationNewController);
                module.controller('trackr.employee.controllers.address_book', AddressBookController);
                module.controller('trackr.employee.controllers.sick-days', SickDaysController);
                module.controller('trackr.employee.controllers.sick-days-edit', SickDaysEditController);
            }
        };
    }
);