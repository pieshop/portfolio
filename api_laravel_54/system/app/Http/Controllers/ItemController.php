<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;

use App\Models\Item;

class ItemController extends Controller {

	public function __construct()
	{
		$this->middleware('cors');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */

	public function show($id)
	{
		return Item::get_item($id);
	}
}
