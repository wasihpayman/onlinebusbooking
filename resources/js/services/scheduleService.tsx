import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/schedules'; // آدرس واقعی API شما

export type Schedule = {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  busCompany: string;
};

const scheduleService = {
    getAll: async (): Promise<Schedule[]> => {
      try {
        const response = await axios.get<Schedule[]>(BASE_URL);
        return response.data;
      } catch (error) {
        console.error('Error fetching schedules:', error);
        throw error;
      }
    },
    getById: async (id: string): Promise<Schedule> => {
      try {
        const response = await axios.get<Schedule>(`${BASE_URL}/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching schedule with id ${id}:`, error);
        throw error;
      }
    },
  searchSchedules: async (params: { origin_city_id: number; destination_city_id: number; departure_date: string; passengers: number }) => {
    try {
      const response = await axios.get(`${BASE_URL}/search`, { params });
      return response.data;
    } catch (error) {
      console.error('Error searching schedules:', error);
      throw error;
    }
  }
};

export default scheduleService;
