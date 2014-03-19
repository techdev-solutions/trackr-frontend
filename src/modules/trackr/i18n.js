define([], function () {
    'use strict';
    return {
        init: function (trackr) {
            trackr.config(['$translateProvider', function ($translateProvider) {
                $translateProvider.translations('de', {
                    COMPANY: {
                        CREATE_NEW: 'Neue Firma anlegen',
                        COMPANIES: 'Firmen',
                        COMPANY_ID: 'Eindeutiger Bezeichner',
                        NAME: 'Name',
                        COMPANY_ID_CONFLICT: 'Bezeichner bereits vergeben.'
                    },
                    ADDRESS: {
                        ADDRESS: 'Adresse',
                        STREET: 'Straße',
                        HOUSE_NUMBER: 'Hausnummer',
                        CITY: 'Stadt',
                        ZIPCODE: 'PLZ',
                        COUNTRY: ' Land'
                    },
                    CONTACTPERSON: {
                        CONTACTPERSON: 'Kontaktperson',
                        CONTACTPERSONS: 'Kontaktpersonen',
                        SALUTATION: ' Anrede',
                        FIRST_NAME: 'Vorname',
                        LAST_NAME: 'Nachname',
                        EMAIL: 'Email',
                        PHONE: 'Telefon'
                    },
                    EMPLOYEE: {
                        CREATE_NEW: 'Neuen Angestellten anlegen',
                        EMPLOYEES: 'Angestellte',
                        EMPLOYEE: 'Angestellte/r',
                        FIRST_NAME: 'Vorname',
                        LAST_NAME: 'Nachname',
                        TITLE: 'Titel',
                        SALARY: 'Gehalt',
                        PHONE_NUMBER: 'Telefon',
                        HOURLY_COST_RATE: 'Stundensatz',
                        ADMINISTRATE_ROLES: 'Alle Rollen',
                        JOIN_DATE: 'Eintrittsdatum',
                        LEAVE_DATE: 'Austrittsdatum',
                        FEDERAL_STATE: 'Bundesland',
                        VACATION_ENTITLEMENT: 'Urlaubsanspruch'
                    },
                    CREDENTIAL: {
                        EMAIL: 'E-Mail',
                        ENABLED: 'Aktiv',
                        EMAIL_CONFLICT: 'Email bereits in Benutzung.'
                    },
                    PROJECT: {
                        PROJECTS: 'Projekte',
                        PROJECT: 'Projekt',
                        IDENTIFIER: 'Eindeutiger Bezeichner',
                        NAME: 'Name',
                        VOLUME: 'Volumen',
                        HOURLY_RATE: 'Stundensatz',
                        DAILY_RATE: 'Tagessatz',
                        FIXED_PRICE: 'Festpreis',
                        COMPANY: 'Firma',
                        DEBITOR: 'Debitor'
                    },
                    WORKTIME: {
                        DATE: 'Datum',
                        PROJECT: 'Projekt',
                        START: 'Startzeit',
                        END: 'Endzeit',
                        COMMENT: 'Kommentar'
                    },
                    BILLABLE_TIME: {
                        DATE: 'Datum',
                        BILLABLE_HOURS: 'Rechnungsstunden'
                    },
                    VACATION_REQUEST: {
                        START_DATE: 'Start',
                        END_DATE: 'Ende',
                        NUMBER_OF_DAYS: 'Tage',
                        STATUS: 'Status',
                        APPROVER: 'Genehmigt von',
                        APPROVAL_DATE: 'Genehmigt am',
                        PENDING: 'Wartet',
                        APPROVED: 'Genehmigt',
                        REJECTED: 'Abgelehnt',
                        INTERVAL: 'Zeitraum',
                        EMPLOYEE: 'Angestellter',
                        SUBMITTED: 'Eingereicht am'
                    },
                    PAGES: {
                        HOME: {
                            WELCOME_TEXT: 'Willkommen bei trackr'
                        },
                        ADMINISTRATION: {
                            TITLE: 'Verwaltung',
                            TEXT_COMPANIES: 'Legen Sie neue Firmen an und editieren Sie bestehende.',
                            TEXT_EMPLOYEES: 'Verwalten Sie Angestellte in trackr.',
                            TEXT_PROJECTS: 'Verwalten Sie Projekte'
                        },
                        EMPLOYEE: {
                            TITLE: 'Self Services',
                            TEXT_EDIT_PROFILE: 'Editieren Sie ihr Profil',
                            TEXT_EDIT_TIMESHEET: 'Erfassen Sie Arbeitszeiten',
                            TEXT_VACATION: 'Urlaubsanträge'
                        },
                        SUPERVISOR: {
                            TITLE: 'Supervisor',
                            TEXT_BILL: 'Rechnungszeiten erfassen',
                            TEXT_BILL_CREATE: 'Rechnung erstellen',
                            BILL: {
                                TITLE: 'Rechnungszeiten erfassen',
                                HOURS: 'Stunden',
                                SET_ALL: 'Alle setzen',
                                SUM: 'Summe'
                            },
                            VACATION: {
                                TITLE: 'Urlaubsanträge'
                            },
                            BILL_CREATE: {
                                TITLE: 'Rechnung erstellen',
                                HOURS: 'Stunden',
                                MAN_DAYS: 'Manntage',
                                NET_PRICE: 'Netto',
                                GROSS_PRICE: 'Brutto'
                            }
                        }
                    },
                    ACTIONS: {
                        ACTIONS: 'Aktionen',
                        SAVE: 'Speichern',
                        NEW: 'Neu',
                        CANCEL: 'Abbrechen',
                        EDIT: 'Editieren',
                        CLOSE: 'Schließen',
                        CLEAR: 'Löschen',
                        RESET: 'Zurücksetzen',
                        APPROVE: 'Genehmigen',
                        REJECT: 'Ablehnen'
                    },
                    DATE: {
                        TODAY: 'Heute',
                        WEEKS: 'Wochen'
                    },
                    LANGUAGE: 'Sprache'
                });

                $translateProvider.translations('en', {
                    COMPANY: {
                        CREATE_NEW: 'Create new company',
                        COMPANIES: 'Companies',
                        COMPANY_ID: 'Unique identifier',
                        NAME: 'Name',
                        COMPANY_ID_CONFLICT: 'Identifier already in use.'
                    },
                    ADDRESS: {
                        ADDRESS: 'Address',
                        STREET: 'Street',
                        HOUSE_NUMBER: 'House number',
                        CITY: 'City',
                        ZIPCODE: 'Zipcode',
                        COUNTRY: ' Country'
                    },
                    CONTACTPERSON: {
                        CONTACTPERSON: 'Contact person',
                        CONTACTPERSONS: 'Contact persons',
                        SALUTATION: ' Salutation',
                        FIRST_NAME: 'First name',
                        LAST_NAME: 'Last name',
                        EMAIL: 'Email',
                        PHONE: 'Phone'
                    },
                    EMPLOYEE: {
                        CREATE_NEW: 'Create new employee',
                        EMPLOYEES: 'Employees',
                        EMPLOYEE: 'Employee',
                        FIRST_NAME: 'First name',
                        LAST_NAME: 'Last name',
                        TITLE: 'Title',
                        SALARY: 'Salary',
                        PHONE_NUMBER: 'Phone number',
                        HOURLY_COST_RATE: 'Hourly cost rate',
                        ADMINISTRATE_ROLES: 'All roles',
                        JOIN_DATE: 'Join date',
                        LEAVE_DATE: 'Leave date',
                        FEDERAL_STATE: 'Federal state',
                        VACATION_ENTITLEMENT: 'Vacation entitlement'
                    },
                    CREDENTIAL: {
                        EMAIL: 'E-Mail',
                        ENABLED: 'Enabled',
                        EMAIL_CONFLICT: 'Email already in use.'
                    },
                    PROJECT: {
                        PROJECTS: 'Projects',
                        PROJECT: 'Project',
                        IDENTIFIER: 'Identifier',
                        NAME: 'Name',
                        VOLUME: 'Volume',
                        HOURLY_RATE: 'Hourly rate',
                        DAILY_RATE: 'Daily rate',
                        FIXED_PRICE: 'Fixed price',
                        COMPANY: 'Company',
                        DEBITOR: 'Debitor'
                    },
                    BILLABLE_TIME: {
                        DATE: 'Date',
                        BILLABLE_HOURS: 'Billable hours'
                    },
                    VACATION_REQUEST: {
                        START_DATE: 'Start date',
                        END_DATE: 'End date',
                        NUMBER_OF_DAYS: 'Number of days',
                        STATUS: 'Status',
                        APPROVER: 'Approved by',
                        APPROVAL_DATE: 'Approval date',
                        PENDING: 'Pending',
                        APPROVED: 'Approved',
                        REJECTED: 'Rejected',
                        INTERVAL: 'Interval',
                        EMPLOYEE: 'Employee',
                        SUBMITTED: 'Submitted'
                    },
                    WORKTIME: {
                        DATE: 'Date',
                        PROJECT: 'Project',
                        START: 'Start time',
                        END: 'End time',
                        COMMENT: 'Comment'
                    },
                    PAGES: {
                        HOME: {
                            WELCOME_TEXT: 'Welcome to trackr'
                        },
                        ADMINISTRATION: {
                            TITLE: 'Administration',
                            TEXT_COMPANIES: 'Edit and create companies.',
                            TEXT_EMPLOYEES: 'Administrate employees in trackr.',
                            TEXT_PROJECTS: 'Administrate projects'
                        },
                        EMPLOYEE: {
                            TITLE: 'Self Services',
                            TEXT_EDIT_PROFILE: 'Edit your profile',
                            TEXT_EDIT_TIMESHEET: 'Track times',
                            TEXT_VACATION: 'Vacation request'
                        },
                        SUPERVISOR: {
                            TITLE: 'Supervisor',
                            TEXT_BILL: 'Enter billable hours',
                            TEXT_BILL_CREATE: 'Create bill',
                            BILL: {
                                TITLE: 'Track billable hours',
                                HOURS: 'Hours',
                                SET_ALL: 'Set all',
                                SUM: 'Sum'
                            },
                            BILL_CREATE: {
                                TITLE: 'Create bill',
                                HOURS: 'Hours',
                                MAN_DAYS: 'Man days',
                                NET_PRICE: 'Net price',
                                GROSS_PRICE: 'Gross price'
                            },
                            VACATION: {
                                TITLE: 'Vacation requests'
                            }
                        }
                    },
                    ACTIONS: {
                        ACTIONS: 'Actions',
                        SAVE: 'Save',
                        NEW: 'New',
                        CANCEL: 'Cancel',
                        EDIT: 'Edit',
                        CLOSE: 'Close',
                        CLEAR: 'Clear',
                        RESET: 'Reset',
                        APPROVE: 'Approve',
                        REJECT: 'Reject'
                    },
                    DATE: {
                        TODAY: 'Today',
                        WEEKS: 'Weeks'
                    },
                    LANGUAGE: 'Language'
                });

                $translateProvider.preferredLanguage('de');
            }]);
        }
    };
});