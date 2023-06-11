import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import { handleLogError } from '../misc/Helpers'
import { orderApi } from '../misc/OrderApi'

import OrderTable from './OrderTable'
import AuthContext from '../context/AuthContext'
import MenuMealsUser from './MenuMealsUser'
import NewOrder from './NewOrder'


class UserPage extends Component {
  static contextType = AuthContext

  state = {
    isUser: true,
    orderName: '',
    orders: [],

    menus: [],
    currentMenu: {},

    currentOrderName: '',
    currentOrder: {
      orderName: '',
      userName: '',
      userEmail: '',
      meals: []
    }
  }

  componentDidMount() {
    const Auth = this.context
    const user = Auth.getUser()
    const isUser = user.data.rol[0] === 'USER'
    this.setState({ isUser })

    this.handleGetMenus()
    this.handleGetMyOrders()
  }

  handleSelectedMenuChange = (e, { value }) => {
    this.updateSelectedMenu(value);
  }

  updateSelectedMenu = (value) => {
    const Auth = this.context
    const user = Auth.getUser()

    orderApi.getMenuByID(user, value)
      .then(response => {
        this.setState({ currentMenu: response.data })
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


  handleAddMealToOrder = (meal) => {    
    const existingMeal = this.state.currentOrder.meals.find((m) => m.id === meal.id);

    if (existingMeal) {
      const mealsInMenu = this.state.currentMenu.mealsInMenu.find((m) => m.id === meal.id);
  
      if (mealsInMenu && existingMeal.quantity < mealsInMenu.quantity) {
        const updatedMeals = this.state.currentOrder.meals.map((m) => {
          if (m.id === meal.id) {
            return { ...m, quantity: m.quantity + 1 };
          }
          return m;
        });
  
        const updatedOrder = {
          ...this.state.currentOrder,
          meals: updatedMeals
        };
  
        this.setState({
          currentOrder: updatedOrder
        });
      }
    } else {
      const updatedOrder = {
        orderName: this.state.currentOrderName,
        meals: [...this.state.currentOrder.meals, { ...meal, quantity: 1 }]
      };
  
      this.setState({
        currentOrder: updatedOrder
      });
    }
  } 

  handleRemoveMealFromOrder = (mealID) => {
    const updatedMeals = this.state.currentOrder.meals.map((meal) => {
      if (meal.id === mealID) {
        const updatedQuantity = meal.quantity - 1;
        if (updatedQuantity <= 0) {
          return null;
        } else {
          return { ...meal, quantity: updatedQuantity };
        }
      }
      return meal;
    }).filter((meal) => meal !== null);
  
    const updatedOrder = {
      ...this.state.currentOrder,
      meals: updatedMeals
    };
  
    this.setState({
      currentOrder: updatedOrder
    });
  } 

  handleCreateNewOrder = () => {

    let { currentOrderName } = this.state
    currentOrderName = currentOrderName.trim()
    if (!currentOrderName) {
      return
    }
    else {
      const Auth = this.context
      const user = Auth.getUser()

      const orderToSend = {
        orderName: currentOrderName,
        userName: user.data.preferred_username,
        userEmail:user.data.email,
        meals: this.state.currentOrder.meals
      };
  
      this.setState({
        currentOrderName: "",
        currentOrder: {
          orderName: '',
          userName: '',
          userEmail: '',
          meals: []
        }
      });

      orderApi.createNewOrder(user, this.state.currentMenu.id, orderToSend)
      .catch(error => {
        handleLogError(error)
      })
      .finally(() => {
        this.handleGetMyOrders()
        this.updateSelectedMenu(this.state.currentMenu.id)
      })
    }
  }

  handleGetMyOrders = () => {
    const Auth = this.context
    const user = Auth.getUser()

    orderApi.getMyOrders(user)
      .then((response) => {
        this.setState({ orders: response.data })
      })
      .catch(error => {
        handleLogError(error)
      })
  }


  handleInputChange = (e, {name, value}) => {
    this.setState({ [name]: value })
  }

  

  render() {
    if (!this.state.isUser) {
      return <Navigate to='/' />
    } else {
      const { orders,
              menus, currentMenu, currentOrderName, currentOrder
      } = this.state
      return (
        <Container>
          <OrderTable
            orders={orders}
          />
          <MenuMealsUser
            menus={menus}
            currentMenu={currentMenu}
            handleSelectedMenuChange={this.handleSelectedMenuChange}
            handleAddMealToOrder={this.handleAddMealToOrder}
          />

          <NewOrder
            currentOrderName={currentOrderName}
            currentOrder={currentOrder}
            handleRemoveMealFromOrder={this.handleRemoveMealFromOrder}
            handleCreateNewOrder={this.handleCreateNewOrder}
            handleInputChange={this.handleInputChange}
          />
        </Container>
      )
    }
  }
}

export default UserPage