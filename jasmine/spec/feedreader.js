/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('url defined inside feedurl', function(){
            allFeeds.forEach(function(item){
                expect(item.url).toBeDefined();
                expect(item.url.length).not.toBe(0);
            });
         });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('name defined inside feedurl', function(){
            allFeeds.forEach(function(item){
                expect(item.name).toBeDefined();
                expect(item.name.length).not.toBe(0);
            });
        });
    });


    /*  a new test suite named "The menu" */
    describe('The menu', function(){
        /* A test that ensures the menu element is
         * hidden by default. 
         */
        it('menu is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * is testing two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          * We test it by checkin if body has class menu-hidden.
          */
        it('menu visibility change', function(){
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

    });      

    /*  a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /*A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so in this test we are using
         * beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){
                loadFeed(0, done);                               
        }); 
            it('loadFeed function result', function(done){ 
                expect($('.feed').find('a.entry-link').length !== 0).toBeTruthy();
        });
    });            
    /*  a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         * We call loadFeed fun twice with diff ids and save the output
         * and then test if the content of both the ids are different.
         */
        var currentFeed,
            oldFeed;
            
            beforeEach(function(done){
                    loadFeed(1, function(){
                        oldFeed = $('.feed').html();
                        loadFeed(0, function(){
                            currentFeed = $('.feed').html();
                            done();
                        });
                        done();    
                    });             
            });
            it('loadFeed is diff for each feed', function(done){ 
                 expect(currentFeed).not.toEqual(oldFeed);
                 done();
            });
    });             
}());
