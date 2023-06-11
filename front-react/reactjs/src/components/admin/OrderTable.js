import React from 'react'
import { Grid, Button, Table } from 'semantic-ui-react'

function OrderTable({ orders, handleDeleteOrder, handleAcceptOrder}) {
  let orderList
  if (orders === undefined || orders.length === 0) {
    orderList = (
      <Table.Row key='no-orders'>
        <Table.Cell collapsing textAlign='center' colSpan='6'>No orders</Table.Cell>
      </Table.Row>
    )
  } else {
    orderList = orders.map(order => {
      return (
        <Table.Row key={order.id}>
          <Table.Cell collapsing>
            <Button
              circular
              color='red'
              size='small'
              icon='trash'
              onClick={() => handleDeleteOrder(order.id)}
            />
          </Table.Cell>
          <Table.Cell collapsing>
            <Button
              circular
              color='green'
              size='small'
              icon='check'
              onClick={() => handleAcceptOrder(order.id)}
            />
          </Table.Cell>
          <Table.Cell>{order.orderName}</Table.Cell>
          <Table.Cell>{order.userName}</Table.Cell>
          <Table.Cell>{order.meals.length}</Table.Cell>
          <Table.Cell>{order.orderConfirmed ? 'Yes' : 'No'}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <>
      <Grid stackable divided>
        <Grid.Row columns='2'>
          <Grid.Column width='5'>
            {/* <Form onSubmit={handleSearchOrder}>
              <Input
                action={{ icon: 'search' }}
                name='orderTextSearch'
                placeholder='Search by Id or Description'
                value={orderTextSearch}
                onChange={handleInputChange}
              />
            </Form> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}/>
            <Table.HeaderCell width={2}/>
            <Table.HeaderCell width={3}>Name</Table.HeaderCell>
            <Table.HeaderCell width={3}>Username</Table.HeaderCell>
            <Table.HeaderCell width={3}>Amount of Meals</Table.HeaderCell>
            <Table.HeaderCell width={4}>Order Confirmed</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orderList}
        </Table.Body>
      </Table>
    </>
  )
}

export default OrderTable