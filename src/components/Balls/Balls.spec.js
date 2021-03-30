import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Balls from './Balls'

//mocks
import { profile } from '../../mocks/profile.json';
import esferas from '../../mocks/esferas.json';

it('Should render all dragon balls', () => {
  const { container } = render(<Balls balls={esferas.balls} profile={profile} />)
  expect(container).toMatchSnapshot()
})

it('Should show not found balls label and button', () => {
  const { getAllByText } = render(<Balls balls={esferas.balls} profile={profile} />)

  const notFound = !!(getAllByText('Não encontrada').length > 0)
  const validateButton = !!(getAllByText('encontrei').length > 0)

  expect(notFound).toBeTruthy()
  expect(validateButton).toBeTruthy()
})

it('Should open modal to validate', () => {
  const { getAllByText, getByText, container } = render(<Balls balls={esferas.balls} profile={profile} />)
  const validateButton = getAllByText('encontrei')

  fireEvent.click(validateButton[0])

  expect(getByText('Validar')).toBeTruthy()
  expect(container).toMatchSnapshot()

})

it('Should filter', async () => {
  const { getByTestId, getByText, getAllByText } = render(<Balls balls={esferas.balls} profile={profile} />)
  const filter = getByTestId('filter')
  fireEvent.click(filter)

  const myDragonBalls = getByText('Não tenho').closest('option')
  fireEvent.click(myDragonBalls)

  await waitFor(() => {
    expect(getAllByText('Não encontrada').length).toBe(3)
    // console.log(getAllByText('Encontrada').length)
    // expect(getAllByText('Encontrada')).toBe(3).not.toBeInTheDocument()
  })
})
