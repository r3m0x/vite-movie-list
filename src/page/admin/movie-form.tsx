import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { v7 as uuidv7 } from "uuid";
import FormStep1 from "../../components/admin/movieform-steps/step1";
import FormStep2 from "../../components/admin/movieform-steps/step2";
import FormStep3 from "../../components/admin/movieform-steps/step3";
import { useMovies } from "../../hooks/useMovies";
import { adminApi } from "../../services/admin";
import { Movie } from "../../types/movie";

const AdminMovieFormPage = () => {
  // Fix the useSearch hook by specifying the correct route
  const search = useSearch({ from: '/admin/movies' });
  const movieId = search.movieId;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: movies } = useMovies();
  
  // Find the movie if we're in edit mode
  const movieToEdit = movieId ? movies?.find(movie => movie.id === movieId) : undefined;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<Movie>>({});
  
  // Update formData when movieToEdit changes
  useEffect(() => {
    if (movieToEdit) {
      setFormData(movieToEdit);
    }
  }, [movieToEdit]);
  
  // Mutations for creating and updating movies
  const createMovieMutation = useMutation({
    mutationFn: (movie: Movie) => adminApi.addMovie(movie),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      navigate({ to: "/admin" });
    }
  });
  
  const updateMovieMutation = useMutation({
    mutationFn: (movie: Movie) => adminApi.updateMovie(movie.id, movie),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      navigate({ to: "/admin" });
    }
  });
  
  const steps = [
    { name: "Movie Details", component: FormStep1 },
    { name: "Showtime", component: FormStep2 },
    { name: "Confirmation", component: FormStep3 }
  ];
  
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };
  
  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };
  
  const handleUpdateFormData = (data: Partial<Movie>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };
  
  const handleSubmit = () => {
    if (movieId && movieToEdit) {
      updateMovieMutation.mutate({ ...movieToEdit, ...formData } as Movie);
    } else {
      createMovieMutation.mutate({id: uuidv7(), ...formData} as Movie);
    }
  };
  
  const CurrentStepComponent = steps[currentStep].component;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {movieId ? "Edit Movie" : "Create New Movie"}
      </h1>
      
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                index <= currentStep ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
              }`}>
                {index + 1}
              </div>
              <div className="ml-2">
                <div className="text-sm font-medium">{step.name}</div>
              </div>
              {index < steps.length - 1 && (
                <div className="w-16 h-1 mx-2 bg-gray-200">
                  <div className={`h-1 ${index < currentStep ? "bg-indigo-600" : "bg-gray-200"}`} style={{ width: "100%" }}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Current step */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <CurrentStepComponent 
          formData={formData} 
          updateFormData={handleUpdateFormData} 
          isEditMode={!!movieId}
        />
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-md ${
              currentStep === 0 
                ? "bg-gray-300 cursor-not-allowed" 
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Previous
          </button>
          
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {movieId ? "Update Movie" : "Create Movie"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMovieFormPage;
