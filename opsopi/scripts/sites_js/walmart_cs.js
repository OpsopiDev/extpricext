function isProductPage() {
    if (window.location.href.match("/ip/")) {
        return true;
    } else {
        return false;
    }
}

function getPageDeets() {
    function getProdTitle() {
        var title = $(".prod-ProductTitle").text();
        title = title ? title : "";
        return title;
    }

    function getCategoryFromCrumbs() {
        var breadcrumb_list = $(".breadcrumb-list  a");
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
        var priceRaw = ""
        if ($(".prod-PriceHero .Price-group [itemprop='price']").length > 0) {
            priceRaw = $(".prod-PriceHero .Price-group [itemprop='price']").attr('content');
        } else if ($(".prod-PriceHero [itemprop='price']").length > 0) {
            priceRaw = $(".prod-PriceHero [itemprop='price']").attr('content');
        }
        var price = "";
        if (priceRaw) {
            parseFloat(priceRaw.replace("$", "").replace(/[\s$,]/g, ''));
        }
        price = price ? price : "";
        return price;
    }

    function getProductId() {
        var pid = "";
        pid = $('[itemprop="sku"]').attr("content");
        return pid ? pid : "";
    }

    function getProductImage() {
        var imageSrc = $(".prod-HeroImage img").attr('src');
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
            prod_site: "wm",
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