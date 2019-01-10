var default_sites = ["www.amazon.com", "www.bestbuy.com", "www.costco.com", "www.ebay.com", "www.jet.com", "www.newegg.com", "www.overstock.com", "www.target.com", "www.walmart.com", "www.abebooks.com", "www.alibris.com", "www.barnesandnoble.com", "www.strandbooks.com", "www.thriftbooks.com"];
$(document).ready(function () {
    chrome.runtime.sendMessage({
        method: "get_site_name"
    }, function (response) {
        if (response.hostname) {
            var hostname = response.hostname;
            var origin = response.origin;
            chrome.storage.local.get({
                "request_sent_sites": []
            }, function (storage_response) {
                if (storage_response.request_sent_sites.length > 0 && storage_response.request_sent_sites.indexOf(response.hostname) > -1) {
                    $("#request_sites").hide();
                } else if (response.hostname == "not_found") {
                    $("#request_sites").hide();
                } else {
                    $("#request_sites").show();
                }
            });
            chrome.storage.local.get({
                "add_site_deets": "",
                "user_added_sites": "",
                "user_added_scripts": []
            }, function (response) {
                var host_name_exist = false;
                if (default_sites.indexOf(hostname) > -1) {
                    host_name_exist = true;
                }
                if (response.add_site_deets && response.add_site_deets.hostname == hostname) {
                    host_name_exist = true;
                }
                if (response && response.user_added_sites) {
                    var user_added_sites = response.user_added_sites;
                    for (var i = 0; i < user_added_sites.length; i++) {
                        if (user_added_sites[i].host_name == hostname) {
                            host_name_exist = true;
                            break;
                        }
                    }
                }
                if (response.user_added_scripts && response.user_added_scripts.indexOf(hostname) > -1) {
                    host_name_exist = true;
                }
                if (hostname == "not_found") {
                    host_name_exist = true;
                }
                if (host_name_exist) {
                    $("#request_sites").hide();
                    $("#add_sites").hide();
                }
            });
        }
    });
    $(document).on("click", "#add_sites", function (e) {
        chrome.runtime.sendMessage({
            "method": "get_site_name"
        }, function (response) {
            if (response.hostname && response.origin) {
                chrome.runtime.sendMessage({
                    "method": "add_site_click",
                    "hostname": response.hostname,
                    "origin": response.origin
                }, function (response) {
                })
            }
        });
    });
    $(document).on("click", "#request_sites", function (e) {
        if (!$("#request_sites").hasClass("request-sent")) {
            $("#request_sites").addClass("request-sent");
            chrome.runtime.sendMessage({
                "method": "request_site_click"
            }, function (resopnse) {
            });
            $.toast({
                "text": "Request sent to add sites",
                "position": "mid-center"
            });
        }
        $("#request_sites").hide();
    });
    $(document).on("click", "#settings", function (e) {
        chrome.runtime.sendMessage({
            method: "showOptionsPage"
        });
    });
});