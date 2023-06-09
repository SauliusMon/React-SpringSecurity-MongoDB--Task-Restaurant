import React from 'react'
import { Grid, Form, Button, Input, Table } from 'semantic-ui-react'

function MenuTable ({ menus, newMenuTitle, menuTitleSearch, handleMenuSearch, handleInputChange, handleCreateMenu,  handleDeleteMenu }) {
  let menuList
  if (menus.length === 0) {
    menuList = (
      <Table.Row key='no-menus'>
        <Table.Cell collapsing textAlign='center' colSpan='6'>No menu</Table.Cell>
      </Table.Row>
    )
  } else {
    menuList = menus.map(menu => {
      return (
        <Table.Row key={menu.id}>
          <Table.Cell collapsing>
            <Button
              circular
              color='red'
              size='small'
              icon='trash'
              onClick={() => handleDeleteMenu(menu.id)}
            />
          </Table.Cell>
          <Table.Cell>{menu.id}</Table.Cell>
          <Table.Cell>{menu.menuTitle}</Table.Cell>
          <Table.Cell>{menu.mealsInMenu.length}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <>
      <Grid stackable divided>
        <Grid.Row columns='2'>
          <Grid.Column width='8'>
            <Form onSubmit={handleMenuSearch}>
              <Input
                action={{ icon: 'search' }}
                name='menuTitleSearch'
                placeholder='Search by Menu Title'
                value={menuTitleSearch}
                onChange={handleInputChange}
              />
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form onSubmit={handleCreateMenu}>
              <Input
                action={{ icon: 'book' }}
                name='newMenuTitle'
                placeholder='Create new Menu'
                value={newMenuTitle}
                onChange={handleInputChange}
              />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} />
            <Table.HeaderCell width={3}>ID</Table.HeaderCell>
            <Table.HeaderCell width={3}>Menu Title</Table.HeaderCell>
            <Table.HeaderCell width={4}>Amount of Meals</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {menuList}
        </Table.Body>
      </Table>
    </>
  )
}

export default MenuTable