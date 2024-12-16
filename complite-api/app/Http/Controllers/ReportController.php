<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Report;

class ReportController extends Controller
{
    public function sendReport() {
        $data = json_decode(file_get_contents("php://input"));

        $sql = DB::insert('INSERT INTO reports (account_ID, reportMessage) VALUES (?,?)', [$data->account_id, $data->report]);
    
        if ($sql) {
            $code = http_response_code(200);
            $val = [
                    'success' => $code, 
                    'message' => 'Report sent!', 
                ];
            return response()->json($val);
        } else {
            $val = [
                    'message' => 'Failed to sent Report!', 
                ];
            return response()->json($val);
        }
    }
}
