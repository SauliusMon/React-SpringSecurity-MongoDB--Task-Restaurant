import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext'
import { orderApi } from '../misc/OrderApi'
import AdminTab from './AdminTab'
import { handleLogError } from '../misc/Helpers'

class AdminPage extends Component {
  static contextType = AuthContext

  state = {
    users: [],
    orders: [],
    menus: [],
    meals: [],
    mealsCategories: [],

    orderDescription: '',
    orderTextSearch: '',

    userUsernameSearch: '',
    menuTitleSearch: '',
    mealNameSearch: '',

    newMenuTitle: '',

    newMealCategory: '',
    newMealName: '',
    newMealDescription: '',
    newMealQuantity: 0,
    newMealPrice: 0.0,

    isAdmin: true,
    isUsersLoading: false,
    isOrdersLoading: false,
    isMealsLoading: false,
    isMenusLoading: false,
  }

  componentDidMount() {
    const Auth = this.context
    const user = Auth.getUser()
    const isAdmin = user.data.rol[0] === 'ADMIN'
    this.setState({ isAdmin })

    this.handleGetUsers()
    this.handleGetOrders()
    this.handleGetMenus()
    this.handleGetMeals()
    this.handleGetMealCategories()
  }

  handleInputChange = (e, {name, value}) => {
    this.setState({ [name]: value })
  }

  handleMealCategoryChange = (e, { value }) => {
    this.newMealCategory = value
  };

  handleGetUsers = () => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isUsersLoading: true })
    orderApi.getAllUsers(user)
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch(error => {
        handleLogError(error)
      })
      .finally(() => {
        this.setState({ isUsersLoading: false })
      })
  }

  handleSearchUser = () => {
    const Auth = this.context
    const user = Auth.getUser()

    let username = this.state.userUsernameSearch
    orderApi.getUsersFilteredByUsername(user, username)
      .then(response => {
        const data = response.data
        const users = data instanceof Array ? data : [data]
        this.setState({ users })
      })
      .catch(error => {
        handleLogError(error)
        this.setState({ users: [] })
      })
    
  }

  handleDeleteUser = (username) => {
    const Auth = this.context
    const user = Auth.getUser()

    orderApi.deleteUser(user, username)
      .then(() => {
        this.handleGetUsers()
      })
      .catch(error => {
        handleLogError(error)
      })
  }


  handleGetMenus = () => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isMenusLoading: true })
    orderApi.getAllMenus(user)
      .then(response => {
        this.setState({ menus: response.data })
      })
      .catch(error => {
        handleLogError(error)
      })
      .finally(() => {
        this.setState({ isMenusLoading: false })
      })
  }

  handleMenuSearch = () => {
    const Auth = this.context
    const user = Auth.getUser()

    let menuTitle = this.state.menuTitleSearch
    orderApi.getMenusFilteredByName(user, menuTitle)
      .then(response => {
        const data = response.data
        const menus = data instanceof Array ? data : [data]
        this.setState({ menus })
      })
      .catch(error => {
        handleLogError(error)
        this.setState({ menus: [] })
      })
  }

  handleCreateMenu = () => {
    const Auth = this.context
    const user = Auth.getUser()

    let { newMenuTitle } = this.state
    newMenuTitle = newMenuTitle.trim()
    if (!newMenuTitle) {
      return
    }

    const menuDtoToCreate = { menuTitle: newMenuTitle }
    orderApi.createMenu(user, menuDtoToCreate)
      .then(() => {
        this.handleGetMenus()
        this.setState({ newMenuTitle: '' })
      })
      .catch(error => {
        handleLogError(error)
      })
  }

  handleDeleteMenu = (menuID) => {
    const Auth = this.context
    const user = Auth.getUser()

    orderApi.deleteMenu(user, menuID)
      .then(() => {
        this.handleGetMenus()
      })
      .catch(error => {
        handleLogError(error)
      })
  }


  handleGetMeals = () => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isMealsLoading: true })
    orderApi.getAllMeals(user)
      .then(response => {
        this.setState({ meals: response.data })
      })
      .catch(error => {
        handleLogError(error)
      })
      .finally(() => {
        this.setState({ isMealsLoading: false })
      })
  }

  handleGetMealCategories = () => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isMenusLoading: true })
    orderApi.getMealCategories(user)
      .then(response => {
        const data = response.data
        const mealsCategories = data instanceof Array ? data : [data]

        this.setState ({ mealsCategories })
      })
      .catch(error => {
        handleLogError(error)
      })
      .finally(() => {
        this.setState({ isMenusLoading: false })
      })

    }

  handleMealSearch = () => {
    const Auth = this.context
    const user = Auth.getUser()

    let mealName = this.state.mealNameSearch
    orderApi.getMealsFilteredByName(user, mealName)
      .then(response => {
        const data = response.data
        const meals = data instanceof Array ? data : [data]
        this.setState({ meals })
      })
      .catch(error => {
        handleLogError(error)
        this.setState({ meals: [] })
      })
  }

  handleCreateMeal = () => {
    const Auth = this.context
    const user = Auth.getUser()

    const mealDtoToCreate = { 
      mealCategory: this.newMealCategory,
      name: this.state.newMealName,
      description: this.state.newMealDescription,
      quantity: this.state.newMealQuantity,
      price: this.state.newMealPrice
    } 
    orderApi.createMeal(user, mealDtoToCreate)
      .then(() => {
        this.handleGetMeals()
        this.setState({ newMealName: '' })
        this.setState({ newMealDescription: ''})
      })
      .catch(error => {
        handleLogError(error)
      })
  }

  handleDeleteMeal = (mealID) => {
    const Auth = this.context
    const user = Auth.getUser()

    orderApi.deleteMeal(user, mealID)
      .then(() => {
        this.handleGetMeals()
      })
      .catch(error => {
        handleLogError(error)
      })
  }


  handleGetOrders = () => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isOrdersLoading: true })
    orderApi.getOrders(user)
      .then(response => {
        this.setState({ orders: response.data })
      })
      .catch(error => {
        handleLogError(error)
      })
      .finally(() => {
        this.setState({ isOrdersLoading: false })
      })
  }

  handleDeleteOrder = (isbn) => {
    const Auth = this.context
    const user = Auth.getUser()

    orderApi.deleteOrder(user, isbn)
      .then(() => {
        this.handleGetOrders()
      })
      .catch(error => {
        handleLogError(error)
      })
  }

  handleCreateOrder = () => {
    const Auth = this.context
    const user = Auth.getUser()

    let { orderDescription } = this.state
    orderDescription = orderDescription.trim()
    if (!orderDescription) {
      return
    }

    const order = { description: orderDescription }
    orderApi.createOrder(user, order)
      .then(() => {
        this.handleGetOrders()
        this.setState({ orderDescription: '' })
      })
      .catch(error => {
        handleLogError(error)
      })
  }

  handleSearchOrder = () => {
    const Auth = this.context
    const user = Auth.getUser()

    const text = this.state.orderTextSearch
    orderApi.getOrders(user, text)
      .then(response => {
        const orders = response.data
        this.setState({ orders })
      })
      .catch(error => {
        handleLogError(error)
        this.setState({ orders: [] })
      })
  }

  render() {
    if (!this.state.isAdmin) {
      return <Navigate to='/' />
    } else {
      const { isUsersLoading, users, userUsernameSearch, 
        isOrdersLoading, orders, orderDescription, orderTextSearch, 
        isMenusLoading, menus, newMenuTitle, menuTitleSearch,
        isMealsLoading, meals, mealsCategories, newMealCategory, newMealName, newMealDescription, newMealQuantity, newMealPrice, mealNameSearch

      } = this.state
      return (
        <Container>
          <AdminTab
            isUsersLoading={isUsersLoading}
            users={users}
            userUsernameSearch={userUsernameSearch}
            handleDeleteUser={this.handleDeleteUser}
            handleSearchUser={this.handleSearchUser}
            
            isOrdersLoading={isOrdersLoading}
            orders={orders}
            orderDescription={orderDescription}
            orderTextSearch={orderTextSearch}
            handleCreateOrder={this.handleCreateOrder}
            handleDeleteOrder={this.handleDeleteOrder}
            handleSearchOrder={this.handleSearchOrder}
            handleInputChange={this.handleInputChange}

            isMenusLoading={isMenusLoading}
            menus={menus}
            newMenuTitle={newMenuTitle}
            menuTitleSearch={menuTitleSearch}
            handleMenuSearch={this.handleMenuSearch}
            handleCreateMenu={this.handleCreateMenu}
            handleDeleteMenu={this.handleDeleteMenu}

            isMealsLoading={isMealsLoading}
            handleMealCategoryChange={this.handleMealCategoryChange}
            meals={meals}
            mealsCategories={mealsCategories}

            newMealCategory={newMealCategory}
            newMealName={newMealName}
            newMealDescription={newMealDescription}
            newMealQuantity={newMealQuantity}
            newMealPrice={newMealPrice}
            mealNameSearch={mealNameSearch}

            handleMealSearch={this.handleMealSearch}
            handleCreateMeal={this.handleCreateMeal}
            handleDeleteMeal={this.handleDeleteMeal}
          />
        </Container>
      )
    }
  }
}

export default AdminPage