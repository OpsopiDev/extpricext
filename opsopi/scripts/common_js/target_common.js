function back_search_ta(prod_deets) {
    var searchURL = "http://redsky.target.com/v1/plp/search?kwr=y&keyword=" + encodeURIComponent(prod_deets.prod_title);
    var dyn_req = backPostGet({
        type: "GET",
        url: searchURL,
        headers: {
            "Accept-Language": "en-US,en;q=0.8",
            "Accept": "application/json, text/javascript, */*; q=0.01"
        }
    });
    dyn_req.done(function (response) {
        var extracted_deets = extract_result(response);
        if (extracted_deets.is_found && title_filter(prod_deets.prod_title, extracted_deets.title)) {
            insert_price_result_box(make_results_box(extracted_deets, 'searchid', false));
        } else {
            insert_manual_search_box(make_manual_search_box({
                "prod_site": "ta",
                "prod_link": "https://www.target.com/s?searchTerm=" + encodeURIComponent(prod_deets.prod_title),
                "website": "target",
                "title": prod_deets.prod_title,
                "img_src": prod_deets.prod_img
            }, "searchid"));
        }
    })

    function extract_result(response) {
        if (response.search_response.items.Item.length > 0) {
            var deets = {};
            try {
                var firstResult = response.search_response.items.Item[0];
                var resLink = "https://www.target.com" + firstResult.url;
                var resImage = firstResult.images[0].base_url + firstResult.images[0].primary;
                var resTitle = firstResult.title;
                var minPrice = firstResult.offer_price.min_price;
                var maxPrice = firstResult.offer_price.max_price;
                var justPrice = firstResult.offer_price.price;
                var resPrice = justPrice;
                if (justPrice <= 0) {
                    if (minPrice > 0) {
                        resPrice = minPrice;
                    } else {
                        resPrice = maxPrice;
                    }
                }
                deets['prod_link'] = resLink;
                deets['title'] = resTitle;
                deets['prod_price'] = resPrice;
                deets['website'] = 'ta';
                deets['prod_site'] = 'ta';
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