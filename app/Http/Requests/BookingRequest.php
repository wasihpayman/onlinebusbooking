<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->check();
    }

    public function rules()
    {
        return [
            'schedule_id' => 'required|exists:schedules,id',
            'passengers' => 'required|array|min:1|max:10',
            'passengers.*.name' => 'required|string|max:255',
            'passengers.*.national_id' => 'required|string|max:20',
            'passengers.*.gender' => 'required|in:male,female',
            'passengers.*.seat_number' => 'required|integer|min:1',
            'passengers.*.phone' => 'nullable|string|max:20'
        ];
    }

    public function messages()
    {
        return [
            'schedule_id.required' => 'انتخاب برنامه سفر الزامی است',
            'schedule_id.exists' => 'برنامه سفر انتخاب شده معتبر نیست',
            'passengers.required' => 'اطلاعات مسافران الزامی است',
            'passengers.*.name.required' => 'نام مسافر الزامی است',
            'passengers.*.national_id.required' => 'کد ملی مسافر الزامی است',
            'passengers.*.gender.required' => 'جنسیت مسافر الزامی است',
            'passengers.*.seat_number.required' => 'شماره صندلی الزامی است'
        ];
    }
}