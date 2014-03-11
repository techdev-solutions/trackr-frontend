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
                        NAME: 'Name'
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
                        JOIN_DATE: 'Eintrittsdatum'
                    },
                    CREDENTIAL: {
                        EMAIL: 'E-Mail',
                        ENABLED: 'Aktiv'
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
                            TEXT_EDIT_TIMESHEET: 'Erfassen Sie Arbeitszeiten'
                        },
                        SUPERVISOR: {
                            TITLE: 'Supervisor',
                            TEXT_BILL: 'Rechnung erstellen',
                            BILL: {
                                TITLE: 'Rechnungszeiten erfassen',
                                HOURS: 'Stunden',
                                SET_ALL: 'Alle setzen',
                                SUM: 'Summe'
                            }
                        }
                    },
                    ACTIONS: {
                        SAVE: 'Speichern',
                        NEW: 'Neu',
                        CANCEL: 'Abbrechen',
                        EDIT: 'Editieren',
                        CLOSE: 'Schließen',
                        CLEAR: 'Löschen',
                        RESET: 'Zurücksetzen'
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
                        NAME: 'Name'
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
                        JOIN_DATE: 'Join date'
                    },
                    CREDENTIAL: {
                        EMAIL: 'E-Mail',
                        ENABLED: 'Enabled'
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
                            TEXT_EDIT_TIMESHEET: 'Track times'
                        },
                        SUPERVISOR: {
                            TITLE: 'Supervisor',
                            TEXT_BILL: 'Create bill',
                            BILL: {
                                TITLE: 'Track billable hours',
                                HOURS: 'Hours',
                                SET_ALL: 'Set all',
                                SUM: 'Sum'
                            }
                        }
                    },
                    ACTIONS: {
                        SAVE: 'Save',
                        NEW: 'New',
                        CANCEL: 'Cancel',
                        EDIT: 'Edit',
                        CLOSE: 'Close',
                        CLEAR: 'Clear',
                        RESET: 'Reset'
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