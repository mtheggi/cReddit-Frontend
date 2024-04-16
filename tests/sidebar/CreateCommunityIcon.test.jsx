import { describe, it, expect, afterEach, vi } from 'vitest';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import CreateCommunityIcon from '@/Components/sidebar/Nav-Icons/CreateCommunityIcon';
import '@testing-library/jest-dom/vitest';
afterEach(() => {
    cleanup();
});

describe('testing Create Community Icon ', () => {
    // Renders a container with a "Create a community" button
    it('should render a container with a "Create a community" button when communityButtonRef is null or undefined', () => {
        // Arrange
        const setIsCommunityOpen = vi.fn();
        const setIsVisibleLeftSidebar = vi.fn();

        // Act
        render(<CreateCommunityIcon setIsCommunityOpen={setIsCommunityOpen} setIsVisibleLeftSidebar={setIsVisibleLeftSidebar} />);

        // Assert
        expect(screen.getByText('Create a community')).toBeInTheDocument();
    });
    // communityButtonRef is null or undefined
    it('should call setIsCommunityOpen and setIsVisibleLeftSidebar when the container is clicked', () => {
        // Arrange
        const setIsCommunityOpen = vi.fn();
        const setIsVisibleLeftSidebar = vi.fn();

        render(<CreateCommunityIcon setIsCommunityOpen={setIsCommunityOpen} setIsVisibleLeftSidebar={setIsVisibleLeftSidebar} />);

        // Act
        fireEvent.click(screen.getByText('Create a community'));

        // Assert
        expect(setIsCommunityOpen).toHaveBeenCalledWith(true);
        expect(setIsVisibleLeftSidebar).toHaveBeenCalledWith(false);
    });
})