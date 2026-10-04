import { render, screen, fireEvent, act } from '@testing-library/react'
import Contact from '../components/pages/Contact'

describe('Contact page', () => {
  it('renders the heading and the form fields', () => {
    render(<Contact />)
    expect(screen.getByRole('heading', { name: 'Contact Us', level: 1 })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your Message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument()
  })

  it('links to the developer profiles', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/sh1v-max')
    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute('href', 'mailto:singhshiv0427@gmail.com')
  })

  it('shows a success message after submitting, and can reset', () => {
    jest.useFakeTimers()
    render(<Contact />)
    fireEvent.change(screen.getByPlaceholderText('Your Name'), { target: { value: 'Asha' } })
    fireEvent.change(screen.getByPlaceholderText('Your Email'), { target: { value: 'asha@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Your Message'), { target: { value: 'Hello!' } })
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }))

    act(() => jest.advanceTimersByTime(1200))
    expect(screen.getByText('Message sent!')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Send another message' }))
    expect(screen.getByPlaceholderText('Your Name')).toHaveValue('')
    jest.useRealTimers()
  })
})
