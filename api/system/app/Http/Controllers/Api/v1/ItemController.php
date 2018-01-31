<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Routing\Controller;

use App\Models\api_v1\Item;

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
