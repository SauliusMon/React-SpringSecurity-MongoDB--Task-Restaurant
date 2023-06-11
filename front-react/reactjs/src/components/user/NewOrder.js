import React, { useEffect } from 'react'
import { Grid, Form, Button, Table, Input } from 'semantic-ui-react'

function NewOrder ({ currentOrderName, currentOrder, handleRemoveMealFromOrder, handleCreateNewOrder, handleInputChange}) {
    let currentOrderList;

  if (currentOrder === undefined || currentOrder.meals === undefined) {
    currentOrderList = (
        <Table.Row key='no-order-info'>
          <Table.Cell collapsing textAlign='center' colSpan='6'>Please create a New Order</Table.Cell>
        </Table.Row>
      )
  } 
  else if (currentOrder.meals.length === 0) {
    currentOrderList = (
      <Table.Row key='no-meals'>
        <Table.Cell collapsing textAlign='center' colSpan='6'>No meals in this Order</Table.Cell>
      </Table.Row>
    )
  } else {
    currentOrderList = currentOrder.meals.map(meal => {
      return (
        <Table.Row key={meal.id}>
          <Table.Cell collapsing>
            <Button
              circular
              color='red'
              size='small'
              icon='trash'
              onClick={() => handleRemoveMealFromOrder(meal.id)}
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
            {currentOrderList}
            </Table.Body>  
        </Table>
        <Form onSubmit={handleCreateNewOrder}>
            <Grid columns={2} stackable centered>
                <Grid.Row> 
                    <Grid.Column>
                        <Form.Field style={{ marginLeft: '10px', marginRight: '10px'}}>
                            <label>Write the Name of Order</label>
                            <Input
                            name='currentOrderName'
                            placeholder='Name of Order'
                            value={currentOrderName}
                            onChange={handleInputChange}
                            />
                        </Form.Field>
                    </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                    <Grid.Column>
                        <Form.Button primary
                            circular
                            color='blue'
                            size='small'
                            >Make an Order
                        </Form.Button>
                    </Grid.Column>
                </Grid.Row> 
            </Grid>
        </Form>
    </>
  )
}

export default NewOrder