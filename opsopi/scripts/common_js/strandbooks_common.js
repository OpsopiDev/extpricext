function back_search_sb(prod_deets) {

    var search_term = prod_deets.prod_title;

    if (prod_deets.book_page) {
        search_term = prod_deets.prod_srch;
    }


    var searchURL = "https://www.strandbooks.com/index.cfm?fuseaction=search.results&includeOutOfStock=0&searchString=" + encodeURIComponent(search_term);
    var dyn_req = backPostGet({
        type: "GET",
        url: searchURL
    });
    dyn_req.done(function(response) {
        var extracted_deets = extract_result(response);
        if (extracted_deets.is_found && title_filter(prod_deets.prod_title, extracted_deets.title)) {
            insert_price_result_box(make_results_box(extracted_deets, 'searchid', false));
        } else {
            // nothing found
            // insert manual search
            insert_manual_search_box(make_manual_search_box({
                "prod_site": "sb",
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

        if (resp_elem_wm.find(".product-summary").length > 0) {


            var results = resp_elem_wm.find(".product-summary:eq(0)");
            var firstResult = results[0];


            try {
                deets['prod_link'] = $(firstResult).find("a").attr("href");
                deets['title'] = $.trim($(firstResult).find(".product-summary__name").text());
                deets['prod_price'] = parseFloat(($.trim($(firstResult).find(".price span").text())).replace(/[\s$,]/g, ''));
                deets['website'] = 'sb';
                deets['prod_site'] = 'strandbooks';
                deets['img_src'] = $(firstResult).find("img").attr("src");

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