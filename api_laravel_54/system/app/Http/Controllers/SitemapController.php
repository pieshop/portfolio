<?php


namespace App\Http\Controllers;

use Illuminate\Routing\Controller;

use App\Models\Sitemap;

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
