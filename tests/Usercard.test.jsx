
import { describe, it, expect, afterEach } from 'vitest';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import Usercard from '../src/Components/usercard/Usercard.jsx'; // Assuming the React component is in a file named Usercard.js
import '@testing-library/jest-dom/vitest';
afterEach(() => {
    cleanup();
});
describe('Usercard Component', () => {


    it('clicking the button changes it to follow to unfollow and viceverse ', () => {
        render(<Usercard />);
        const followButton = screen.getByTestId(/follow-btn-usercard/i);
        const expectedText = followButton.textContent === 'Follow' ? 'Unfollow' : 'Follow';
        fireEvent.click(followButton);
        expect(expectedText).toBe(expectedText);
    });

    it('ellipsis menu is not visible initially', () => {
        render(<Usercard />);
        const menu = screen.queryByText(/Share/i);
        expect(menu).toBeNull();
    });

    it('clicking the ellipsis icon shows the menu', () => {
        render(<Usercard />);
        const ellipsisButton = screen.getAllByTestId(/user-profile-menu/i);
        fireEvent.click(ellipsisButton[0]);
        expect(screen.getByTestId(/user-profile-menu-dropped/i)).toBeInTheDocument();
        expect(screen.getByText(/Send a Message/i)).toBeInTheDocument();
    });

    it('ellipsis menu can be toggled', () => {
        render(<Usercard />);
        const ellipsisButton = screen.getAllByTestId(/user-profile-menu/i);
        fireEvent.click(ellipsisButton[0]);
        fireEvent.click(ellipsisButton[0]);
        expect(screen.queryByText(/Send a Message/i)).toBeNull();
    });



});
