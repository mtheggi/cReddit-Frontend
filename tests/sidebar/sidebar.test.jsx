import { describe, it, expect, afterEach, vi } from 'vitest';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import Sidebar from '@/Components/sidebar/Sidebar';
import '@testing-library/jest-dom/vitest';
import { UserContext } from '@/context/UserContext';
import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';

afterEach(() => {
    cleanup();
});

describe('Sidebar testing', () => {
    it('should render the sidebar component with default links and separators', () => {
        // Initialize props
        const setIsCommunityOpen = vi.fn();
        const communityButtonRef = {};
        const setIsVisibleLeftSidebar = vi.fn();
        const userHistoryRes = {};

        // Invoke Sidebar function
        const { container } = render(
            <UserContext.Provider value={{ isLoggedIn: true }}>
                <BrowserRouter>
                    <Sidebar
                        setIsCommunityOpen={setIsCommunityOpen}
                        communityButtonRef={communityButtonRef}
                        setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
                        userHistoryRes={userHistoryRes}
                    />
                </BrowserRouter>
            </UserContext.Provider>
        );

        // Assert
        expect(container).toBeInTheDocument();
        expect(container.querySelectorAll('.SideIcon-Container')).toHaveLength(16);
        expect(container.querySelectorAll('.Separator')).toHaveLength(5);
    });
    // Renders the sidebar component with recent dropdown menu expanded and no recent subreddits.
    it('should render the sidebar component with recent dropdown menu expanded and no recent subreddits', () => {
        // Initialize props
        const setIsCommunityOpen = vi.fn();
        const communityButtonRef = {};
        const setIsVisibleLeftSidebar = vi.fn();
        const userHistoryRes = {};

        // Mock useContext
        // vi.spyOn(React, 'useContext').mockReturnValue({ isLoggedIn: true });

        // Mock getRequest
        // vi.spyOn(api, 'getRequest').mockResolvedValue({ status: 200, data: [] });

        // Invoke Sidebar function
        const { container } = render(
            <UserContext.Provider value={{ isLoggedIn: true }}>
                <BrowserRouter>
                    <Sidebar
                        setIsCommunityOpen={setIsCommunityOpen}
                        communityButtonRef={communityButtonRef}
                        setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
                        userHistoryRes={userHistoryRes}
                    />
                </BrowserRouter>
            </UserContext.Provider>
        );

        // Assert
        expect(container).toBeInTheDocument();
        expect(container.querySelectorAll('.SideIcon-Container')).toHaveLength(16);
        expect(container.querySelectorAll('.Separator')).toHaveLength(5);
        expect(container.querySelectorAll('.NavIcon[id^="sidebar_recent_icon"]')).toHaveLength(0);
    });



})