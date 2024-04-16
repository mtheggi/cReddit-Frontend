import { describe, it, expect, afterEach, vi } from 'vitest';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import PasswordRecovery from '@/Components/recovery/PasswordRecovery';
import { postRequest } from '@/services/Requests';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
    cleanup();
});

// Mock the postRequest function
vi.mock('@/services/Requests', () => ({
  postRequest: vi.fn(() => Promise.resolve({ status: 200 })),
}));

describe('PasswordRecovery Component', () => {
  it('should accept a valid password', async () => {
    render(<PasswordRecovery />);
    const newPasswordInput = screen.getByLabelText('New Password');
    fireEvent.change(newPasswordInput, { target: { value: 'validPassword123' } });

    // Check if Continue button is enabled
    expect(screen.getByRole('button', { name: 'Continue' })).toBeEnabled();
  });

  it('should not accept an invalid password', async () => {
    render(<PasswordRecovery />);
    const newPasswordInput = screen.getByLabelText('New Password');
    fireEvent.change(newPasswordInput, { target: { value: 'short' } });

    // Check if Continue button is disabled
    expect(screen.getByRole('button', { name: 'Continue' })).toHaveAttribute('aria-disabled', 'true');
  });

  it('should check if passwords match', async () => {
    render(<PasswordRecovery />);
    const newPasswordInput = screen.getByLabelText('New Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm New Password');

    fireEvent.change(newPasswordInput, { target: { value: 'validPassword123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'validPassword123' } });

    // Check if Continue button is enabled because passwords match
    expect(screen.getByRole('button', { name: 'Continue' })).toBeEnabled();
  });

  it('should handle form submission correctly', async () => {
    postRequest.mockImplementation(() => Promise.resolve({ status: 200 }));
    render(<PasswordRecovery />);
    const newPasswordInput = screen.getByLabelText('New Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm New Password');

    fireEvent.change(newPasswordInput, { target: { value: 'validPassword123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'validPassword123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    // Verify that the postRequest was called
    expect(postRequest).toHaveBeenCalled();
  });
});
