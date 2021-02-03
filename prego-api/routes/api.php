<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::middleware(['cors','json.response'])->group(function (){
    // public routes
    //THIS IS THE WAY OF WRITING THE ROUTES IN LARAVEL 8 (LIKE AN ARRAY)!!!
    Route::post('/login', [\App\Http\Controllers\Auth\ApiAuthController::class, 'login'])->name('login.api');
    Route::post('/register', [\App\Http\Controllers\Auth\ApiAuthController::class, 'register'])->name('register.api');
    Route::get('/companies', [App\Http\Controllers\CompanyController::class, 'index']);
    Route::get('/companies/{company}', [App\Http\Controllers\CompanyController::class, 'show']);
    Route::get('/companies/{company_id}/form', [\App\Http\Controllers\FormController::class, 'getForm']);
    Route::delete('/companies/{company_id}/form', [\App\Http\Controllers\FormController::class, 'deleteForm']);
    Route::post('/companies/{company_id}/form', [\App\Http\Controllers\FormController::class, 'saveForm']);
    Route::get('/companies/{company_id}/form/answers', [\App\Http\Controllers\FormAnswerController::class, 'get']);
    Route::get('/companies/{company_id}/form/answers', [\App\Http\Controllers\FormAnswerController::class, 'getById']);
    Route::post('/companies/{company_id}/form/answers', [\App\Http\Controllers\FormAnswerController::class, 'store']);
    Route::get('/companies/{company_id}/form/answers/getData/{param?}', [\App\Http\Controllers\FormAnswerController::class, 'getData']);
    Route::get('/building_owner', [App\Http\Controllers\BuildingOwnerController::class, 'index']);
    Route::get('/building_owner/{user_id}', [App\Http\Controllers\BuildingOwnerController::class, 'getBuildingOwnerByUserId']);
    Route::put('/building_owner/{buildingOwner}', [App\Http\Controllers\BuildingOwnerController::class, 'update']);
    Route::post('/building_owner', [App\Http\Controllers\BuildingOwnerController::class, 'store']);
    Route::delete('/building_owner/{building_owner}', [App\Http\Controllers\BuildingOwnerController::class, 'delete']);

});

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [\App\Http\Controllers\Auth\ApiAuthController::class, 'logout'])->name('logout.api');
});

Route::middleware(['cors','json.response'])->group(function (){
    Route::post('/appointments', [App\Http\Controllers\AppointmentController::class, 'store']);
    Route::delete('/appointments/{id}', [App\Http\Controllers\AppointmentController::class, 'delete']);
    Route::post('/appointments/scan/{qr_id}', [App\Http\Controllers\AppointmentController::class, 'changeStatus']);
    Route::get('/deleteAppointment/{id}',[App\Http\Controllers\AppointmentController::class, 'showDeletePage']);
    Route::delete('/deleteAppointment/{id}',[App\Http\Controllers\AppointmentController::class, 'deleteByQR']);

    Route::get('/appointments', [App\Http\Controllers\AppointmentController::class, 'index']);
    Route::get('/appointments/unavailable', [App\Http\Controllers\AppointmentController::class, 'getUnavailableTimeslots']);

    Route::get('/employees/{employee_id}/appointments', [App\Http\Controllers\AppointmentController::class, 'findByEmployeeId']);
    Route::get('/companies/{company_id}/appointments', [App\Http\Controllers\AppointmentController::class, 'findByCompanyId']);

    Route::get('/appointments/{id}', [App\Http\Controllers\AppointmentController::class, 'findById']);
    Route::get('employees/{employee_id}/appointments/{id}', [App\Http\Controllers\AppointmentController::class, 'findByIdAndEmployeeId']);
    Route::get('/companies/{company_id}/appointments/{id}', [App\Http\Controllers\AppointmentController::class, 'findByIdAndCompanyId']);
});



Route::middleware(['cors','auth:api'])->group(function (){
    //Companies requests:
    Route::post('/companies', [App\Http\Controllers\CompanyController::class, 'store']);
    Route::put('/companies/{company}', [App\Http\Controllers\CompanyController::class, 'update']);
    Route::delete('/companies/{company}', [App\Http\Controllers\CompanyController::class, 'delete']);
    Route::get('/{user_id}/companies',[App\Http\Controllers\CompanyController::class, 'getCompaniesByUserId']);
    Route::get('/{user_id}/company',[App\Http\Controllers\CompanyController::class, 'getCompanyByManager']);
});

Route::middleware(['cors','auth:api'])->group(function (){
    //Employees requests:
    Route::get('/employees/{employee}', [App\Http\Controllers\EmployeeController::class, 'show']);
    Route::post('/employees', [App\Http\Controllers\EmployeeController::class, 'store']);
    Route::put('/employees/{employee}', [App\Http\Controllers\EmployeeController::class, 'update']);
    Route::delete('/employees/{employee}', [App\Http\Controllers\EmployeeController::class, 'delete']);
    Route::get('/{company_id}/employees',[App\Http\Controllers\EmployeeController::class, 'getEmployeesByCompanyId']);
    Route::get('/employee/{user_id}/',[App\Http\Controllers\EmployeeController::class, 'getEmployeeByUserId']);
    Route::get('/employees',[App\Http\Controllers\EmployeeController::class, 'getEmployees']);
});
