<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;

use App;
use Carbon\Carbon;

class Sitemap extends Model
{
	public static function get_sitemap()
	{
		$today = Carbon::now();
		$update_date = Carbon::createFromFormat('Y-m-d H', '2016-05-25 22')->toDateTimeString();
		$sitemap_baseurl = env('APP_URL', 'https://www.stephenhamilton.co.uk');
		$sitemap = App::make("sitemap");
		//	$sitemap->setCache('laravel.sitemap', 60);

		// check if there is cached sitemap and build new only if is not
		if (!$sitemap->isCached()) {
			// add items to the sitemap (url, date, priority, freq)

			$sitemap->add($sitemap_baseurl . '/category/all/', $update_date, '0.6', 'monthly');

			$categories = Category::get_categories_array();
			foreach ($categories as $category) {
				$category_name = $category->category_name;
				$url = $sitemap_baseurl . '/category/' . $category_name . '/';
				$sitemap->add($url, $update_date, '0.6', 'monthly');
			}
			$sitemap->add($sitemap_baseurl . '/about', $update_date, '0.6', 'monthly');

			// TODO :: add has_archive to database and use it to generate archive links in sitemap.xml

			$is_prod = app()->environment('production');
			$entries = DB::table('entries')
					->where('entry_isactive', '=', '1')
					->where(function ($query) use ($is_prod) {
						// use this on live to filter out nda entries
						if ($is_prod == TRUE) {
							$query->where('entry_isnda', '=', '0');
						}
					})
					->orderBy('entry_year', 'desc')
					->orderBy('entry_week', 'desc')
					->get();

			// https://www.v9seo.com/blog/2011/12/27/sitemap-xml-why-changefreq-priority-are-important/
			// 0.8-1.0: Homepage, subdomains, product info, major features
			// 0.4-0.7: Articles and blog entries, category pages, FAQs
			// 0.0-0.3: Outdated news, info that has become irrelevant
			//
			// PRIORITY ALGORITHM
			// range = now - base_year
			// priority = (year - base_year / range )
			// priority as percent = (year - base_year / range ) * 100

			$base_year = 1999;
			$now_year = $today->year + 1;
			$range = $now_year - $base_year;

			foreach ($entries as $entry) {
				$entry_key = $entry->entry_key;
				$entry_id = $entry->entry_id;
				$modified_time = $entry->ModifiedTime;

				$priority = round((($entry->entry_year - $base_year) / $range)*100)/100; // priority between 0 and 1
				$priority = max(0, round($priority * 70)/100); // adjust range to 0 - 0.7, flooring at 0 for dates pre $base_year

				$client_key = 'undefined';

				$client = DB::table('clients')
						->join('entries_clients', 'clients.client_id', '=', 'entries_clients.client_id')
						->where('entries_clients.entry_id', '=', $entry_id)
						->get();
				if (count($client) > 0) {
					$client_key = $client[0]->client_key;
				}

				$url = $sitemap_baseurl . '/item/' . $client_key . '/' . $entry_key;
				$sitemap->add($url, $modified_time, $priority, 'monthly');
			}
		}
		return $sitemap->render('xml');
	}
}