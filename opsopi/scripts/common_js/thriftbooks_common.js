function back_search_tk(prod_deets) {
    var search_term = prod_deets.prod_title;
    if (prod_deets.book_page) {
        search_term = prod_deets.prod_srch;
    }
    var searchURL = "https://www.thriftbooks.com/browse/?b.search=" + encodeURIComponent(search_term);
    var dyn_req = backPostGet({
        type: "GET",
        url: searchURL
    });
    dyn_req.done(function (response) {
        var extracted_deets = extract_result(response);
        if (extracted_deets.is_found && title_filter(prod_deets.prod_title, extracted_deets.title)) {
            insert_price_result_box(make_results_box(extracted_deets, 'searchid', false));
        } else {
            insert_manual_search_box(make_manual_search_box({
                "prod_site": "tk",
                "prod_link": searchURL,
                "website": "strandbooks",
                "title": prod_deets.prod_title,
                "img_src": prod_deets.prod_img
            }, "searchid"));
        }
    })

    function extract_result(response) {
        var resp_elem_wm = $('<div/>').append($.parseHTML(response));
        var deets = {};
        if (resp_elem_wm.find(".Search-results-container").length > 0) {
            var results = resp_elem_wm.find(".Search-results-container a:eq(0)");
            var firstResult = results[0];
            try {
                deets['prod_link'] = $(firstResult).attr("href");
                if (!deets['prod_link'].startsWith("https://")) {
                    deets['prod_link'] = "https://www.thriftbooks.com/" + deets['prod_link'];
                }
                deets['title'] = $.trim($(firstResult).find(".SearchResultGridItem-title").text());
                deets['prod_price'] = parseFloat($(firstResult).find(".SearchResultGridItem-price").text().split("-")[0].replace(/[\s$,]/g, ''));
                deets['website'] = 'tk';
                deets['prod_site'] = 'thriftbooks';
                deets['img_src'] = $(firstResult).find("img").attr("src");
                deets['is_found'] = true;
            } catch (err) {
                console.log(err);
                deets['is_found'] = false;
            }
        } else if (resp_elem_wm.find(".WorkContainer").length > 0) {
            try {
                deets['prod_link'] = resp_elem_wm.find("link[rel='canonical']").attr("href");
                if (!deets['prod_link'].startsWith("/w/")) {
                    deets['prod_link'] = "https://www.thriftbooks.com/w" + deets['prod_link'].split("www.thriftbooks.com")[1];
                }
                deets['title'] = $.trim(resp_elem_wm.find("h1[itemprop='name']").text());
                deets['prod_price'] = parseFloat(resp_elem_wm.find(".price").text().replace(/[\s$,]/g, ''));
                deets['website'] = 'tk';
                deets['prod_site'] = 'thriftbooks';
                deets['img_src'] = resp_elem_wm.find("[itemprop='image']").attr("src");
                deets['is_found'] = true;
            } catch (err) {
                console.log(err);
                deets['is_found'] = false;
            }
        }
        if (!(deets['prod_link'] && deets['title'] && deets['prod_price'] && deets['website'])) {
            deets['is_found'] = false;
        }
        return _.clone(deets);
    }
}