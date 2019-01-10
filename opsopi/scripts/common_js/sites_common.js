
function backPostGet(json_obj) {
    var deferredObject = $.Deferred();
    chrome.runtime.sendMessage({
        method: "backPostGet",
        key: json_obj
    }, function(response) {
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

function escapeRegExp(stringToGoIntoTheRegex) {
    return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}