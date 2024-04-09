
import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Usercard from '../src/Components/usercard/Usercard.jsx'; // Assuming the React component is in a file named Usercard.js
import React from 'react';
import '@testing-library/jest-dom/vitest';

describe('Usercard Component', () => {

    it('initially, Follow button is rendered and not Unfollow', () => {
        render(<Usercard />);

        screen.debug();
        // expect(screen.getByText(/Follow/i)).toBeInTheDocument();
        // expect(screen.queryByText(/Unfollow/i)).toBeNull();
    });

    // it('clicking the Follow button changes it to Unfollow', () => {
    //     render(<Usercard />);
    //     const followButton = screen.getByText(/Follow/i);
    //     fireEvent.click(followButton);
    //     expect(screen.getByText(/Unfollow/i)).toBeInTheDocument();
    // });

    // it('ellipsis menu is not visible initially', () => {
    //     render(<Usercard />);
    //     const menu = screen.queryByText(/Share/i);
    //     expect(menu).toBeNull();
    // });

    // it('clicking the ellipsis icon shows the menu', () => {
    //     render(<Usercard />);
    //     const ellipsisButton = screen.getByRole('img', { name: /ellipsis horizontal icon/i });
    //     fireEvent.click(ellipsisButton);
    //     expect(screen.getByText(/Share/i)).toBeInTheDocument();
    //     expect(screen.getByText(/Send a Message/i)).toBeInTheDocument();
    // });

    // it('ellipsis menu can be toggled', () => {
    //     render(<Usercard />);
    //     const ellipsisButton = screen.getByRole('img', { name: /ellipsis horizontal icon/i });
    //     fireEvent.click(ellipsisButton); // Open expect(screen.getByText(/Share/i)).toBeInTheDocument();
    //     fireEvent.click(ellipsisButton); // Close
    //     expect(screen.queryByText(/Share/i)).toBeNull();
    // });



});
