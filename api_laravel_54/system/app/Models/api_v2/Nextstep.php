<?php

namespace App\Models\api_v2;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;

class Nextstep extends Model
{

	public static function get_data($id)
	{
		Log::info('Nextstep.get_data: ' . $id);
		try {
			$file = Storage::disk('public')->get($id.'.json');
			$result = self::jsonResponse(json_decode($file, true), 200);
		} catch (\Exception $e) {
			$result = self::jsonResponse(['errorText' => $id . ' does not exist.'], 500);
		}
		return $result;
	}

	public static function save_data($id, $data)
	{
		Log::info('Nextstep.save_data: ' . $id);
		try {
			$save = Storage::disk('public')->put($id.'.json', json_decode(json_encode($data, true),true));
			$result = response()->json(['response' => 'ok'], 200);
		} catch (\Exception $e) {
			$result = self::jsonResponse(['errorText' => $id . ' save failed.'], 500);
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
}