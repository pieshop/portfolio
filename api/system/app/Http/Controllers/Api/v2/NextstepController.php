<?php

namespace App\Http\Controllers\Api\v2;

use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\Models\api_v2\Nextstep;


class NextstepController extends Controller
{

	public function __construct()
	{
		$this->middleware('cors');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int $id
	 * @return Response
	 */

	public function show($id)
	{
		$result = Nextstep::get_data($id);
		Log::info('load: ' . $result);
		return $result;
	}

	public function save(Request $request)
	{
		if ($request->isMethod('post')) {
			$result = Nextstep::save_data($request->id, $request->data);
			Log::info('save: ' . $result);
			return $result;
//			return response()->json($request->data);
		}


	}
}
