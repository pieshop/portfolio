<?php

namespace App\Http\Controllers\Api\v2;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\api_v2\Category;

class CategoryController extends Controller {

	public function __construct()
	{
		$this->middleware('cors');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param string $year
	 * @return Response
	 */
	public function index($year = 'allyears')
	{
		return Category::get_categories($year);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int $id
	 * @param string $year
	 * @return Response
	 */

	public function show($id, $year = 'allyears')
	{
		$filtered = false;
		return Category::get_items($id, $year, $filtered);
	}

	public function show_filtered($id, $year = 'allyears')
	{
		$filtered = true;
		return Category::get_items($id, $year, $filtered);
	}

	public function active_categories_by_year()
	{
		$filtered = false;
		return Category::get_active_categories_by_year($filtered);
	}

	public function active_categories_by_year_filtered()
	{
		$filtered = true;
		return Category::get_active_categories_by_year($filtered);
	}
}
