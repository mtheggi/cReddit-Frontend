
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import CreatePost from '@/Components/create_post/CreatePost';
import { UserContext } from '@/context/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';

describe('CreatePost Component', () => {
    const user = { userProfilePicture: '', setUserProfilePicture: vi.fn() };
    const setUser = vi.fn();

    const renderComponent = () =>
        render(
            <Router>
                <UserContext.Provider value={{ user, setUser }}>
                    <CreatePost />
                </UserContext.Provider>
            </Router>
        );

    it('renders correctly', () => {
        renderComponent();
        expect(screen.getByText(/Create a post/i)).toBeInTheDocument();
        expect(screen.getByText(/Post/i)).toBeInTheDocument();
        expect(screen.getByText(/Image/i)).toBeInTheDocument();
        expect(screen.getByText(/Link/i)).toBeInTheDocument();
        expect(screen.getByText(/Poll/i)).toBeInTheDocument();
    });

    it('allows typing in the title field', () => {
        renderComponent();
        const titleInput = screen.getByPlaceholderText('Title');
        fireEvent.change(titleInput, { target: { value: 'Test Title' } });
        expect(titleInput.value).toBe('Test Title');
    });

    it('show character count as user types in title', () => {
        renderComponent();
        const titleInput = screen.getByPlaceholderText('Title');
        fireEvent.input(titleInput, { target: { value: 'Test' } });
        expect(screen.getByText('4/300')).toBeInTheDocument();
    });

    it('allows user to switch post types', () => {
        renderComponent();
        const postType = screen.getByText('Image');
        fireEvent.click(postType);
        expect(screen.getByText('Image')).toHaveClass('border-b-white');
    });

    it('expands input area as user types', async () => {
        renderComponent();
        const titleInput = screen.getByPlaceholderText('Title');
        fireEvent.focus(titleInput);
        fireEvent.input(titleInput, { target: { value: 'Long Test Title To Expand Textarea' } });
        await waitFor(() => {
            expect(titleInput.style.height).not.toBe('');
        });
    });

    it('toggles Spoiler and NSFW options', () => {
        renderComponent();
        const spoilerButton = screen.getByText('Spoiler');
        fireEvent.click(spoilerButton);
        expect(spoilerButton).toHaveClass('bg-black');

        const nsfwButton = screen.getByText('NSFW');
        fireEvent.click(nsfwButton);
        expect(nsfwButton).toHaveClass('bg-red-500');
    });

    it('prevents form submission when title is empty', () => {
        renderComponent();
        const submitButton = screen.getByText('Post');
        fireEvent.click(submitButton);
        expect(submitButton).toHaveClass('cursor-not-allowed');
    });

    it('adds an option field for polls and checks limit', async () => {
        renderComponent();

        const postType = screen.getByText('Poll');
        fireEvent.click(postType);

        const addButton = screen.getByText('ADD');
        for (let step = 0; step < 5; step++) {
            fireEvent.click(addButton);
        }

        await waitFor(() => {
            expect(screen.queryAllByPlaceholderText(/Option/).length).toBeLessThanOrEqual(6);
        });
    });

    it("changes 'YOUR COMMUNITIES' dropdown on user input", () => {
        renderComponent();
        const communityInput = screen.getByPlaceholderText('Choose a community');
        fireEvent.change(communityInput, { target: { value: 'r/' } });
        expect(communityInput.value).toBe('r/');
        fireEvent.click(screen.getByText('YOUR COMMUNITIES'));
        expect(screen.queryByText('ALL COMMUNITIES')).not.toBeInTheDocument();
    });

    it('prevents adding more than 6 polled options', () => {
        renderComponent();
        const typePoll = screen.getByText('Poll');
        fireEvent.click(typePoll);
        const addOption = screen.getByText('ADD').closest('div');
        for (let i = 0; i < 7; i++) {
            fireEvent.click(addOption);
        }
        expect(screen.getAllByPlaceholderText(/Option/).length).toBe(6);
    });
});
