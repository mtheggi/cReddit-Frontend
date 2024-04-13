import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PasswordRecovery from '@/Components/recovery/PasswordRecovery';
import { postRequest } from '@/services/Requests';

// Mock the postRequest function
vi.mock('../../services/Requests', () => ({
  postRequest: vi.fn(),
}));


describe('PasswordRecovery Component', () => {
  it('should accept a valid password', async () => {
    render(<PasswordRecovery />);
    const newPasswordInput = screen.getByLabelText('New Password');
    fireEvent.change(newPasswordInput, { target: { value: 'validPassword123' } });

    // The Continue button should not be disabled after inputting a valid password
    expect(screen.getByText('Continue').closest('button')).not.toHaveAttribute('disabled');
  });

  it('should not accept an invalid password', async () => {
    render(<PasswordRecovery />);
    const newPasswordInput = screen.getByLabelText('New Password');
    fireEvent.change(newPasswordInput, { target: { value: 'short' } });

    // The Continue button should be disabled after inputting an invalid password
    expect(screen.getByText('Continue').closest('button')).toHaveAttribute('disabled');
  });

  it('should check if passwords match', async () => {
    render(<PasswordRecovery />);
    const newPasswordInput = screen.getByLabelText('New Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm New Password');

    fireEvent.change(newPasswordInput, { target: { value: 'validPassword123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'validPassword123' } });

    // The passwords should match, and thus, the Continue button should not be disabled
    expect(screen.getByText('Continue').closest('button')).not.toHaveAttribute('disabled');
  });

  it('should handle form submission correctly', async () => {
    postRequest.mockResolvedValueOnce({ status: 200 });
    render(<PasswordRecovery />);
    const newPasswordInput = screen.getByLabelText('New Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm New Password');

    fireEvent.change(newPasswordInput, { target: { value: 'validPassword123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'validPassword123' } });
    
    fireEvent.click(screen.getByText('Continue'));

    // postRequest should be called since both passwords match and are valid
    expect(postRequest).toHaveBeenCalled();
  });

});
