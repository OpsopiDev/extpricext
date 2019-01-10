var isdevuse = true;
if (!isdevuse) {
    console.log = function () {};
}
var storage = chrome.storage.local;
var coupons_icon_set = false;
var runtime_message_handler = function (message, sender, sendResponse) {
    if (message.method == "backPostGet") {
        try {
            var req_send = $.ajax(message.key);
            req_send.done(function (data, textStatus, jqXHR) {
                sendResponse({
                    status: true,
                    req: "succ",
                    data: data,
                    text_status: textStatus,
                    jq_xhr: jqXHR
                });
            });
            req_send.fail(function (jqXHR, textStatus, errorThrown) {
                sendResponse({
                    status: true,
                    req: "fail",
                    error: errorThrown,
                    text_status: textStatus,
                    jq_xhr: jqXHR
                });
            });
        } catch (err) {
            sendResponse({
                status: false
            });
        }
    } else if (message.method == "showOptionsPage") {
        try {
            var options_page = "chrome-extension://" + chrome.runtime.id + "/options_page/options.html";
            chrome.tabs.create({
                url: options_page
            });
        } catch (err) {}
    } else if (message.method == "save_makkhi_min_pos") {
        try {
            var kl = "mmpos_" + message.site + "left";
            var kt = "mmpos_" + message.site + "top";
            var wh = "mmpos_" + message.site + "wh";
            var ww = "mmpos_" + message.site + "ww";
            var store_coords = {};
            store_coords[kl] = message.left;
            store_coords[kt] = message.top;
            store_coords[wh] = message.wh;
            store_coords[ww] = message.ww;
            chrome.storage.local.set(store_coords);
        } catch (err) {
            console.log(err);
            sendResponse({});
        }
    } else if (message.method == "get_mmpos") {
        try {
            var kl = "mmpos_" + message.site + "left";
            var kt = "mmpos_" + message.site + "top";
            var wh = "mmpos_" + message.site + "wh";
            var ww = "mmpos_" + message.site + "ww";
            chrome.storage.local.get([kl, kt, wh, ww], function (response) {
                if (chrome.runtime.lastError) {
                    sendResponse({
                        "state": "error"
                    });
                } else {
                    sendResponse({
                        "state": "ok",
                        pos_left: response[kl],
                        pos_top: response[kt],
                        win_height: response[wh],
                        win_width: response[ww]
                    });
                }
            });
        } catch (err) {
            console.log(err);
            sendResponse({
                "state": "error"
            });
        }
    } else if (message.method == "help_button_click") {
        chrome.tabs.create({
            url: "https://github.com/OpsopiDev/extpricext/blob/master/README.md",
        });
    } else if (message.method == "open_url_in_tab") {
        chrome.tabs.create({
            url: message.url
        });
    } else if (message.method == "test_js_with_title") {
        var iframe = document.querySelector("iframe");
        var send_back_id = 'id-' + Math.random().toString(36).substr(2, 16);
        sandbox_sendback_response[send_back_id] = sendResponse;
        chrome.storage.local.get({
            "curr_user_added_script_ss": ""
        }, function (script_read_resp) {
            var script = script_read_resp["curr_user_added_script_ss"];
            var msg = {
                msg_type: "do_bs_from_script",
                deets: {
                    send_back_id: send_back_id,
                    prod_title: message.prod_title,
                    script: script,
                    site: message.site
                }
            }
            iframe.contentWindow.postMessage(msg, '*');
        });
    } else if (message.method == "do_bs_with_js") {
        var iframe = document.querySelector("iframe");
        var send_back_id = 'id-' + Math.random().toString(36).substr(2, 16);
        sandbox_sendback_response[send_back_id] = sendResponse;
        var script_get_obj = {};
        script_get_obj[message.src_key] = "";
        chrome.storage.local.get(script_get_obj, function (src_read_response) {
            if (src_read_response[message.src_key]) {
                var script = src_read_response[message.src_key];
                var msg = {
                    msg_type: "do_bs_from_script",
                    deets: {
                        send_back_id: send_back_id,
                        prod_title: message.prod_title,
                        script: script,
                        site: message.site
                    }
                }
                iframe.contentWindow.postMessage(msg, '*');
            }
        });
    } else if (message.method == "get_page_detais_from_js") {
        var iframe = document.querySelector("iframe");
        var send_back_id = 'id-' + Math.random().toString(36).substr(2, 16);
        sandbox_sendback_response[send_back_id] = sendResponse;
        var script_key = 'ua_src_pp_' + message.hostname;
        var script_query_obj = {};
        script_query_obj[script_key] = "";
        chrome.storage.local.get(script_query_obj, function (response) {
            if (response[script_key]) {
                var script = response[script_key];
                var msg = {
                    msg_type: "get_page_details_from_html",
                    deets: {
                        send_back_id: send_back_id,
                        hostname: message.hostname,
                        script: script,
                        page_html: message.page_html,
                    }
                }
                iframe.contentWindow.postMessage(msg, '*');
            }
        })
    } else if (message.method == "get_site_name") {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                method: "get_hostname"
            }, function (response) {
                if (response && response.hostname) {
                    sendResponse({
                        hostname: response.hostname,
                        origin: response.origin
                    })
                } else {
                    sendResponse({
                        hostname: "not_found",
                        origin: "not_found"
                    });
                }
            })
        });
    } else if (message.method == "request_site_click") {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                method: "get_hostname"
            }, function (response) {
                if (response && response.hostname) {
                    chrome.storage.local.get({
                        "request_sent_sites": []
                    }, function (storage_response) {
                        if (storage_response.request_sent_sites.indexOf(response.hostname) > -1) {} else {
                            var request_sent_sites = storage_response.request_sent_sites;
                            var req =
                                $.ajax({
                                    "type": "post",
                                    "url": "https://opsopi.appspot.com/requestsite",
                                    "data": JSON.stringify({
                                        "hostname": response.hostname
                                    }),
                                    "timeout": 3000,
                                });
                            req.done(function (ajax_response) {
                                var data = JSON.parse(ajax_response);
                                if (data.isSuccess) {
                                    request_sent_sites.push(response.hostname);
                                    chrome.storage.local.set({
                                        "request_sent_sites": request_sent_sites
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
        sendResponse({
            "isSuccess": true
        });
    } else if (message.method == "add_site_click") {
        if (message.hostname) {
            chrome.tabs.create({
                "url": chrome.runtime.getURL("/add_sites/add_site.html") + "?origin=" + message.origin,
            });
        }
    } else {
        sendResponse({});
    }
    return true;
};
var iframe_to_add = document.createElement('iframe');
iframe_to_add.src = chrome.runtime.getURL("scripts/sandbox.html");
document.querySelector("body").appendChild(iframe_to_add);
var sandbox_sendback_response = {};
window.addEventListener('message', function (event) {
    if (event.data.type == "backpost_parse_response") {
        var sendResponse = sandbox_sendback_response[event.data.send_back_id];
        sendResponse(event.data.res_data);
        delete sandbox_sendback_response[event.data.send_back_id];
    } else if (event.data.type == "SandboxBackPostGet") {
        SandboxBackPostGet(event.data);
    }
});

function SandboxBackPostGet(deets) {
    if (deets.req_obj) {
        try {
            var req_send = $.ajax(deets.req_obj);
            var iframe = document.querySelector("iframe");
            req_send.done(function (data, textStatus, jqXHR) {
                var response = {
                    status: true,
                    req: "succ",
                    data: data,
                    text_status: textStatus,
                    jq_xhr: jqXHR
                }
                var msg = {};
                msg['response'] = JSON.stringify(response);
                msg['req_id'] = deets.req_id;
                msg['msg_type'] = "SandboxBackPostGetBgResponse";
                iframe.contentWindow.postMessage(msg, '*');
            });
            req_send.fail(function (jqXHR, textStatus, errorThrown) {
                var response = {
                    status: true,
                    req: "fail",
                    error: errorThrown,
                    text_status: textStatus,
                    jq_xhr: jqXHR
                };
                var msg = {};
                msg['response'] = JSON.stringify(response);
                msg['req_id'] = deets.req_id;
                msg['msg_type'] = "SandboxBackPostGetBgResponse";
                iframe.contentWindow.postMessage(msg, '*');
            });
        } catch (err) {
            var response = {
                status: false
            };
            var msg = {};
            msg['response'] = JSON.stringify(response);
            msg['req_id'] = deets.req_id;
            msg['msg_type'] = "SandboxBackPostGetBgResponse";
            iframe.contentWindow.postMessage(msg, '*');
        }
    }
}
try {
    chrome.runtime.onMessage.addListener(runtime_message_handler);
} catch (err) {}
try {
    chrome.runtime.onInstalled.addListener(function (deets) {
        if (deets.reason == "install") {
            chrome.tabs.create({
                url: "https://github.com/OpsopiDev/extpricext/blob/master/README.md",
            });
        }
    });
} catch (err) {
    console.log(err);
}
try {
    chrome.tabs.onCreated.addListener(function (tab) {
        chrome.pageAction.show(tab.id);
    });
} catch (err) {
    console.log(err);
}
try {
    chrome.tabs.onUpdated.addListener(function (tabId) {
        chrome.pageAction.show(tabId);
    });
} catch (err) {
    console.log(err);
}
chrome.pageAction.onClicked.addListener(function (tab) {});

function clean_add_Sites() {
    chrome.storage.local.remove(["add_site_deets", "curr_user_added_script_pp", "curr_user_added_script_ss"], function () {});
}