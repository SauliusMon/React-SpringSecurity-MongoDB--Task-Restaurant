import React from 'react'
import { Dropdown, Grid, Form, Button, Input, Table } from 'semantic-ui-react'


function MealTable ({ handleMealCategoryChange, meals, mealsCategories, newMealName, newMealDescription, newMealQuantity,  mealNameSearch, newMealPrice, handleMealSearch, handleInputChange, handleCreateMeal,  handleDeleteMeal }) {
  let mealList
  if (meals.length === 0) {
    mealList = (
      <Table.Row key='no-meals'>
        <Table.Cell collapsing textAlign='center' colSpan='6'>No meals</Table.Cell>
      </Table.Row>
    )
  } else {
    mealList = meals.map(meal => {
      return (
        <Table.Row key={meal.id}>
          <Table.Cell collapsing>
            <Button
              circular
              color='red'
              size='small'
              icon='trash'
              onClick={() => handleDeleteMeal(meal.id)}
            />
          </Table.Cell>
          <Table.Cell>{meal.mealCategory}</Table.Cell>
          <Table.Cell>{meal.name}</Table.Cell>
          <Table.Cell>{meal.description}</Table.Cell>
          <Table.Cell>{meal.quantity}</Table.Cell>
          <Table.Cell>{meal.price}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <>
      <Grid>
        <div style={{ margin: '20px auto', maxWidth: '600px' }}>
          <Form onSubmit={handleCreateMeal}>
            <Grid columns={3} stackable centered>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field style={{ marginLeft: '10px', marginRight: '10px'}}>
                    <label>Select a Meal</label>
                    <Dropdown
                      placeholder='Select a Category'
                      selection
                      options={mealsCategories.map(category => ({
                        value: category, 
                        text: category
                      }))}
                      onChange={handleMealCategoryChange}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field style={{ marginLeft: '10px', marginRight: '10px'}}>
                    <label>Name of New Meal</label>
                    <Input
                      name='newMealName'
                      placeholder='Name of New Meal'
                      value={newMealName}
                      onChange={handleInputChange}
                    />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field style={{ marginLeft: '10px', marginRight: '10px'}}>
                    <label>Description of New Meal</label>
                    <Input
                      name='newMealDescription'
                      placeholder='Description of New Meal'
                      value={newMealDescription}
                      onChange={handleInputChange}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field style={{ marginLeft: '10px', marginRight: '10px'}}>
                  <label>Quantity of New Meal</label>
                    <Input
                        name='newMealQuantity'
                        placeholder='Quantity of New Meal'
                        type='number'
                        inputMode='numeric' 
                        pattern="[0-9]*"
                        value={newMealQuantity}
                        onChange={handleInputChange}
                      />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field style={{ marginLeft: '10px', marginRight: '10px'}}>
                    <label>Select a Price of Meal</label>
                    <Input
                      name='newMealPrice'
                      placeholder='Price of New Meal'
                      type='number' 
                      step='0.01'
                      value={newMealPrice}
                      onChange={handleInputChange}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign='center'>
                  <Form.Button primary>Create Meal</Form.Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </div>
        <Form onSubmit={handleMealSearch} style={{ margin: '20px auto'}}>
          <Input
            action={{ icon: 'search' }}
            name='mealNameSearch'
            placeholder='Search by Meal Name'
            value={mealNameSearch}
            onChange={handleInputChange}
          />
        </Form>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} />
            <Table.HeaderCell width={3}>Category</Table.HeaderCell>
            <Table.HeaderCell width={3}>Name</Table.HeaderCell>
            <Table.HeaderCell width={4}>Description</Table.HeaderCell>
            <Table.HeaderCell width={2}>Quantity</Table.HeaderCell>
            <Table.HeaderCell width={2}>Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {mealList}
        </Table.Body>
      </Table>
    </>
  )
}

export default MealTable