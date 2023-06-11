import axios from 'axios'
import { config } from '../../Constants'
import { parseJwt } from './Helpers'

export const orderApi = {
  authenticate,
  signup,
  getAllUsers,
  getUsersFilteredByUsername,
  deleteUser,

  getAllMenus,
  getMenusFilteredByName,
  deleteMenu,
  createMenu,
  getMenuByID,
  addMealToMenu,
  removeMealFromMenu,

  getAllMeals,
  getMealCategories,
  getMealsFilteredByName,
  deleteMeal,
  createMeal,

  createNewOrder,
  getMyOrders,
  getOrders,
  deleteOrder,
  acceptOrder
}

function authenticate(username, password) {
  return instance.post('/auth/authenticate', { username, password }, {
    headers: { 'Content-type': 'application/json' }
  })
}

function signup(user) {
  return instance.post('/auth/signup', user, {
    headers: { 'Content-type': 'application/json' }
  })
}


function getAllUsers(user) {
  return instance.get('/api/v1/users/get-users', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function getUsersFilteredByUsername(user, username) {
  if (username === '' || username.trim().length === 0) {
    return getAllUsers(user);
  }
  return instance.get(`/api/v1/users/get-users-by-username/${username}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function deleteUser(user, username) {
  //Cant delete yourself
  return instance.delete(`/api/v1/users/delete-user/${username}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}


function getAllMenus(user) {
  return instance.get('/api/v1/menu/get-menus', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function getMenuByID(user, menuID) {
  return instance.get(`/api/v1/menu/get-menu/${menuID}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function getMenusFilteredByName(user, menuTitle) {
  if (menuTitle === '' || menuTitle.trim().length === 0) {
    return getAllMenus(user);
  }
  return instance.get(`/api/v1/menu/get-menus-filtered/${menuTitle}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function createMenu(user, menuToCreate) {
  return instance.post('/api/v1/menu/create-menu', menuToCreate, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function deleteMenu(user, menuID) {
  return instance.delete(`/api/v1/menu/delete-menu/${menuID}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function addMealToMenu(user, menuID, mealID) {
  return instance.post('/api/v1/menu/add-meal-to-menu', null, {
    params: {
      menuID: menuID,
      mealID: mealID,
    },
    headers: {
      Authorization: bearerAuth(user),
    },
  });
}

function removeMealFromMenu(user, menuID, mealID) {
  return instance.delete('/api/v1/menu/remove-meal-from-menu', {
    params: {
      menuID: menuID,
      mealID: mealID,
    },
    headers: {
      Authorization: bearerAuth(user),
    },
  });
}


function getAllMeals(user) {
  return instance.get('/api/v1/meal/get-meals', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function getMealCategories(user) {
  return instance.get('/api/v1/meal/get-meal-categories', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function getMealsFilteredByName(user, mealName) {
  if (mealName === '' || mealName.trim().length === 0) {
    return getAllMeals(user);
  }
  return instance.get(`/api/v1/meal/get-meals-filtered/${mealName}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function createMeal(user, mealToCreate) {
  return instance.post('/api/v1/meal/create-meal', mealToCreate, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function deleteMeal(user, mealID) {
  return instance.delete(`/api/v1/meal/delete-meal/${mealID}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}


function createNewOrder(user, menuID, order) {
  return instance.post('/api/v1/order/create-order', order, {
    params: {
      menuID: menuID,
      email: user.data.email,
    },
    headers: {
      Authorization: bearerAuth(user),
    },
  });
}

function getMyOrders (user) {
  return instance.get('/api/v1/order/get-my-orders', {
    params: {
      email: user.data.email
    },
    headers: {
      Authorization: bearerAuth(user),
    },
  });
}

function getOrders(user) {
  return instance.get(`/api/v1/order/get-all-orders`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function deleteOrder(user, orderID) {
  return instance.delete(`/api/v1/order/delete-order`, {
    params: {
      orderID: orderID
    },
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function acceptOrder(user, orderID) {
  return instance.put(`/api/v1/order/accept-order`, null, {
    params: {
      orderID: orderID
    },
    headers: { 'Authorization': bearerAuth(user) }
  })
}

const instance = axios.create({
  //Setups base url with localhost:8080
  baseURL: config.url.API_BASE_URL
})

instance.interceptors.request.use(function (config) {
  // If token is expired, redirect user to login
  if (config.headers.Authorization) {
    const token = config.headers.Authorization.split(' ')[1]
    const data = parseJwt(token)
    if (Date.now() > data.exp * 1000) {
      window.location.href = "/login"
    }
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// -- Helper functions

function bearerAuth(user) {
  return `Bearer ${user.accessToken}`
}