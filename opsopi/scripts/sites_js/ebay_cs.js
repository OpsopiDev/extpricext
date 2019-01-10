function isProductPage() {
    if (($('#Body[itemtype="http://schema.org/Product"]').length > 0) || ($('#Body[itemtype="https://schema.org/Product"]').length > 0)) {
        return true;
    } else {
        return false;
    }
}

function getPageDeets() {
    var cssLocs = {
        eb: {
            title: '#itemTitle',
            bracktitle: '',
            price: 'div.vi-price span[itemprop="price"]',
            price_alt: 'div.vi-price span[itemprop="price"]',
            pricealert: 'div.vi-price',
            category: '#bc #vi-VR-brumb-lnkLst li.bc-w:eq(0) a',
            category_alt: '#bc #vi-VR-brumb-lnkLst li.bc-w:eq(1) a',
            prod_img: '#mainImgHldr #icImg',
            pid: '#vi-desc-maincntr  div.iti-act-num'
        }
    }

    function tittlyFind(contents_arr, parse_type) {
        var tittly_val = '';
        $.each(contents_arr, function () {
            if ((this.nodeType === 3) && $.trim($(this).text()) != '') {
                tittly_val += ' ' + $.trim($(this).text());
            }
        });
        return tittly_val;
    }

    function textFind(contents_arr, parse_type) {
        var price_val = '';
        $.each(contents_arr, function () {
            if ((this.nodeType === 3) && $.trim($(this).text()) != '') {
                price_val += ' ' + $.trim($(this).text());
            }
        });
        return cleanPrice(price_val, parse_type);
    }

    function cleanPrice(in_str, parse_type) {
        if (in_str == undefined || in_str == '') {
            return '';
        }
        parse_type = typeof parse_type !== 'undefined' ? parse_type : 0;
        var clean_price_str = $.trim(in_str.replace(/us\.*|\*|\,|\:/gi, ''));
        clean_price_str = clean_price_str.replace(/[$]/g, "");
        if (parse_type == 0) {
            clean_price_str = clean_price_str.split(/\s+/g)[0];
        } else if (parse_type == -1) {
            clean_price_str = clean_price_str.split(/\s+/g).pop();
        } else {
            clean_price_str = clean_price_str.split(/\s+/g)[parse_type];
        }
        if (isNaN(parseFloat(clean_price_str))) {
            return clean_price_str.split("").filter(function (each) {
                if (!isNaN(each) || (each == '.')) {
                    return each;
                }
            }).join('');
        } else {
            return clean_price_str;
        }
    }

    function getProdTitle() {
        var title = $.trim(tittlyFind($(cssLocs.eb.title).contents()));
        title = title ? title : "";
        return title;
    }

    function getCategoryFromCrumbs() {
        var breadcrumb_list = $("[itemtype='https://schema.org/BreadcrumbList'] li a");
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
        var price = "";
        var chk_price = textFind($(cssLocs.eb.price).contents());
        if (chk_price == '') {
            price = textFind($(cssLocs.eb.price_alt).contents());
        } else {
            price = cleanPrice(chk_price);
        }
        price = parseFloat(price);
        price = price ? price : "";
        return price;
    }

    function getProductId() {
        var pid = "";
        pid = $('#vi-desc-maincntr  div.iti-act-num').text();
        return pid ? pid : "";
    }

    function getProductImage() {
        var imageSrc = $.trim($(cssLocs.eb.prod_img).attr('src'));
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
            prod_site: "ub",
            prod_mrp: getProdPrice(),
            is_oos: getOOSstate(),
            backsearch_site: true
        }
        return pageDeets;
    }
    return getDeets();
}
if (isProductPage()) {
    update_data_for_spa(getPageDeets());
}