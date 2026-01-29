export type RegisterModel = {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
};

export type LoginModel = {
  email: string;
  password: string;
};

export type ForgotPasswordModel = {
  email: string;
};

export type ResetPasswordModel = {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
};

export type DriverRequestDto = {
  licenseNumber: string;
};

export type CreateTripRequest = {
  destination: string;
  totalSeats: number;
  routeId: string;
  busPlateNumber: string;
};

export type LocationUpdateRequest = {
  latitude: number;
  longitude: number;
};

export type BookingRequest = {
  tripId: string;
  latitude: number;
  longitude: number;
};

export type Trip = {
  id: string;
  destination: string;
  totalSeats: number;
  availableSeats: number;
  status: string;
  busPlateNumber: string;
};
