import React from 'react'
import { Dropdown, Grid, Form, Button, Input, Table, GridColumn } from 'semantic-ui-react'

function MenuMealsAdmin ({ menus, meals, currentMenu, handleSelectedMenuChange, handleAddMealToCurrentMenu, handleMealChange, handleDeleteMealFromMenu}) {
    let currentMenuList;

  if (currentMenu === undefined || currentMenu.menuTitle === undefined) {
    currentMenuList = (
        <Table.Row key='no-menu-selected'>
          <Table.Cell collapsing textAlign='center' colSpan='6'>Please select a Menu</Table.Cell>
        </Table.Row>
      )
  } 
  else if (currentMenu.mealsInMenu === undefined || currentMenu.mealsInMenu.length === 0) {
    currentMenuList = (
      <Table.Row key='no-meals'>
        <Table.Cell collapsing textAlign='center' colSpan='6'>No meals in this Menu</Table.Cell>
      </Table.Row>
    )
  } else {
    currentMenuList = currentMenu.mealsInMenu.map(meal => {
      return (
        <Table.Row key={meal.id}>
          <Table.Cell collapsing>
            <Button
              circular
              color='red'
              size='small'
              icon='trash'
              onClick={() => handleDeleteMealFromMenu(meal.id)}
            />
          </Table.Cell>
          <Table.Cell>{meal.id}</Table.Cell>
          <Table.Cell>{meal.name}</Table.Cell>
          <Table.Cell>{meal.description}</Table.Cell>
          <Table.Cell>{meal.quantity}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <>
        <Grid stackable divided>
            <Grid.Column width='8'>
                <Form.Field>
                    <label>Select a Menu</label>
                    <Dropdown
                        style={{ marginLeft: '10px', marginRight: '10px'}}
                        placeholder='Select a Menu'
                        selection
                        options={menus.map(menu => ({
                        value: menu.id, 
                        text: menu.menuTitle
                        }))}
                        onChange={handleSelectedMenuChange}
                        />
                </Form.Field>
            </Grid.Column>
        </Grid>
        <Table compact striped selectable>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell width={1} />
                <Table.HeaderCell width={3}>ID</Table.HeaderCell>
                <Table.HeaderCell width={3}>Meal Name</Table.HeaderCell>
                <Table.HeaderCell width={4}>Description</Table.HeaderCell>
                <Table.HeaderCell width={2}>Quantity</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
            {currentMenuList}
            </Table.Body>  
        </Table>
        <Form onSubmit={handleAddMealToCurrentMenu}>
            <Grid columns={2} stackable centered>
                <Grid.Row> 
                    <Grid.Column>
                        <Form.Button primary
                            circular
                            color='blue'
                            size='small'
                        >Add a Meal
                        </Form.Button>
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Field>
                            <Dropdown
                                style={{ marginLeft: '10px', marginRight: '10px'}}
                                placeholder='Select a Meal'
                                selection
                                options={meals.map(meal => ({
                                value: meal.id, 
                                text: meal.name
                                }))}
                                onChange={handleMealChange}
                                />
                        </Form.Field>
                    </Grid.Column>
                </Grid.Row> 
            </Grid>
        </Form>
    </>
  )
}

export default MenuMealsAdmin