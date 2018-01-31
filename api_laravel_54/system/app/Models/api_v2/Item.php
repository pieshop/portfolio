<?php

namespace App\Models\api_v2;

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
			$result = self::jsonResponse($data, 200);
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
		$entry = array(
				'id' => $row['entry_id'],
				'client_id' => '',
				'entry_id' => $row['entry_key'],
				'client_label' => '',
				'category' => '',
				'title' => $row['entry_title'],
				'description' => $row['entry_description'],
				'responsibilities' => $row['entry_responsibilities'],
				'year' => $row['entry_year'],
				'affiliation' => '',
				'affiliation_url' => '',
				'technologies' => array(),
				'frameworks' => array(),
				'territories' => array(),
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
		$entry['client_label'] = $o['client_name'];
		$entry['client_id'] = $o['client_key'];

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
		$entry['platforms'] = self::parse_json_result($results, 'platform_name');
//		if (count($results) > 0) {
//			for ($i = 0, $c = count($results); $i < $c; ++$i) {
//				$array[$i] = (array)$results[$i];
//				$plat_name = $array[$i]['platform_name'];
//				array_push($entry['platforms'], $plat_name);
//			}
//		}

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
		// LINKS : in seperate json files now

		// $entry['page_id'] = $entry['client_id'] . $entry['entry_id'];
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