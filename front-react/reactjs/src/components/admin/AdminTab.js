import React from 'react'
import { Tab } from 'semantic-ui-react'
import UserTable from './UserTable'
import OrderTable from './OrderTable'
import MenuTable from './MenuTable'
import MealTable from './MealTable'
import MenuMealsAdmin from './MenuMealsAdmin'

function AdminTab(props) {
  const { handleInputChange } = props
  const { isUsersLoading, users, userUsernameSearch, handleDeleteUser, handleSearchUser } = props
  const { isOrdersLoading, orders, handleDeleteOrder, handleAcceptOrder } = props
  const { isMenusLoading, menus, newMenuTitle, menuTitleSearch, handleMenuSearch, handleCreateMenu,  handleDeleteMenu } = props
  const { isMealsLoading, handleMealCategoryChange, meals, mealsCategories, newMealName, newMealDescription, newMealQuantity, newMealPrice, mealNameSearch, handleMealSearch, handleCreateMeal, handleDeleteMeal } = props
  const { currentMenu, handleSelectedMenuChange, handleAddMealToCurrentMenu, handleMealChange, handleDeleteMealFromMenu } = props
  
  const panes = [
    {
      menuItem: { key: 'users', icon: 'users', content: 'Users' },
      render: () => (
        <Tab.Pane loading={isUsersLoading}>
          <UserTable
            users={users}
            userUsernameSearch={userUsernameSearch}
            handleInputChange={handleInputChange}
            handleDeleteUser={handleDeleteUser}
            handleSearchUser={handleSearchUser}
            handleCreateMenu={handleCreateMenu}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'orders', icon: 'laptop', content: 'Orders' },
      render: () => (
        <Tab.Pane loading={isOrdersLoading}>
          <OrderTable
            orders={orders}
            handleDeleteOrder={handleDeleteOrder}
            handleAcceptOrder={handleAcceptOrder}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'menus', icon: 'laptop', content: 'Menus' },
      render: () => (
        <Tab.Pane loading={isMenusLoading}>
          <MenuTable
            menus={menus}    
            newMenuTitle={newMenuTitle}
            menuTitleSearch={menuTitleSearch}
            handleMenuSearch={handleMenuSearch}  
            handleInputChange={handleInputChange}   
            handleCreateMenu={handleCreateMenu} 
            handleDeleteMenu={handleDeleteMenu}  
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'meals', icon: 'utensils', content: 'Meals' },
      render: () => (
        <Tab.Pane loading={isMealsLoading}>
          <MealTable
            handleMealCategoryChange={handleMealCategoryChange}
            meals={meals}    
            mealsCategories={mealsCategories}

            newMealName={newMealName}
            newMealDescription={newMealDescription}
            newMealQuantity={newMealQuantity}
            newMealPrice={newMealPrice}

            mealNameSearch={mealNameSearch}
            handleMealSearch={handleMealSearch}  
            handleInputChange={handleInputChange}   
            handleCreateMeal={handleCreateMeal} 
            handleDeleteMeal={handleDeleteMeal}  
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'menu-meals', icon: 'book', content: 'Modify menu' },
      render: () => (
        <Tab.Pane loading={isMenusLoading}>
          <MenuMealsAdmin
            menus={menus} 
            meals={meals}
            currentMenu={currentMenu}
            handleSelectedMenuChange={handleSelectedMenuChange}
            handleAddMealToCurrentMenu={handleAddMealToCurrentMenu}
            handleDeleteMealFromMenu={handleDeleteMealFromMenu}  
            handleMealChange={handleMealChange} 
          />
        </Tab.Pane>
      )
    }
  ]

  return (
    <Tab menu={{ attached: 'top' }} panes={panes} />
  )
}

export default AdminTab