import React from 'react'
import { Grid, Table, Header, Icon, Button } from 'semantic-ui-react'

function OrderTable({ orders }) {
  let orderList
  if (!orders || orders.length === 0) {
    orderList = (
      <Table.Row key='no-order'>
        <Table.Cell collapsing textAlign='center' colSpan='4'>No orders</Table.Cell>
      </Table.Row>
    )
  } else {
    orderList = orders.map(order => {
      return (
        <Table.Row key={order.id}>
          <Table.Cell>{order.id}</Table.Cell>
          <Table.Cell>{order.orderName}</Table.Cell>
          <Table.Cell>{order.orderConfirmed ? 'Yes' : 'No'}</Table.Cell>
          <Table.Cell>{order.meals.length}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <>
      <Grid stackable divided>
        <Grid.Column width='3'>
          <Header as='h2'>
            <Icon name='laptop' />
            <Header.Content>Orders</Header.Content>
          </Header>
        </Grid.Column>
      </Grid>

      <Table compact striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={5}>ID</Table.HeaderCell>
            <Table.HeaderCell width={4}>Name</Table.HeaderCell>
            <Table.HeaderCell width={3}>Order Processed</Table.HeaderCell>
            <Table.HeaderCell width={3}>Meals in Order</Table.HeaderCell>
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