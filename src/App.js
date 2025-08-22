import '../node_modules/bootstrap/dist/css/bootstrap.css'
import React, { useState } from 'react';

// Main App Component
const App = () => {
  // State for search parameters
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [flightClass, setFlightClass] = useState('economy');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle flight search
  const handleSearch = async (e) => {
    e.preventDefault(); 

    setLoading(true);
    setError(null);
    setSearchResults([]); 

    const RAPIDAPI_KEY = '40ac6c5f3amsh8d3a765a6867d86p11c734jsne9abda202f27'; // actual RapidAPI Key
    const RAPIDAPI_HOST = 'sky-scrapper.p.rapidapi.com'; // host for Sky-Scrapper API

    const url = `https://${RAPIDAPI_HOST}/flights/search?origin=${origin}&destination=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&passengers=${passengers}&flightClass=${flightClass}`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST
      }
    };

    try {
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      const data = [
        { id: 1, airline: 'Air Demo', flightNumber: 'AD123', departureTime: '10:00 AM', arrivalTime: '12:30 PM', price: 250, duration: '2h 30m' },
        { id: 2, airline: 'Flight Sim', flightNumber: 'FS456', departureTime: '11:00 AM', arrivalTime: '01:30 PM', price: 280, duration: '2h 30m' },
        { id: 3, airline: 'Sky Wings', flightNumber: 'SW789', departureTime: '09:00 AM', arrivalTime: '11:30 AM', price: 220, duration: '2h 30m' },
        { id: 4, airline: 'Aero Express', flightNumber: 'AX007', departureTime: '02:00 PM', arrivalTime: '04:30 PM', price: 310, duration: '2h 30m' },
        { id: 5, airline: 'Cloud Hoppers', flightNumber: 'CH101', departureTime: '03:30 PM', arrivalTime: '06:00 PM', price: 295, duration: '2h 30m' },
      ];

      setSearchResults(data);

    } catch (err) {
      console.error("Error fetching flights:", err);
      setError('Failed to fetch flights. Please check your API key and network connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Header */}
      <header className="bg-primary-dark text-white p-4 shadow-lg rounded-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0 d-flex align-items-center">
            <i className="bi bi-airplane-fill me-2 fs-4"></i> Google Flights Clone
          </h1>
          <nav>
            <ul className="nav">
              <li className="nav-item"><a href="#" className="nav-link text-white opacity-75">Flights</a></li>
              <li className="nav-item"><a href="#" className="nav-link text-white opacity-75">Hotels</a></li>
              <li className="nav-item"><a href="#" className="nav-link text-white opacity-75">Cars</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container p-4 flex-grow-1">
        {/* Search Form */}
        <section className="bg-white p-4 rounded-4 shadow-lg mb-4">
          <h2 className="h4 mb-4 text-dark d-flex align-items-center">
            <i className="bi bi-geo-alt-fill me-2 text-primary fs-5"></i> Find Your Next Flight
          </h2>
          <form onSubmit={handleSearch}>
            <div className="row g-3">
              <div className="col-12 col-md-6 col-lg-4">
                <label htmlFor="origin" className="form-label text-muted d-flex align-items-center">
                  <i className="bi bi-airplane me-1"></i> Origin
                </label>
                <input
                  type="text"
                  id="origin"
                  className="form-control form-control-lg rounded-pill"
                  placeholder="e.g., New York (NYC)"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <label htmlFor="destination" className="form-label text-muted d-flex align-items-center">
                  <i className="bi bi-airplane me-1"></i> Destination
                </label>
                <input
                  type="text"
                  id="destination"
                  className="form-control form-control-lg rounded-pill"
                  placeholder="e.g., London (LHR)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <label htmlFor="departureDate" className="form-label text-muted d-flex align-items-center">
                  <i className="bi bi-calendar-date me-1"></i> Departure Date
                </label>
                <input
                  type="date"
                  id="departureDate"
                  className="form-control form-control-lg rounded-pill"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <label htmlFor="returnDate" className="form-label text-muted d-flex align-items-center">
                  <i className="bi bi-calendar-date me-1"></i> Return Date (Optional)
                </label>
                <input
                  type="date"
                  id="returnDate"
                  className="form-control form-control-lg rounded-pill"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <label htmlFor="passengers" className="form-label text-muted d-flex align-items-center">
                  <i className="bi bi-people me-1"></i> Passengers
                </label>
                <input
                  type="number"
                  id="passengers"
                  className="form-control form-control-lg rounded-pill"
                  min="1"
                  value={passengers}
                  onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value)))}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <label htmlFor="flightClass" className="form-label text-muted d-flex align-items-center">
                  <i className="bi bi-tag me-1"></i> Class
                </label>
                <select
                  id="flightClass"
                  className="form-select form-select-lg rounded-pill"
                  value={flightClass}
                  onChange={(e) => setFlightClass(e.target.value)}
                >
                  <option value="economy">Economy</option>
                  <option value="premium_economy">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>
              <div className="col-12 text-center pt-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg rounded-pill px-5 shadow-lg animate__animated animate__pulse" // Added shadow and basic animation
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Searching...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-search me-2"></i> Search Flights
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* Search Results Display */}
        <section className="bg-white p-4 rounded-4 shadow-lg">
          <h2 className="h4 mb-4 text-dark d-flex align-items-center">
            <i className="bi bi-airplane-fill me-2 text-primary fs-5"></i> Available Flights
          </h2>
          {loading && <p className="text-center text-primary fs-5"><span className="spinner-grow spinner-grow-sm me-2"></span>Loading flights...</p>}
          {error && <p className="text-center text-danger fs-5"><i className="bi bi-exclamation-triangle-fill me-2"></i>{error}</p>}
          {!loading && !error && searchResults.length === 0 && (
            <p className="text-center text-muted fs-5">No flights found. Try a different search.</p>
          )}

          {!loading && !error && searchResults.length > 0 && (
            <div className="row g-4"> {/* Increased gutter more spacing */}
              {searchResults.map(flight => (
                <div key={flight.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden animate__animated animate__fadeInUp"> {/* Added shadow, border, rounded corners, and animation */}
                    <div className="card-body d-flex flex-column">
                      <h3 className="card-title h5 text-primary-dark mb-2 d-flex align-items-center">
                        <i className="bi bi-airplane-fill me-2"></i> {flight.airline} <span className="text-muted ms-auto small">{flight.flightNumber}</span>
                      </h3>
                      <hr className="my-2" />
                      <p className="card-text text-dark mb-1 d-flex align-items-center">
                        <i className="bi bi-clock me-2 text-secondary"></i>
                        <span className="fw-semibold me-1">Departure:</span> {flight.departureTime}
                      </p>
                      <p className="card-text text-dark mb-1 d-flex align-items-center">
                        <i className="bi bi-clock me-2 text-secondary"></i>
                        <span className="fw-semibold me-1">Arrival:</span> {flight.arrivalTime}
                      </p>
                      <p className="card-text text-dark mb-3 d-flex align-items-center">
                        <i className="bi bi-hourglass me-2 text-secondary"></i>
                        <span className="fw-semibold me-1">Duration:</span> {flight.duration}
                      </p>
                      <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                        <p className="card-text text-success fs-4 fw-bold mb-0 d-flex align-items-center">
                          <i className="bi bi-currency-dollar me-1"></i>$ {flight.price}
                        </p>
                        <button className="btn btn-outline-primary btn-sm rounded-pill px-3">View Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white p-4 mt-auto rounded-top">
        <div className="container text-center">
          <p className="mb-0">&copy; 2024 Google Flights Clone. All rights reserved.</p>
          <p className="small opacity-75 mt-1">Powered by React and Bootstrap</p>
        </div>
      </footer>

      {/* Custom Styles for Professional Look */}
      <style jsx>{`
        .bg-primary-dark {
          background-color: #003366 !important; /* Deeper blue for header */
        }
        .text-primary-dark {
          color: #003366 !important;
        }
        .rounded-4 {
          border-radius: 1rem !important; /* More pronounced rounded corners */
        }
        .shadow-lg {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important; /* Stronger shadow */
        }
        .form-control-lg.rounded-pill, .form-select-lg.rounded-pill {
            border-radius: 2rem !important;
            padding: 0.75rem 1.25rem;
            font-size: 1rem;
        }
        .btn-lg.rounded-pill {
            font-size: 1.15rem;
            padding: 0.8rem 2.5rem;
        }
        .card {
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2) !important;
        }
        .animate__animated.animate__fadeInUp {
            animation-duration: 0.7s;
            animation-fill-mode: both;
            animation-name: fadeInUp;
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translate3d(0, 20px, 0);
            }
            to {
                opacity: 1;
                transform: none;
            }
        }
        .animate__animated.animate__pulse {
            animation-duration: 1.5s;
            animation-iteration-count: infinite;
            animation-name: pulse;
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.03); }
            100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default App;
