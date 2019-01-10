function isProductPage() {
    if ($("#bookSearchRed").length > 0) {
        return true;
    }
    return false;
}

function getPageDeets() {
    function getProdTitle() {
        var title = $.trim($(".product-title h1[itemprop='name']").text());
        title = title ? title : "";
        return title;
    }

    function getCategoryFromCrumbs() {
        var breadcrumb_list = $(".a-breadcrumb li a");
        var crumbs = ""
        return crumbs;
    }

    function getProdPrice() {
        var price = "";
        price = "";
        if ($(".price:eq(0) p").contents().length > 0) {
            price = ($($(".price:eq(0) p").contents()[0]).text()).replace(/[\s$,]/g, '')
        }
        price = parseFloat(price);
        price = price ? price : "";
        return price;
    }

    function getProductId() {
        var product_id = "";
        if ($("[itemprop='isbn']").length > 1) {
            product_id = $("[itemprop='isbn']:eq(1)").text();
            product_id = product_id.replace("-", "");
        }
        if (!product_id) {
            if ($(".isbn-link:eq(0)").length > 0) {
                product_id = $(".isbn-link:eq(0)").text();
            }
        }
        var pid = "";
        if (product_id) {
            pid = product_id;
        }
        return pid ? pid : "";
    }

    function getProductImage() {
        var imageSrc = "";
        if ($(".hero-wrap img").length > 0) {
            imageSrc = $(".hero-wrap img").attr("src");
        }
        return imageSrc ? imageSrc : "";
    }

    function getOOSstate() {
        return false;
    }

    function getISbn() {
        var isbn_text = "";
        if ($("[itemprop='isbn']").length > 1) {
            isbn_text = $("[itemprop='isbn']:eq(1)").text();
            if (isbn_text) {
                isbn_text = $.trim(isbn_text).replace("-");
                return isbn_text;
            } else {
                if ($(".isbn-link:eq(0)").length > 0) {
                    isbn_text = $(".isbn-link:eq(0)").text();
                    return isbn_text;
                }
            }
        }
        return "";
    }

    function getDeets() {
        var pageDeets = {
            prod_title: getProdTitle(),
            prod_categ: getCategoryFromCrumbs(),
            prod_price: getProdPrice(),
            prod_link: window.location.href,
            prod_srch: getProductId(),
            product_id: getProductId(),
            prod_img: getProductImage(),
            prod_site: "ab",
            prod_mrp: getProdPrice(),
            is_oos: getOOSstate(),
            backsearch_site: true,
        }
        if (getISbn()) {
            pageDeets['book_page'] = true;
            pageDeets['prod_srch'] = getISbn();
        }
        return pageDeets;
    }
    return getDeets();
}
if (isProductPage()) {
    update_data_for_spa(getPageDeets());
}