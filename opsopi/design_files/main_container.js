var template_main_container =
`
<template id="main_template_dock_left">


    <link id="fa_style" rel="stylesheet" href="">
    <link id ="main_css_style" rel="stylesheet" href="">
    
    <style class="fa_style"></style>
    <style class="main_css_style"></style>

    <div id="mc_root">

        <div id="results_view_root" style="max-width:330px; display:none; font-size:16px;">
            <!-- main content tab -->
            <div class="extension-tab expand-tab exclusive-tab p-b-0" style="background-color:white; z-index:50000; padding:0px; float:none; margin-top: 0px; max-width:330px;">
                <div class="row" style="padding: 10px 8px;">
                    <div class="set-flex" style="width:320px; justify-content: space-between;">
                        <div style="padding:5px;">
                            <a id="green_arrow" href="javascript:;" title="Close"> <img src="resources/images/arrow-green.png"></a>    
                        </div>

                        <div style="padding:5px;">
                            <a class="options_button" href="javascript:;" title=" Knobs and dials to tailor OPSOPI"><span class="fa fa-cog"></span></a>
                            <a class="tutorial_button" href="javascript:;" title=" Help! A list of all our features"><span class="fa fa-question-circle"></span></a>
                            <div class="dropdown-menu" style="float:none; margin-left:5px; position:static; display:inline-block;">
                                <a id ="dock_main" href="javascript:;" title="  See OPSOPI results on the left, right, top, or bottom">
                                    <span class="fa fa-sort-desc"></span>
                                    <img src="resources/images/icons3.png">
                                </a>
                                <ul style="margin:auto; right:auto;">
                                    <li>
                                        <a id="dock_row_1" href="javascript:;"><img src="resources/images/icons2.png"></a>
                                    </li>
                                    <li>
                                        <a id="dock_row_2" href="javascript:;">
                                            <img src="resources/images/icons1.png">
                                        </a>
                                    </li>
                                    <li>
                                        <a id="dock_row_3" href="javascript:;">
                                            <img src="resources/images/icons0.png">
                                        </a>
                                    </li>
                                    <li>
                                        <a id="dock_row_4" href="javascript:;">
                                            <img src="resources/images/icon4.png">
                                        </a>
                                    </li>
                                    <li style="display:none;">
                                        <a id="dock_row_5" href="javascript:;">
                                            <img src="resources/images/icon4.png">
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        
         

                    </div>
                </div>

                <div id="results_container" class="saved-items reverse-content r-m-0" style="height:305px; overflow-y:scroll; margin-right:0px;">
                    <!-- insert results here -->
                    <div id="exclusive"></div>
                    <div id="price_results" style="padding-left:10px;"></div>
                    <div id="oos"></div>
                    <div id="manual_search"></div>
                </div>

            </div> <!-- ext tab -->

        </div> <!-- result view container -->
        
    </div>  <!-- mc root -->
  
</template>


<template id="main_template_dock_top">
    
    <link id="fa_style" rel="stylesheet" href="">
    <link id ="main_css_style" rel="stylesheet" href="">
    <link id ="owl_css_style" rel="stylesheet" href="">

    <style class="fa_style"></style>
    <style class="main_css_style"></style>
    <style class="owl_css_style"></style>


    <div id="mc_root">
        <div id="results_view_root" style="display:none; font-size:16px;">

           <div class="extension-tab extension-max extension-top" style="background-color:white; z-index:50000; padding-bottom:14px;">
                    <div class="row">
                        <div class="set-flex">
                            <div class="one-fifth text-left">
                                <a id="green_arrow" href="javascript:;" title="Close"> <img src="resources/images/arrow-green.png" class="move-top"></a>
                            </div>
                            <div class="three-fifth">
                                <h1 class="main-price">
                                    <span></span>
                                </h1>
                            </div>

                            <div class="one-fifth">

                                <a class="options_button" href="javascript:;" title=" Knobs and dials to tailor OPSOPI"><span class="fa fa-cog"></span></a>
                                <a class="tutorial_button" href="javascript:;" title="Help! A list of all our features"><span class="fa fa-question-circle"></span></a>
                                <div class="dropdown-menu" style="margin-left:5px;">
                                    <a id ="dock_main" href="javascript:;" title=" See OPSOPI results on the left, right, top, or bottom">
                                        <span class="fa fa-sort-desc"></span>
                                        <img src="resources/images/icons3.png">
                                    </a>
                                    <ul>
                                        <li>
                                            <a id="dock_row_1" href="javascript:;"><img src="resources/images/icons2.png"></a>
                                        </li>
                                        <li>
                                            <a id="dock_row_2" href="javascript:;">
                                                <img src="resources/images/icons1.png">
                                            </a>
                                        </li>
                                        <li>
                                            <a id="dock_row_3" href="javascript:;">
                                                <img src="resources/images/icons0.png">
                                            </a>
                                        </li>
                                        <li>
                                            <a id="dock_row_4" href="javascript:;">
                                                <img src="resources/images/icon4.png">
                                            </a>
                                        </li>
                                        <li style="display:none;">
                                            <a id="dock_row_5" href="javascript:;">
                                                <img src="resources/images/icon4.png">
                                            </a>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div  class="products saved-items">
                        <div id="price_results" class="owl-carousel">
                        </div>
                    </div>
                    
                    <div id="results_container" style="display:none">
                        <div id="exclusive"></div>
                        <div id="price_results"></div>
                        <div id="oos"></div>
                        <div id="manual_search"></div>
                    </div>
            </div>
        </div> <!-- result_view_root -->
    </div> <!-- mc_root -->

</template>


<template id="main_template_dock_bot">
    
    <link id="fa_style" rel="stylesheet" href="">
    <link id ="main_css_style" rel="stylesheet" href="">
    <link id ="owl_css_style" rel="stylesheet" href="">

    <style class="fa_style"></style>
    <style class="main_css_style"></style>
    <style class="owl_css_style"></style>

    <div id="mc_root">
        <div id="results_view_root" style="display:none; font-size:16px;">

           <div class="extension-tab extension-max extension-top" style="background-color:white; z-index:50000; padding-top:14px;">
                
                <div  class="products saved-items">
                    <div id="price_results" class="owl-carousel">
                    </div>
                </div>
                
                <div id="results_container" style="display:none">
                    <div id="exclusive"></div>
                    <div id="price_results"></div>
                    <div id="oos"></div>
                    <div id="manual_search"></div>
                </div>

              <div class="row" style="padding-top:5px;">
                    <div class="set-flex">
                        <div class="one-fifth text-left">
                            <a id="green_arrow" href="javascript:;" title="Close"> <img src="resources/images/arrow-green.png" style="position: relative; top: 11.5px; transform:rotate(-90deg);"></a>
                        </div>
                        <div class="three-fifth">
                            <h1 class="main-price">
                                <span></span>
                            </h1>
                        </div>
                        <div class="one-fifth">
                            <a class="options_button" href="javascript:;" title=" Knobs and dials to tailor OPSOPI"><span class="fa fa-cog"></span></a>
                            <a class="tutorial_button" href="javascript:;" title="Help! A list of all our features"><span class="fa fa-question-circle"></span></a>
                            <div class="dropdown-menu" style="margin-left:5px;">
                                <a id ="dock_main" href="javascript:;" title="See OPSOPI results on the left, right, top, or bottom">
                                    <span class="fa fa-sort-asc"></span>
                                    <img src="resources/images/icons3.png">
                                </a>
                                <ul style="top:-170px;">
                                    <li>
                                        <a id="dock_row_1" href="javascript:;"><img src="resources/images/icons2.png"></a>
                                    </li>
                                    <li>
                                        <a id="dock_row_2" href="javascript:;">
                                            <img src="resources/images/icons1.png">
                                        </a>
                                    </li>
                                    <li>
                                        <a id="dock_row_3" href="javascript:;">
                                            <img src="resources/images/icons0.png">
                                        </a>
                                    </li>
                                    <li>
                                        <a id="dock_row_4" href="javascript:;">
                                            <img src="resources/images/icon4.png">
                                        </a>
                                    </li>
                                    <li style="display:none;">
                                        <a id="dock_row_5" href="javascript:;">
                                            <img src="resources/images/icon4.png">
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>    

            </div>
            
        </div> <!-- result_view_root -->
    </div> <!-- mc_root -->

</template>

`