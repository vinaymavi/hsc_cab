/**
 * This is phantomjs file to login book cab request and logout.
 *
 */


var page = require('webpage').create();
var HOME_PAGE = "http://ggns2wfs01:81/appedia1/home.php";
var TAXI_PAGE = "http://ggns2wfs01:81/taxihelpdesk/user.php";
var cookies;
console.log('The default user agent is ' + page.settings.userAgent);
page.settings.userAgent = 'SpecialAgent';
/**
 * Open Login page and register listener for onUrlChanged.
 */
page.onUrlChanged = function (data) {
    console.log(data);
    if (data == "http://ggns2wfs01:81/appedia1/home.php") {
        console.log("open taxi page.");
        openTaxiPage(TAXI_PAGE);
    }
};
page.onError = function (data) {
    console.log(data);
}
page.onConsoleMessage = function (data) {
    console.log("*************************** console msg ***************************");
    console.log(data);
}
page.open('http://ggns2wfs01:81/appedia1/index.php', function (status) {
    console.log(status);
    if (status !== 'success') {
        console.log('Unable to access network');
    } else {
        cookies = page.cookies;
        for (var i in cookies) {
            console.log(i);
            console.log(cookies[i].name + '=' + cookies[i].value);
        }
        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function () {
            page.evaluate(function () {
                $('#nav').val("<emp_id>");
                $('#pas').val("<password>");
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

function openTaxiPage(taxiPage) {
    console.log(taxiPage);
    page = require('webpage').create();
    cookies = page.cookies;
    /**
     * Setting listeners.
     * @param data
     */
    page.onUrlChanged = function (data) {
        console.log(data);
        if (data == "http://ggns2wfs01:81/appedia1/home.php") {
            console.log("open taxi page.");
            openTaxiPage(TAXI_PAGE);
        }
    };
    page.onError = function (data) {
        console.log(data);
    }
    page.onConsoleMessage = function (data) {
        console.log("*************************** console msg ***************************");
        console.log(data);
    }


    for (var i in cookies) {
        console.log(i);
        console.log(cookies[i].name + '=' + cookies[i].value);
    }
    phantom.addCookie(cookies);
    page.open(taxiPage, function (status) {
            if (status != "success") {
                console.log(status);
                console.log(page);
            } else {
                console.log("Taxi page loaded successfully.");
                page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function () {
                        page.evaluate(function () {
                            var PRJ_NAME = "HNSJTL01";
                            var SOPT_CAB_8PM = "s";
                            var DESTINATION = "ggn Malibu town";
                            var CAB_TYPE = "1";
                            $('#project').val(PRJ_NAME);
                            $('#purpose').val(SOPT_CAB_8PM);
                            $('#address').val(DESTINATION);
                            $('#type_code').val(CAB_TYPE);
                            $('#project').trigger("change");
                            console.log("Value setting done");
                            $(".inputbtn3").click(function () {
                                console.log("click calling");
                                console.log($('#project').val());
                                console.log($('#purpose').val());
                                console.log($('#address').val());
                                console.log($('#type_code').val());
                            });
                            $(".inputbtn3").click();
                        });
                    }
                )
                ;
            }
        }
    )
    ;
}