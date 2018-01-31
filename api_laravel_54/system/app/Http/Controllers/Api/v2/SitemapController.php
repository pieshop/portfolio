<?php


namespace App\Http\Controllers\Api\v2;

use App\Http\Controllers\Controller;

use App\Models\api_v2\Sitemap;

class SitemapController extends Controller
{

	public function __construct()
	{
		$this->middleware('cors');
	}

	/**
	 * Display the specified resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		return Sitemap::get_sitemap();
	}

	public function show()
	{
	}
}
