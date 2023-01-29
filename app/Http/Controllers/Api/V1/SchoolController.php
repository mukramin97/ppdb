<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\School;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSchoolRequest;
use App\Http\Resources\V1\SchoolCollection;
use App\Http\Resources\V1\SchoolResource;
use Illuminate\Http\Request;

class SchoolController extends Controller
{
	public function index()
	{
    $schools = School::orderBy('created_at', 'desc')->paginate(5);
		return new SchoolCollection($schools);
	}

	public function store(StoreSchoolRequest $request)
	{
		School::create($request->validated());
		return response()->json("School created!");
	}

	public function update(StoreSchoolRequest $request, School $school)
	{
		$school->update($request->validated());
		return response()->json("School Updated");
	}

	public function show(School $school)
	{
		return new SchoolResource($school);
	}

	public function destroy(School $school)
	{
		$school->delete();
		return response()->json("School Deleted!");
	}
}
