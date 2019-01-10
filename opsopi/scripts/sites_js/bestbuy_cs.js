function isProductPage() {
    if ($("#pdp-content").length > 0) {
        return true;
    } else {
        return false;
    }
}

function getPageDeets() {
    function getProdTitle() {
        var title = $("#sku-title").text();
        if (!title) {
            title = $(".sku-title").text()
        }
        title = title ? title : "";
        return title;
    }

    function getCategoryFromCrumbs() {
        var breadcrumb_list = $("#breadcrumb-list li  a");
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
        var priceRaw = $(".pb-purchase-price").text();
        var price = parseFloat(priceRaw.replace("$", "").replace(",", "").replace(/[\s$,]/g, ''));
        price = price ? price : "";
        return price;
    }

    function getProductId() {
        var pid = "";
        pid = $("#sku-value").text();
        return pid ? pid : "";
    }

    function getProductImage() {
        var imageSrc = $(".primary-image ").attr('src');
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
            prod_site: "bb",
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