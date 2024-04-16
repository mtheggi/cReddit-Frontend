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


})