var prod_site_list = {
    "ba": "Barneys",
    "as": "Asos",
    "hm": "H&M",
    "ns": "Nordstrom",
    "ms": "Macys",
    "ft": "forever21",
    "mc": "Modcloth",
    "nr": "Nordstromrack",
    "sp": "6pm",
    "za": "Zara",
    "ta": "Target",
    "to": "Tobi",
    "ex": "Express",
    "bd": "Bloomingdales",
    "ts": "Topshop",
    "sf": "Saksfifthavenue",
    "ap": "Anthropologie",
    "bc": "Backcountry",
    "fp": "Freepeople",
    "re": "Revolve",
    "bn": "Bastetnoir",
    "ff": "Farfetch",
    "su": "Shopbop",
    "jc": "jcpenny",
    "lu": "Lulus",
    "mw": "madewell",
    "el": "everlane",
    "tl": "threadless",
    "ko": "Kohls",
    "un": "Uniqlo",
    "ga": "Gap",
    "au": "Amazon",
    "uo": "Urbanoutfitters",
    "ae": "American Eagle",
    "at": "Anntaylor",
    "es": "Eshakti",
    "ol": "Oldnavy",
    "bh": "Boohoo",
    "ar": "Aritzia",
    "ls": "landsend",
    "gr": "grana",
    "tf": "thereformation",
    "pm": "poshmark",
    "mg": "mango",
    "le": "levi",
    "tm": "thelimited",
    "lt": "lordandtaylor",
    "ng": "nastygal",
    "ll": "lululemon",
    "tb": "thebay",
    "ac": "abercrombie",
    "se": "shein",
    "ub": "ebay",
    "wm": "walmart",
    "ne": "newegg",
    "os": "overstock",
    "bb": "bestbuy",
    "co": "costco",
    "je": "jet",
    "be": "barnesandnoble",
    "sd": "strandBooks",
    "ab": "alibris",
    "tk": "thriftbooks",
    "po": "powells",
    "ak": "abebooks"
}
var closebox = chrome.extension.getURL('design_files/resources/images/close_box.png');
var closebox_url = 'url(' + closebox + ')';
var shadow_dom_support = "";
if (document.head.attachShadow) {
    shadow_dom_support = "v1";
} else if (document.head.createShadowRoot) {
    shadow_dom_support = "v0";
} else {
    shadow_dom_support = "not supported";
}
var url_params = window.location.search.replace('?', '').split('&').reduce(function (s, c) {
    var t = c.split('=');
    s[t[0]] = t[1];
    return s;
}, {});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.method == "get_hostname") {
        sendResponse({
            hostname: window.location.hostname,
            origin: window.location.origin
        });
    }
})

function backPostGet(json_obj) {
    var deferredObject = $.Deferred();
    chrome.runtime.sendMessage({
        method: "backPostGet",
        key: json_obj
    }, function (response) {
        if (response.status) {
            if (response.req == 'succ') {
                deferredObject.resolve(response.data, response.text_status, response.jq_xhr);
            } else {
                deferredObject.reject(response.jq_xhr, response.text_status, response.error);
            }
        }
    });
    return deferredObject.promise();
}