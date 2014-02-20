define([], function() {
    'use strict';
    return {
        init: function(trackr) {
            trackr.config(['$translateProvider', function($translateProvider) {
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
                        COUNTRY:' Land'
                    },
                    PAGES: {
                        HOME: {
                            WELCOME_TEXT: 'Willkommen bei trackr'
                        },
                        ADMINISTRATION: {
                            TITLE: 'Verwaltung',
                            TEXT_COMPANIES: 'Legen Sie neue Firmen an und editieren Sie bestehende.',
                            TEXT_ROLES: 'Verwalten Sie Nutzerrollen in trackr.'
                        }
                    },
                    ACTIONS: {
                        SAVE: 'Speichern',
                        NEW: 'Neu'
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
                        COUNTRY:' Country'
                    },
                    PAGES: {
                        HOME: {
                            WELCOME_TEXT: 'Welcome to trackr'
                        },
                        ADMINISTRATION: {
                            TITLE: 'Administration',
                            TEXT_COMPANIES: 'Edit and create companies.',
                            TEXT_ROLES: 'Administrate user roles in trackr.'
                        }
                    },
                    ACTIONS: {
                        SAVE: 'Save',
                        NEW: 'New'
                    },
                    LANGUAGE: 'Language'
                });

                $translateProvider.preferredLanguage('de');
            }]);
        }
    };
});