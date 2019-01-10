function isProductPage() {
    if (window.location.href.match("product.html")) {
        return true;
    } else {
        return false;
    }
}

function getPageDeets() {
    function getProdTitle() {
        var title = $.trim($("#productTitle h1").text());
        title = title ? title : "";
        return title;
    }

    function getCategoryFromCrumbs() {
        var breadcrumb_list = $(".breadcrumbs a");
        var crumbs = ""
        for (i = 0; i < breadcrumb_list.length; i++) {
            crumbs += $.trim($(breadcrumb_list[i]).text());
            crumbs += "_";
        }
        if (crumbs) {
            crumbs = crumbs.slice(0, -1);
        }
        crumbs = crumbs ? crumbs : "";
        return crumbs;
    }

    function getProdPrice() {
        var priceRaw = $("#priceSection .dollars").text();
        var price = parseFloat(priceRaw.replace("$", "").replace(/[\s$,]/g, ''));
        price = price ? price : "";
        return price;
    }

    function getProductId() {
        var pid = "";
        var pid_match = window.location.href.match(/\/[\d]+\/product.html/g)
        if (pid_match.length > 0) {
            pid = pid_match[0].replace(/[/]/g, "").replace("product.html", "");
        }
        return pid ? pid : "";
    }

    function getProductImage() {
        var imageSrc = $(".hero-zoom-container img").attr('src');
        return imageSrc ? imageSrc : "";
    }

    function getOOSstate() {
        return false;
    }

    function getDeets() {
        var pageDeets = {
            prod_title: getProdTitle(),
            prod_categ: getCategoryFromCrumbs(),
            prod_price: getProdPrice(),
            prod_link: window.location.href,
            prod_srch: getProdTitle(),
            product_id: getProductId(),
            prod_img: getProductImage(),
            prod_site: "os",
            prod_mrp: getProdPrice(),
            is_oos: getOOSstate(),
            backsearch_site: true
        }
        return pageDeets;
    }
    return getDeets();
}
$(window).on("load", function () {
    if (isProductPage()) {
        update_data_for_spa(getPageDeets());
    }
});