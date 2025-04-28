import React from 'react';
import Utils from '../../../common/utils';

// Define the props interface for the component
interface Step3Props {
    form: any; // Using 'any' temporarily to avoid TypeScript errors
    isEditMode: boolean;
}

const FormStep3: React.FC<Step3Props> = ({ form, isEditMode = false }) => {
    const formValues = form.state.values;

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Confirm Movie Details</h2>

            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                    <h3 className="text-lg font-semibold text-white">Please review your movie information</h3>
                </div>
                
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <p className="text-sm font-medium text-gray-500 mb-1">Title</p>
                            <p className="text-lg font-medium text-gray-800">{formValues.title}</p>
                        </div>

                        {/* Rating */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <p className="text-sm font-medium text-gray-500 mb-1">Rating</p>
                            <div className="flex items-center">
                                <p className="text-lg font-medium text-gray-800">{formValues.rating}</p>
                                <div className="ml-2 text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="inline-block">
                                            {i < Math.floor(formValues.rating) ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                </svg>
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
                            <p className="text-gray-800">{formValues.description}</p>
                        </div>

                        {/* Seats Information */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Seats</p>
                            <p className="text-lg font-medium text-gray-800">{formValues.totalSeatsCount}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <p className="text-sm font-medium text-gray-500 mb-1">Available Seats</p>
                            <div className="flex items-center">
                                <p className="text-lg font-medium text-gray-800">{formValues.availableSeatsCount}</p>
                                <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                    {Math.round((formValues.availableSeatsCount / formValues.totalSeatsCount) * 100)}% available
                                </span>
                            </div>
                        </div>

                        {/* Showtime */}
                        <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <p className="text-sm font-medium text-gray-500 mb-1">Showtime</p>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-lg font-medium text-gray-800">
                                    {Utils.formatDate(formValues.showtime)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Confirmation Message */}
                    <div className="mt-8 p-4 rounded-lg border-l-4 border-yellow-400 bg-yellow-50">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    {isEditMode
                                        ? "You are about to update an existing movie. Click 'Update Movie' to save your changes."
                                        : "You are about to create a new movie. Click 'Create Movie' to add it to the system."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormStep3;