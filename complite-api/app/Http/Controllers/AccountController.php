<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    public function loginUser(Request $request){
        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->username) && !empty($data->password)){
            $sql = DB::table('accounts')->where('username', $data->username)->first();
            $id = $sql->accountID;
            $username = $sql->username;
            $password = $sql->password;
            $account = $sql->accountType;
            $isActive = $sql->status;

            if (password_verify($data->password, $password)) {
                if ($account == 'Student' && $isActive == 'Active'){
                    $stmt = DB::table('student_profile')->where('account_ID', $id)->first();
                    $stid = $stmt->studentID;
                    $code = http_response_code(200);
                    $val = [
                        'success' => $code, 
                        'message' => 'Login successfully!', 
                        'user' => array(
                            'id' => $id,
                            'studentId' => $stid,
                            'username' => $username,
                            'password' => $password,
                            'accountType' => $account,
                        ),
                    ];
                    return response()->json($val);
                } elseif ($account == 'Instructor' && $isActive == 'Active') {
                    $stmt2 = DB::table('instructor_profile')->where('account_ID', $id)->first();
                    $inid = $stmt2->instructorID;
                    $code = http_response_code(200);
                    $val = [
                        'success' => $code, 
                        'message' => 'Login successfully!', 
                        'user' => array(
                            'id' => $id,
                            'instructorId' => $inid,
                            'username' => $username,
                            'password' => $password,
                            'accountType' => $account,
                        ),
                    ];
                    return response()->json($val);
                } elseif ($account == 'Student' && $isActive == 'Inactive') {
                    $val = [
                        'message' => 'Account is Inactive. Please report to the admin.'
                    ];
                    return response()->json($val);
                } elseif ($account == 'Instructor' && $isActive == 'Inactive') {
                    $val = [
                        'message' => 'Account is Inactive. Please report to the admin.'
                    ];
                    return response()->json($val);
                } else {
                    $val = [
                        'message' => 'Invalid credentials.'
                    ];
                    return response()->json($val);
                }
            } else {
                http_response_code(400);
                $val = [
                    'message' => 'Invalid credentials.'
                ];
                return response()->json($val);
            }
        } else {
            http_response_code(400);
            $val = [
                'message' => 'Unable to login. Data is incomplete'
            ];
            return response()->json($val);
        }
    }

    public function getProfile(){
        $data = json_decode(file_get_contents("php://input"));

        $sql = DB::table('student_profile')->where('studentID', $data)->first();

        if ($sql) {
            $code = http_response_code(200);
            $acc_id = $sql->account_ID;
            $fname = $sql->firstName;
            $lname = $sql->lastName;
            $mname = $sql->middleName;
            $bdate = $sql->birthDate;
            $mail = $sql->email;
            $pfp = $sql->profilePhoto;
            $s = $sql->sex;
            $p = $sql->points;
            $g = $sql->grades;
            $val = [
                'success' => $code, 
                'student' => array(
                    'accountid' => $acc_id,
                    'firstname' => $fname,
                    'lastname' => $lname,
                    'middlename' => $mname,
                    'email' => $mail,
                    'birthdate' => $bdate,
                    'sex' => $s,
                    'profilePhoto' => $pfp,
                    'totalpoints' => $p,
                    'totalgrades' => $g,
                ),
            ];
            return response()->json($val);
        } else {
            http_response_code(400);
            $val = [
                'message' => 'Cannot retrieve data, please try to log in again.',
            ];
            return response()->json($val);
        }
    }

    public function instructorProfile() {
        $data = json_decode(file_get_contents("php://input"));

        $sql = DB::table('instructor_profile')->where('instructorID', $data)->first();

        if ($sql) {
            $code = http_response_code(200);
            $acc_id = $sql->account_ID;
            $fname = $sql->firstName;
            $lname = $sql->lastName;
            $mname = $sql->middleName;
            $bdate = $sql->birthDate;
            $mail = $sql->email;
            $pfp = $sql->profilePhoto;
            $s = $sql->sex;
            $val = [
                'success' => $code, 
                'instructor' => array(
                    'accountid' => $acc_id,
                    'firstname' => $fname,
                    'lastname' => $lname,
                    'middlename' => $mname,
                    'email' => $mail,
                    'birthdate' => $bdate,
                    'sex' => $s,
                    'profilePhoto' => $pfp,
                ),
            ];
            return response()->json($val);
        } else {
            http_response_code(400);
            $val = [
                'message' => 'Cannot retrieve data, please try to log in again.',
            ];
            return response()->json($val);
        }
    }

    public function updateStudentAccount() {
        $data = json_decode(file_get_contents("php://input"));

        $sql = DB::table('accounts')->where('accountID', $data->account_id)
            ->update(['username' => $data->username, 'password' => Hash::make($data->password)]);

        if ($sql){
            http_response_code(400);
            $val = [
                'success' => 200, 
                'message' => 'Updated Username and Password'
            ];
            return response()->json($val);
        } else {
            http_response_code(400);
            $val = [
                'message' => 'Cannot Update Details, please try again later.',
            ];
            return response()->json($val);
        }

        return $data;
    }

    public function updateInstructorAccount() {
        $data = json_decode(file_get_contents("php://input"));

        $sql = DB::table('accounts')->where('accountID', $data->account_id)
            ->update(['username' => $data->username, 'password' => Hash::make($data->password)]);

        if ($sql){
            http_response_code(400);
            $val = [
                'success' => 200, 
                'message' => 'Updated Username and Password'
            ];
            return response()->json($val);
        } else {
            http_response_code(400);
            $val = [
                'message' => 'Cannot Update Details, please try again later.',
            ];
            return response()->json($val);
        }
    }

    public function putPoints() {
        $data = json_decode(file_get_contents("php://input"));

        $sql = DB::table('student_profile')->where('studentID', $data->student_id)
            ->update(['points' => $data->points]);

        if ($sql){
            http_response_code(400);
            $val = [
                'success' => 200, 
                'message' => 'Points recorded'
            ];
            return response()->json($val);
        } else {
            http_response_code(400);
            $val = [
                'message' => 'Points not recorded',
            ];
            return response()->json($val);
        }
    }
}
