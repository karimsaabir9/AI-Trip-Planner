import { Star } from "lucide-react";
import { TripInfo } from "./ChatBox";

function TripDetails({ trip }: { trip: TripInfo }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="p-4 border rounded-2xl bg-white">
        <h2 className="text-xl font-bold text-primary">
          {trip.origin} → {trip.destination}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {trip.duration} · {trip.group_size} · {trip.budget} budget
        </p>
      </div>

      {trip.hotels?.length > 0 && (
        <div>
          <h2 className="font-semibold mb-2">Hotels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {trip.hotels.map((hotel: any, index: number) => (
              <div key={index} className="border rounded-2xl bg-white overflow-hidden">
                {hotel.hotel_image_url && (
                  <img
                    src={hotel.hotel_image_url}
                    alt={hotel.hotel_name}
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-3">
                  <h3 className="font-semibold">{hotel.hotel_name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{hotel.hotel_address}</p>
                  <div className="flex items-center justify-between mt-2 text-sm">
                    <span className="text-primary font-medium">{hotel.price_per_night}</span>
                    {hotel.rating && (
                      <span className="flex items-center gap-1 text-gray-500">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        {hotel.rating}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {trip.itinerary?.length > 0 && (
        <div>
          <h2 className="font-semibold mb-2">Itinerary</h2>
          <div className="flex flex-col gap-3">
            {trip.itinerary.map((day: any, index: number) => (
              <div key={index} className="p-3 border rounded-2xl bg-white">
                <h3 className="font-semibold">
                  Day {day.day} {day.best_time_to_visit_day && `· ${day.best_time_to_visit_day}`}
                </h3>
                {day.day_plan && (
                  <p className="text-sm text-gray-500 mt-1">{day.day_plan}</p>
                )}
                <div className="flex flex-col gap-2 mt-3">
                  {day.activities?.map((activity: any, i: number) => (
                    <div key={i} className="flex gap-3 border rounded-xl p-2">
                      {activity.place_image_url && (
                        <img
                          src={activity.place_image_url}
                          alt={activity.place_name}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                      )}
                      <div>
                        <h4 className="font-medium text-sm">{activity.place_name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {activity.place_details}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {activity.ticket_pricing} · {activity.best_time_to_visit}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TripDetails;
