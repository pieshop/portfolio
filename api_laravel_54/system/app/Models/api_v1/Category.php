<?php

namespace App\Models\api_v1;

use Illuminate\Database\Eloquent\Model;
use DB;

class Category extends Model
{

	public static function get_categories_array()
	{
		return self::_get_categories('allyears')->response;
	}

	public static function get_categories($year)
	{
		$cats = self::_get_categories($year);
		return self::jsonResponse($cats->response, $cats->responsecode);
	}

	public static function get_items($id, $year, $filtered)
	{
		$results = self::get_category_entries($id, $year, $filtered);
		$all_category_results = self::get_category_entries($id, 'allyears', $filtered);
		$all_year_results = self::get_category_entries('all', $year, $filtered);
		if ($results && count($results) > 0) {
			$years = self::get_category_years($all_category_results);
			$categories = self::get_year_categories($all_year_results);
			$items = array();
			foreach ($results as $val) {
				$o = json_decode(json_encode($val), true);
				$data = self::parse_entry($o);
				$items[] = array('entry' => $data);
			}

			$result = self::jsonResponse(['entries' => $items, 'years' => $years->years, 'categories' => $categories->categories], 200);
		} else {
//			$result = self::jsonResponse(['errorText' => 'Category has no entries'], 500);
			$result = self::jsonResponse(['entries' => []], 200);
		}
		return $result;
	}

	/**
	 * Returns json response.
	 *
	 * @param array|null $payload
	 * @param int $statusCode
	 * @return \Illuminate\Http\JsonResponse
	 */
	protected static function jsonResponse(array $payload = null, $statusCode = 404)
	{
		$payload = $payload ?: [];
		return response()->json($payload, $statusCode);
	}

	protected static function _get_categories($year)
	{
		$cats = array();
		try {
			$results = DB::table('categories')
					->get();
			foreach ($results as $val) {
				$o = json_decode(json_encode($val), FALSE);
				$name = $o->category_name;
				$entries = self::get_category_entries($name, 'allyears', false);
				$has_entries = ($entries && count($entries) > 0);

				// todo:
				// check that each category has entries for the year (is active)
				$year_entries = self::get_category_entries($name, $year, false);
				$has_year_entries = ($year_entries && count($year_entries) > 0);
				if ($has_year_entries) {
					$o->is_active = true;
				} else {
					$o->is_active = false;
				}

				if ($has_entries) {
					array_push($cats, $o);
				}
			}
			$result = (object)[
					"response" => $cats,
					"responsecode" => 200
			];
		} catch (\Exception $e) {
			$cats = array('errorText' => 'No Categories found.');
			$result = (object)[
					"response" => $cats,
					"responsecode" => 500
			];
		}
		return $result;
	}

	protected static function get_category_entries($id, $year, $filtered)
	{
//		print_r( ' $year '.$year.' | '.' $id '.$id.' | '.' $filtered '.$filtered.' | ');
		$is_prod = app()->environment('production');

		if ($id == 'all') {
			try {
				$results = DB::table('entries')
						->where('entry_isactive', '=', '1')
						->where(function ($query) use ($year) {
							if ($year !== 'allyears') {
								$query->where('entry_year', '=', $year);
							}
						})
						->where(function ($query) use ($is_prod) {
							// use this on live to filter out nda entries
							if ($is_prod == TRUE) {
								$query->where('entry_isnda', '=', '0');
							} else {
								$query->where('entry_issummary', '=', '0');
							}
						})
						->where(function ($query) use ($filtered) {
							// print_r( ' FILTERED '.$filtered.' | ');
							if ($filtered == TRUE) {
								$query->where('entry_isfeatured', '=', '1');
							}
						})
						->orderBy('entry_year', 'desc')
						->orderBy('entry_week', 'desc')
						->get();
			} catch (\Exception $e) {
				$result = array('error' => $id . ' check new entry has category id.');
			}
		} else {
			try {
				$results = DB::table('entries')
						->join('entries_categories', 'entries.entry_id', '=', 'entries_categories.entry_id')
						->join('categories', function ($join) use ($id) {
							$join->on('categories.category_id', '=', 'entries_categories.category_id')
									->where('categories.category_name', '=', $id);
						})
						->where('entry_isactive', '=', '1')
						->where(function ($query) use ($year) {
							if ($year !== 'allyears') {
								$query->where('entry_year', '=', $year);
							}
						})
						->where(function ($query) use ($is_prod) {
							// use this on live to filter out nda entries
							if ($is_prod == TRUE) {
								$query->where('entry_isnda', '=', '0');
							} else {
								$query->where('entry_issummary', '=', '0');
							}
						})
						->where(function ($query) use ($filtered) {
							// print_r( ' FILTERED '.$filtered.' | ');
							if ($filtered == TRUE) {
								$query->where('entry_isfeatured', '=', '1');
							}
						})
						->orderBy('entry_year', 'desc')
						->orderBy('entry_week', 'desc')
						->get();
			} catch (\Exception $e) {
				$result = array('error' => $id . ' check new entry has category id.');
			}

		}
		return $results;
	}

	protected static function get_category_years($results)
	{
		$years_ary = array();
		try {
			foreach ($results as $val) {
				$o = json_decode(json_encode($val), FALSE);
				$year = $o->entry_year;
				$years_ary[$year] = true;

			}
			$result = (object)[
					"years" => $years_ary,
					"responsecode" => 200
			];
		} catch (\Exception $e) {
			print_r('ERROR' . $e);
			$result = (object)[
					"years" => array('errorText' => 'No Years found.'),
					"responsecode" => 500
			];
		}
		return $result;
	}

	protected static function get_year_categories($results)
	{
		$cat_ary = array();
		try {
			foreach ($results as $val) {
				$o = json_decode(json_encode($val), true);
				$categories = self::parse_categories($o);
				foreach ($categories as $category) {
					$cat_ary[$category] = true;
				}
			}
//			print_r($cat_ary);
			$result = (object)[
					"categories" => $cat_ary,
					"responsecode" => 200
			];
		} catch (\Exception $e) {
			print_r('ERROR' . $e);
			$result = (object)[
					"categories" => array('errorText' => 'No Categories found.'),
					"responsecode" => 500
			];
		}
		return $result;
	}

	protected static function parse_categories($row)
	{
		$categories = array();
		$entry_id = $row['entry_id'];
		$results = DB::table('categories')
				->join('entries_categories', 'categories.category_id', '=', 'entries_categories.category_id')
				->where('entries_categories.entry_id', '=', $entry_id)
				->get();
		if (count($results) > 0) {
			for ($i = 0, $c = count($results); $i < $c; ++$i) {
				$array[$i] = (array)$results[$i];
				$cat_name = $array[$i]['category_name'];
				array_push($categories, $cat_name);
			}
		}
		return $categories;
	}

	protected static function parse_entry($row)
	{
		$entry = array(
				'id' => $row['entry_id'],
				'page_id' => '',
				'entry_key' => $row['entry_key'],
				'title' => $row['entry_title'],
				'year' => $row['entry_year'],
				'client' => '',
				'client_key' => '',
				'category' => 'category',
				'is_responsive' => $row['entry_isresponsive'],
				'is_summary' => $row['entry_issummary'],
				'awards' => array()
		);
		$entry_id = $row['entry_id'];

		// CATEGORIES
		$results = DB::table('categories')
				->join('entries_categories', 'categories.category_id', '=', 'entries_categories.category_id')
				->where('entries_categories.entry_id', '=', $entry_id)
				->get();
		$entry['category'] = self::parse_json_result($results, 'category_name');

		// CLIENT
		$results = DB::table('clients')
				->join('entries_clients', 'clients.client_id', '=', 'entries_clients.client_id')
				->where('entries_clients.entry_id', '=', $entry_id)
				->get();
		if (count($results) > 0) {
			$o[] = (array)$results[0];
			$entry['client'] = $o[0]['client_name'];
			$entry['client_key'] = $o[0]['client_key'];
		}

		// AWARDS
//		$results = DB::table('awards')
//				->join('entries_awards', 'awards.award_id', '=', 'entries_awards.award_id')
//				->where('entries_awards.entry_id', '=', $entry_id)
//				->get();
//		if (count($results) > 0) {
//			for ($i = 0, $c = count($results); $i < $c; ++$i) {
//				$array[$i] = (array)$results[$i];
//				$award_id = $array[$i]['award_id'];
//				$award_result = $array[$i]['award_result'];
//				$award_category = $array[$i]['award_category'];
//				$award_name = $array[$i]['award_name'];
//				$award_long_name = $array[$i]['award_long_name'];
//				$award_url_link = $array[$i]['award_url_link'];
//				$award_pdf_link = $array[$i]['award_pdf_link'];
//				$obj = (object)array('award_id' => $award_id, 'award_name' => $award_name, 'award_long_name' => $award_long_name, 'award_result' => $award_result, 'award_category' => $award_category, 'link' => $award_url_link, 'pdf' => $award_pdf_link);
//				array_push($entry['awards'], $obj);
//			}
//		}

		$entry['page_id'] = $entry['client_key'] . $entry['entry_key'];
		return $entry;
	}

	protected static function parse_json_result($results, $id)
	{
		$str = "";
		for ($i = 0, $c = count($results); $i < $c; ++$i) {
			$array[$i] = (array)$results[$i];
			$str .= $array[$i][$id];
			if ($i < ($c - 1)) {
				$str .= ", ";
			}
		}
		return $str;
	}
}