<?php

namespace App\Models\api_v1;

use Illuminate\Database\Eloquent\Model;
use DB;

class Item extends Model
{
	public static function get_item($id)
	{
		try {
			$result = DB::table('entries')
					->where('entry_key', '=', $id)
					->get();
			$o = json_decode(json_encode($result[0]), true);
			$data = self::parse_entry($o);
			$result = self::jsonResponse(['entry' => $data], 200);
		} catch (\Exception $e) {
			$result = self::jsonResponse(['errorText' => $id . ' does not exist.'], 500);
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

	protected static function parse_entry($row)
	{
		//		print_r('Agent::isMobile = ' . Agent::isMobile() . ' | ');
		$entry = array(
				'id' => $row['entry_id'],
				'page_id' => '',
				'entry_key' => $row['entry_key'],
//				'has_archive' => (($row['entry_hasarchive'] == "0") || (Agent::isMobile())) ? false : true,
//				'has_archive' => ($row['entry_hasarchive'] == "0") || true,
				'title' => $row['entry_title'],
				'description' => $row['entry_description'],
				'responsibilities' => $row['entry_responsibilities'],
				'year' => $row['entry_year'],
				'client' => '',
				'client_key' => '',
				'category' => '',
				'affiliation' => '',
				'affiliation_url' => '',
				'awards' => array(),
				'technologies' => array(),
				'frameworks' => array(),
				'territories' => array(),
				'links' => array(),
				'platforms' => array()
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

		$o = (array)$results[0];
		$entry['client'] = $o['client_name'];
		$entry['client_key'] = $o['client_key'];

		// TECHNOLOGIES
		$results = DB::table('technologies')
				->join('entries_technologies', 'technologies.tech_id', '=', 'entries_technologies.tech_id')
				->where('entries_technologies.entry_id', '=', $entry_id)
				->get();
		$entry['technologies'] = self::parse_json_result($results, 'tech_name');

		// FRAMEWORKS
		$results = DB::table('frameworks')
				->join('entries_frameworks', 'frameworks.framework_id', '=', 'entries_frameworks.framework_id')
				->where('entries_frameworks.entry_id', '=', $entry_id)
				->get();
		if (count($results) > 0) {
			for ($i = 0, $c = count($results); $i < $c; ++$i) {
				$array[$i] = (array)$results[$i];
				$fra_name = $array[$i]['framework_name'];
				$fra_url = $array[$i]['framework_url'];
				$obj = (object)array('name' => $fra_name, 'url' => $fra_url);
				array_push($entry['frameworks'], $obj);
			}
		}

		// PLATFORMS
		$results = DB::table('platforms')
				->join('entries_platforms', 'platforms.platform_id', '=', 'entries_platforms.platform_id')
				->where('entries_platforms.entry_id', '=', $entry_id)
				->get();
		if (count($results) > 0) {
			for ($i = 0, $c = count($results); $i < $c; ++$i) {
				$array[$i] = (array)$results[$i];
				$plat_name = $array[$i]['platform_name'];
				$obj = (object)array('name' => $plat_name);
				array_push($entry['platforms'], $obj);
			}
		}

		// AFFILIATION
		$results = DB::table('affiliations')
				->join('entries_affiliations', 'affiliations.affiliation_id', '=', 'entries_affiliations.affiliation_id')
				->where('entries_affiliations.entry_id', '=', $entry_id)
				->get();
		$o = (array)$results[0];
		$entry['affiliation'] = $o['affiliation_name'];
		$entry['affiliation_url'] = $o['affiliation_url'];

		// TERRITORIES
		$results = DB::table('territories')
				->join('entries_territories', 'territories.territory_id', '=', 'entries_territories.territory_id')
				->where('entries_territories.entry_id', '=', $entry_id)
				->get();
		$entry['territories'] = self::parse_json_result($results, 'territory_name');

		// IMAGES : in seperate json files now
		// VIDEOS : in seperate json files now

		// LINKS
		$results = DB::table('links')
				->join('entries_links', 'links.link_id', '=', 'entries_links.link_id')
				->where('entries_links.entry_id', '=', $entry_id)
				->get();

		if (count($results) > 0) {
			for ($i = 0, $c = count($results); $i < $c; ++$i) {
				$array[$i] = (array)$results[$i];
				$link_id = $array[$i]['link_id'];
				$link_url = $array[$i]['link_url'];
				$link_target = $array[$i]['link_target'];
				$link_type_id = $array[$i]['link_type'];
				$link_label = $array[$i]['link_label'];
				$link_isMobileFriendly = ($array[$i]['link_isMobileFriendly'] == "0") ? "false" : "true";

				$window_width = $array[$i]['window_width'];
				$window_height = $array[$i]['window_height'];
				$window_dimensions = "";
				if ($window_width > 0 && $window_height > 0) {
					$window_dimensions = "w='$window_width' h='$window_height'";
				}

				$res = DB::table('link_types')
						->where('link_type_id', '=', $link_type_id)
						->get();
				$o = (array)$res[0];
				$link_type = $o['link_type'];
				if ($link_label == "") {
					$link_label = $o['link_type_label'];
				}
				$obj = (object)array('link_id' => $link_id, 'type' => $link_type, 'isMobileFriendly' => $link_isMobileFriendly, 'target' => $link_target, 'window_width' => $window_width, 'window_height' => $window_height, 'label' => $link_label, 'url' => $link_url);
				array_push($entry['links'], $obj);
			}
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