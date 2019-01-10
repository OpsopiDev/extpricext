function back_search_ne(prod_deets) {
    var searchURL = "https://www.newegg.com/Product/ProductList.aspx?Submit=ENE&DEPA=0&Order=BESTMATCH&Description=" + encodeURIComponent(prod_deets.prod_title) + "&N=-1&isNodeId=1";
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
                "prod_site": "ne",
                "prod_link": searchURL,
                "website": "newegg",
                "title": prod_deets.prod_title,
                "img_src": prod_deets.prod_img
            }, "searchid"));
        }
    })

    function extract_result(response) {
        var resp_elem_wm = $('<div/>').append($.parseHTML(response));
        var deets = {};
        if (resp_elem_wm.find('div.items-view div.item-container').length > 0) {
            try {
                var results = resp_elem_wm.find('div.items-view div.item-container');
                var firstResult = results[0];
                var linkItem = $(firstResult).find("a.item-img")[0];
                var resLink = $(linkItem).attr("href");
                var resImage = $($(linkItem).find("img")).attr("src");
                var resTitle = $($(linkItem).find("img")).attr("title");
                var priceItem = $(firstResult).find("li.price-current")[0];
                var dolPrice = $($(priceItem).find("strong")[0]).text().replace(/[$,]/g, "");
                var cenPrice = $($(priceItem).find("sup")[0]).text().replace(/[$,]/g, "")
                var resPrice = (dolPrice + cenPrice).trim().replace(/[$]/g, "")
                deets['prod_link'] = resLink;
                deets['title'] = resTitle;
                deets['prod_price'] = resPrice;
                deets['website'] = 'ne';
                deets['prod_site'] = 'ne';
                deets['img_src'] = resImage;
                deets['is_found'] = true;
            } catch (err) {
                deets['is_found'] = false;
            }
        }
        if (!(deets['prod_link'] && deets['title'] && deets['prod_price'] && deets['website'])) {
            deets['is_found'] = false;
        }
        return _.clone(deets);
    }
}