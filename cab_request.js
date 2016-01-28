/**
 * This is phantomjs file to login book cab request and logout.
 *
 */


var page = require('webpage').create();
const HOME_PAGE = "http://ggns2wfs01:81/appedia1/home.php";
const TAXI_PAGE = "http://ggns2wfs01:81/taxihelpdesk/user.php";
console.log('The default user agent is ' + page.settings.userAgent);
page.settings.userAgent = 'SpecialAgent';
/**
 * Open Login page and register listener for onUrlChanged.
 */
page.onUrlChanged = function (data) {
    console.log(data);
    if (data == "http://ggns2wfs01:81/appedia1/home.php") {
        console.log("open taxi page.")
        openTaxiPage(TAXI_PAGE);
    }
};
page.open('http://ggns2wfs01:81/appedia1/index.php', function (status) {
    console.log(status);
    if (status !== 'success') {
        console.log('Unable to access network');
    } else {
        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function () {
            page.evaluate(function () {
                $('#nav').val("e01039");
                $('#pas').val("24HscgJan80");
                $(".inputbtn").click();
            });
        });
    }
    //phantom.exit();
});

/**
 * Open Taxi page
 * Fill Taxi from.
 * Submit Taxi from.
 */

function openTaxiPage(taxiPage = TAXI_PAGE) {


}
