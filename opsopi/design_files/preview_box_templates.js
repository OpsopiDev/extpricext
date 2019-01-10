var template_preview_box = 
`
<template id="loading_template">
    <div id="preview_root" style="max-width:150px;">
        <div class="pop-up center-content" style="background-color: white;">
                <div id="pv_makkhi_logo" class="set-flex">
                    <img src="resources/images/logo.png">
                    <span class="beacon msg" style="position:relative; right:0px; top:-5px; visibility: hidden; cursor: pointer;" title="You have a new message from OPSOPI! Please click here"></span>
                </div>
                <div id="pv_prod_image" class="set-flex">
                    <img src="resources/images/laptop.jpg" class="full-image">
                </div>
                <div class="set-flex">
                    <h3>
                        Fetching products
                    </h3>
                </div>
                <div class="set-flex">
                    <div id="pv_load_image" class="popup">
                        <img src="resources/images/spinner.png" class="spinner">
                    </div>
                </div>
        </div>
    </div>
</template>


<template id="price_update_template">
    <div class="pop-up center-content" style="background-color: white;">
        <div id ="pv_makkhi_logo" class="set-flex">
            <img src="resources/images/logo.png">
           <span class="beacon msg" style="position:relative; right:0px; top:-5px; visibility: hidden; cursor: pointer;" title="You have a new message from OPSOPI! Please click here"></span>
        </div>
        <div id="pv_prod_image" class="set-flex">
            <img src="resources/images/laptop.jpg" class="full-image">
        </div>
        <div class="set-flex">
            <h1 id="pv_prod_price" class="title"> $ 24,900 </h1>
        </div>
    </div>
</template>




<template id ="preview_mini_box">
    <div id="preview_min_root" style="margin:auto; display:none; z-index: 99999; cursor:move;" title="Drag to Move and Click to see Results">

        <div id = "price_track_style">
            <div class="pop-up" style="background-color:white; margin-top:0px;">
                <a style="display:none;" id ="pv_popup_close" href="#"><img src="resources/images/popup-close.png"></a>
                <div id ="pv_makkhi_logo" class="set-flex">
                    <img src="resources/images/logo.png">
                    <h2 id="price">
                        $ 67,000
                    </h2>
                </div>
            </div>
        </div>

        <div id="result_style" style="display:none">
           <div class="pop-up" style="background-color:white; margin-top:0px;">
                <a style="display:none;" id ="pv_popup_close" href="#"><img src="resources/images/popup-close.png"></a>
                <div id ="pv_makkhi_logo" class="set-flex">
                    <img src="resources/images/logo.png">
                    <h2 id="price">
                        ₹ 67,000
                    </h2>
                    <div class="popup">
                        <img src="" alt="" style="display: none">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
`