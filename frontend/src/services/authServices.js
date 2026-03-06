export const loginApi = (request, data) => {
  return request("/api/auth/login", "POST", data);
};

export const signUpApi = (request, data) => {
  return request("/api/auth/signup", "POST", data);
};

export const getUserApi = (request) => {
  return request("/api/auth/get/user");
};

export const signOutApi = (request) => {
  return request("/api/auth/signout");
};