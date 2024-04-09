import { describe, it, expect, afterEach, vi } from 'vitest';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import DropDownMenu from '@/Components/sidebar/Nav-Icons/DropDownMenu';
import '@testing-library/jest-dom/vitest';
import { UserContext } from '@/context/UserContext';


afterEach(() => {
    cleanup();
});

describe('DropDown menue testing', () => {

    const setIsCommunityOpen = vi.fn();
    const communityButtonRef = { current: null };
    const setIsVisibleLeftSidebar = vi.fn();
    const userHistoryRes = [];

    const renderDropDownMenu = (userContextValue) => {
        return render(
            <UserContext.Provider value={userContextValue}>
                <DropDownMenu
                    MenuHeader="Test Menu"
                    id="test-menu"
                    setIsCommunityOpen={setIsCommunityOpen}
                    communityButtonRef={communityButtonRef}
                    setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
                    userHistoryRes={userHistoryRes}
                />
            </UserContext.Provider>
        );
    }


    it('renders without crashing', () => {
        const { getByText } = renderDropDownMenu({ isLoggedIn: false });
        expect(getByText('Test Menu')).toBeInTheDocument();
    });

    it('toggles dropdown on click', () => {
        const { getByText } = renderDropDownMenu({ isLoggedIn: false });
        const menuHeader = getByText('Test Menu');
        fireEvent.click(menuHeader);
        expect(menuHeader).toBeInTheDocument();
        // Add assertions to check the dropdown state
    });
    it('renders the chevron up icon when menu is dropped', () => {
        const { getByTestId } = renderDropDownMenu({ isLoggedIn: false });
        fireEvent.click(getByTestId('isDropped-set')); // Assuming the menuHeader is a button
        expect(getByTestId('chvronDown')).toBeInTheDocument();
        fireEvent.click(getByTestId('isDropped-set')); // Assuming the menuHeader is a button
        expect(getByTestId('chvronUP')).toBeInTheDocument();
    });

    // it('renders the chevron down icon when menu is not dropped', () => {
    //     const { getByRole } = renderDropDownMenu({ isLoggedIn: false });
    //     expect(getByRole('img', { name: /chevron down/i })).toBeInTheDocument();
    // });

    // it('renders the correct number of NavIcon components for "RECENT" MenuHeader', async () => {
    //     const { findAllByTestId } = renderDropDownMenu({ isLoggedIn: false });
    //     const navIcons = await findAllByTestId('nav-icon'); // Assuming NavIcon components have a data-testid="nav-icon"
    //     expect(navIcons.length).toBe(userHistoryRes.length);
    // });

    // it('renders the correct number of CommunityIcon components for "COMMUNITIES" MenuHeader', async () => {
    //     const { findAllByTestId } = renderDropDownMenu({ isLoggedIn: true }); // Assuming user needs to be logged in to see communities
    //     const communityIcons = await findAllByTestId('community-icon'); // Assuming CommunityIcon components have a data-testid="community-icon"
    //     expect(communityIcons.length).toBe(joinedSubreddits.length); // Assuming joinedSubreddits is available in this scope
    // });
})