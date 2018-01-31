<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

use App\Models\Category;

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
}
