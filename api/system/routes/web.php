<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});


Route::group(['prefix' => 'api/v1'], function () {
    /*
     * RETRIEVE AVAILABLE CATEGORIES
    */
    Route::get('available_categories/{year?}', 'Api\v1\CategoryController@index');
    /*
     * CATEGORY (year, id)
    */
    Route::get('categories/{id}/{year?}', 'Api\v1\CategoryController@show');

    Route::get('filtered_categories/{id}/{year?}', 'Api\v1\CategoryController@show_filtered');
    /*
     * ITEMS
    */
    Route::get('items/{id}', 'Api\v1\ItemController@show');
    /*
     * SITEMAP
    */
    Route::get('sitemap', 'Api\v1\SitemapController@index');
    Route::get('sitemap.xml', 'Api\v1\SitemapController@index');
});

Route::group(['prefix' => 'api/v2'], function () {
    /*
     * RETRIEVE AVAILABLE CATEGORIES
    */
    Route::get('available_categories/{year?}', 'Api\v2\CategoryController@index');

    /*
     * RETRIEVE ACTIVE CATEGORIES BY ALL YEARS
     * active_categories_by_year
     */
	Route::get('active_categories_by_year', 'Api\v2\CategoryController@active_categories_by_year');

	Route::get('filtered_active_categories_by_year', 'Api\v2\CategoryController@active_categories_by_year_filtered');

    /*
     * CATEGORY (year, id)
    */
    Route::get('categories/{id}/{year?}', 'Api\v2\CategoryController@show');

    Route::get('filtered_categories/{id}/{year?}', 'Api\v2\CategoryController@show_filtered');
    /*
     * ITEMS
    */
    Route::get('item/{id}', 'Api\v2\ItemController@show');
    /*
     * SITEMAP
    */
    Route::get('sitemap', 'Api\v2\SitemapController@index');
    Route::get('sitemap.xml', 'Api\v2\SitemapController@index');
    /*
     * Test nextstep data save (as json file), load (as json)
    */
    Route::get('game_data/{id}', 'Api\v2\NextstepController@show');
    Route::post('game_data', 'Api\v2\NextstepController@save');
//    Route::post('save_game_data', function (\Illuminate\Http\Request $request)
//    {
//        if ($request->isJson()) {
//            $data = $request->json()->all();
//        } else {
//            $data = $request->all();
//        }
//        echo $data;
//    });
});


/*
 * RETRIEVE AVAILABLE CATEGORIES
*/
Route::get('available_categories/{year?}', 'CategoryController@index');
/*
 * CATEGORY (year, id)
*/
Route::get('categories/{id}/{year?}', 'CategoryController@show');

Route::get('filtered_categories/{id}/{year?}', 'CategoryController@show_filtered');
/*
 * ITEMS
*/
Route::get('items/{id}', 'ItemController@show');
/*
 * SITEMAP
*/
Route::get('sitemap', 'SitemapController@index');
Route::get('sitemap.xml', 'SitemapController@index');