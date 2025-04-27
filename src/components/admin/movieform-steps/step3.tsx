import { Movie } from "../../../types/movie";

interface Step3Props  {
  formData: Partial<Movie>;
  updateFormData: (data: Partial<Movie>) => void;
  isEditMode: boolean;
}

const FormStep3: React.FC<Step3Props> = ({ 
  formData, 
  isEditMode 
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Review Movie Details</h2>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Movie Title</h3>
            <p className="mt-1 text-sm text-gray-900">{formData.title || "Not provided"}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Rating</h3>
            <p className="mt-1 text-sm text-gray-900">{formData.rating || 0}/10</p>
          </div>
          
          <div className="col-span-2">
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-sm text-gray-900">{formData.description || "Not provided"}</p>
          </div>
          
          {formData.imageUrl && (
            <div className="col-span-2">
              <h3 className="text-sm font-medium text-gray-500">Image Preview</h3>
              <div className="mt-1 h-40 w-full overflow-hidden rounded-md">
                <img 
                  src={formData.imageUrl} 
                  alt={formData.title} 
                  className="h-full w-auto object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                  }}
                />
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Showtime</h3>
            <p className="mt-1 text-sm text-gray-900">{formatDate(formData.showtime)}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Seats</h3>
            <p className="mt-1 text-sm text-gray-900">
              {formData.availableSeatsCount || 0} available / {formData.totalSeatsCount || 0} total
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
        <h3 className="text-sm font-medium text-blue-800">Ready to {isEditMode ? "Update" : "Create"}?</h3>
        <p className="mt-1 text-sm text-blue-700">
          Please review all details carefully before submitting. Once submitted, the movie will be 
          {isEditMode ? " updated in" : " added to"} the system.
        </p>
      </div>
    </div>
  );
};

export default FormStep3;