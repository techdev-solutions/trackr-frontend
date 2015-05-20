define(['modules/reportr/intervalLocationService', 'moment'], function(IntervalLocationServiceCtor, moment) {
    'use strict';
    describe('The intervalLocationService', function() {
        var locationMock, intervalLocationService;

        beforeEach(function() {
            locationMock = {
                search: function() {                }
            };
            intervalLocationService = new IntervalLocationServiceCtor(locationMock);
        });

        it('must load the start and end date from the location if present', function() {
            spyOn(locationMock, 'search').andReturn({
                start: '2015-05-20',
                end: '2015-05-21'
            });
            var interval = intervalLocationService.loadIntervalFromLocation();
            expect(interval.start.getTime()).toBe(moment('2015-05-20').toDate().getTime());
            expect(interval.end.getTime()).toBe(moment('2015-05-21').toDate().getTime());
        });

        it('must use the current month as the interval when the parameters are not present', function() {
            spyOn(locationMock, 'search').andReturn({});
            var interval = intervalLocationService.loadIntervalFromLocation();
            expect(interval.start.getTime()).toBe(moment().startOf('month').toDate().getTime());
            expect(interval.end.getTime()).toBe(moment().endOf('month').toDate().getTime());
        });

        it('must use the current month as the interval when the parameters are not strings', function() {
            spyOn(locationMock, 'search').andReturn({
                start: true,
                end: true
            });
            var interval = intervalLocationService.loadIntervalFromLocation();
            expect(interval.start.getTime()).toBe(moment().startOf('month').toDate().getTime());
            expect(interval.end.getTime()).toBe(moment().endOf('month').toDate().getTime());
        });

        it('must set the location parameters', function() {
            spyOn(locationMock, 'search');
            intervalLocationService.saveIntervalToLocation(moment('2015-05-20'), moment('2015-05-21'));
            expect(locationMock.search).toHaveBeenCalledWith('start', '2015-05-20');
            expect(locationMock.search).toHaveBeenCalledWith('end', '2015-05-21');
        });
    });
});