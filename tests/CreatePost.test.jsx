import { it, expect, describe, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import CreatePost from '@/Components/create_post/CreatePost';
import { UserContext } from '@/context/UserContext';
afterEach(cleanup);
describe('Create post tests', () => {

    it('should select a community from the dropdown menu', () => {
        // Initialize and render the CreatePost component
        const mockUserValue = { user: 'Test user', setUser: vi.fn(), userProfilePicture: 'https://random.imagecdn.app/500/150', setUserProfilePicture: vi.fn() };
        render(
            <UserContext.Provider value={mockUserValue}>
                <Router>
                    <CreatePost />
                </Router>
            </UserContext.Provider>
        );
        fireEvent.click(screen.getByPlaceholderText('Choose a community'));
        const communityOption = screen.getByTestId('joined-subreddits');
        expect(communityOption).to.exist;

    });

    // Test if the form is not submitted when the content is empty for a Link type post


    it('should not submit the form when the content is empty for a Link type post', () => {
        // Initialize and render the CreatePost component
        const mockUserValue = { user: 'Test user', setUser: vi.fn(), userProfilePicture: 'https://random.imagecdn.app/500/150', setUserProfilePicture: vi.fn() };
        const mockSubmit = vi.fn();
        render(
            <UserContext.Provider value={mockUserValue}>
                <Router>
                    <CreatePost onSubmit={mockSubmit} />
                </Router>
            </UserContext.Provider>
        );
        // const typeSelect = screen.getByTestId('type-select');
        // fireEvent.change(typeSelect, { target: { value: 'Link' } });
        const submitButton = screen.getAllByTestId('submit_post');
        fireEvent.click(submitButton[0]);
        expect(mockSubmit).not.toHaveBeenCalled();
    });

    // it('should select a different community from the dropdown menu', async () => {
    //     // Initialize and render the CreatePost component
    //     const mockUserValue = { user: 'Test user', setUser: vi.fn(), userProfilePicture: 'https://random.imagecdn.app/500/150', setUserProfilePicture: vi.fn() };
    //     const mockJoinedSubreddits = [
    //         { name: 'subreddit1', icon: 'icon1', members: 1000 },
    //         { name: 'subreddit2', icon: 'icon2', members: 2000 },
    //         // add more subreddits if needed
    //     ];

    //     render(
    //         <UserContext.Provider value={mockUserValue}>
    //             <Router>
    //                 <CreatePost joinedSubreddits={mockJoinedSubreddits} />
    //             </Router>
    //         </UserContext.Provider>
    //     );

    //     const dropdownMenu = screen.getByTestId('create_post_community_dropdown_button');
    //     console.log("dropdownMenu", dropdownMenu);
    //     // fireEvent.click(dropdownMenu);

    //     console.log("Test")

    //     console.log(screen.debug());

    //     // Get the first community in the dropdown menu
    //     const firstCommunity = await within(dropdownMenu).findByText('r/subreddit1');

    //     // Simulate clicking the first community
    //     fireEvent.click(firstCommunity);

    //     // console.log(screen.debug());
    //     // Check if the input field's value is the name of the first subreddit
    //     const inputField = screen.getByPlaceholderText('Choose a community');
    //     expect(inputField.value).toBe('r/subreddit1');
    // });
})