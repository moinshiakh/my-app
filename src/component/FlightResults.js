
import React from 'react';

const FlightResults = ({ flights }) => {
  if (flights.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mt-6">
      <div className="space-y-4">
        {flights.map((flight, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <p className="font-semibold">
                {flight.legs[0].origin} → {flight.legs[0].destination}
              </p>
              <p className="text-sm text-gray-600">Departure: {flight.legs[0].departure}</p>
              <p className="text-sm text-gray-600">Duration: {flight.legs[0].duration} min</p>
              <p className="text-sm text-gray-600">
                Carrier: {flight.legs[0].carriers.marketing[0].name}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-lg font-bold">${flight.price.amount}</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightResults;
