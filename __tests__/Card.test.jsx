import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Card from '../src/components/Card'
 
describe('Card', () => {
  it('renderiza sem erros', () => {
    render(<Card />)
  })
})
