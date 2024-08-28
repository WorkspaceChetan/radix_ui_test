import { apiAxiosInstants } from "../api";

export class EventService {
  static createEvent = async (payload: any) => {
    try {
      console.log(payload, "payload");

      const response = await apiAxiosInstants.post<any>("/events", {
        ...payload,
      });
      return response;
    } catch (error: any) {
      return "something went wrong";
    }
  };
}
