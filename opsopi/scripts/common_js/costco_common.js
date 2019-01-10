function back_search_co(prod_deets) {
    var searchURL = "https://www.costco.com/CatalogSearch?keyword=" + encodeURIComponent(prod_deets.prod_title) + "&pageSize=96";
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
                "prod_site": "co",
                "prod_link": searchURL,
                "website": "costco",
                "title": prod_deets.prod_title,
                "img_src": prod_deets.prod_img
            }, "searchid"));
        }
    })

    function extract_result(response) {
        var resp_elem_wm = $('<div/>').append($.parseHTML(response));
        var deets = {};
        if (resp_elem_wm.find('div.product-list div.product').length > 0) {
            try {
                var results = resp_elem_wm.find('div.product-list div.product');
                var firstResult = results[0];
                var resData = {};
                var resLink = $($(firstResult).find("a.thumbnail")[0]).attr("href");
                var resImage = $($(firstResult).find("img.img-responsive")[0]).attr("src");
                var resTitle = $($(firstResult).find("p.description")[0]).text().trim();
                var resPrice = $($(firstResult).find("div.price[data-regionNav=\"DEFAULT\"]")[0]).text().trim().replace("$", "");
                deets['prod_link'] = resLink;
                deets['title'] = resTitle;
                deets['prod_price'] = resPrice;
                deets['website'] = 'au';
                deets['prod_site'] = 'au';
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