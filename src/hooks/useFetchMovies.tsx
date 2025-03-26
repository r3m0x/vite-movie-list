import { useState, useEffect } from 'react';

const useBookingMovies = () => {
    const [movieList, setMovieList] = useState<MovieType[]>(() => {
      const savedMovieList = localStorage.getItem('movieList');
      return savedMovieList ? JSON.parse(savedMovieList) : [];
    });
  
    useEffect(() => {
      localStorage.setItem('movieList', JSON.stringify(movieList));
    }, [movieList]);
  
    const addBooking = (movie: MovieType) => {
      if (movie) {
        setMovieList(prev => [...prev, {
          id: movie.
          ava
        }]);
      }
    };
  
    const removeBooking = (id: number) => {
      setTodos(prev => prev.filter(todo => todo.id !== id));
    };
  
    const updateBooking = (id: number, seat: string[]) => {
      setMovieList(prev => prev.map(movie =>
        movie.id === id ? { ...movie, text: newText } : todo
      ));
    };
  
    return {
      movieList,
      addBooking,
      removeBooking,
      updateBooking
    };
  };
  
  export default useBookingMovies;