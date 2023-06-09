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

  getAllMeals,
  getMealCategories,
  getMealsFilteredByName,
  deleteMeal,
  createMeal,

  getOrders,
  deleteOrder,
  createOrder,
  getUserMe
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


function getOrders(user, text) {
  const url = text ? `/api/orders?text=${text}` : '/api/orders'
  return instance.get(url, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function deleteOrder(user, orderId) {
  return instance.delete(`/api/orders/${orderId}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function createOrder(user, order) {
  return instance.post('/api/orders', order, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}

function getUserMe(user) {
  return instance.get('/api/users/me', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

// -- Axios

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