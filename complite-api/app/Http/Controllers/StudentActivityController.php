<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

class StudentActivityController extends Controller
{
    /**
     * Retrieve all activities
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getActivities()
    {
        try {
            // Log the activities being retrieved
            $activities = Activity::all();
            Log::info('Activities retrieved:', $activities->toArray());
            
            return response()->json([
                'success' => true,
                'activities' => $activities
            ]);
        } catch (\Exception $e) {
            // Log the full error
            Log::error('Error fetching activities: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch activities: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Save points for a user
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function savePoints(Request $request)
    {
        try {
            // Get authenticated user
            $user = Auth::user();

            // Validate the incoming request
            $validated = $request->validate([
                'points' => 'required|integer',
                'activityType' => 'required|string',
            ]);

            // Update the user's points
            $user->points += $validated['points'];
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Points saved successfully',
                'points' => $user->points
            ]);
        } catch (\Exception $e) {
            Log::error('Error saving points: ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            return response()->json([
                'success' => false,
                'message' => 'Failed to save points',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}