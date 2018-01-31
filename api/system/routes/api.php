<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//
///*
// * RETRIEVE AVAILABLE CATEGORIES
//*/
//Route::get('categories', [
//				'uses' => 'CategoryController@index',
//		]
//);
//
///*
// * CATEGORY (year, id)
//*/
//Route::get('categories/{id}/{year}', [
//				'uses' => 'CategoryController@show',
//		]
//);
//
//Route::get('categories/filtered/{id}/{year}', [
//				'uses' => 'CategoryFilteredController@show',
//		]
//);
//
///*
// * ITEMS
//*/
//Route::get('items/{id}', [
//				'uses' => 'ItemController@show',
//		]
//);
//
///*
// * SITEMAP
//*/
//Route::get('sitemap', [
//				'uses' => 'SitemapController@index',
//		]
//);
//
//Route::get('sitemap.xml', [
//				'uses' => 'SitemapController@index',
//		]
//);