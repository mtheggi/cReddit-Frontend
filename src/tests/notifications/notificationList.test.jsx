import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Needed for components using Link or navigate
import userEvent from '@testing-library/user-event';
import NotificationList from './NotificationList';

// Mock hooks
vi.mock('./NotificationContext', () => ({
  useNotifications: () => ({
    setNotifications: vi.fn(),
    removeNotification: vi.fn(),
  }),
}));

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'), // import and retain the original functionalities
  useNavigate: () => vi.fn(),
}));

describe('NotificationList Component', () => {
  it('renders the notification list correctly when isNewNotificationsPage is true', () => {
    const notifications = [{ key: '1', title: 'Title', description: 'Description', date: '2022-04-10', time: '12:00', image: 'path/to/image' }];
    render(
      <MemoryRouter>
        <NotificationList notifications={notifications} isNewNotificationsPage={true} />
      </MemoryRouter>
    );

    // Assuming your NotificationItem component displays the title
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders the notification list correctly when isNewNotificationsPage is false', () => {
    const notifications = [{ key: '2', title: 'Another Title', description: 'Another Description', date: '2022-04-09', time: '11:00', image: 'path/to/image' }];
    render(
      <MemoryRouter>
        <NotificationList notifications={notifications} isNewNotificationsPage={false} />
      </MemoryRouter>
    );

    // The 'See All' button should be visible
    expect(screen.getByText('See All')).toBeInTheDocument();
  });

  it('navigates to /notifications when See All is clicked', () => {
    const navigate = vi.fn();
    const notifications = [{ key: '3', title: 'Yet Another Title', description: 'Yet Another Description', date: '2022-04-08', time: '10:00', image: 'path/to/image' }];
    
    // Provide the mocked navigate function to our component via the mock implementation
    vi.mocked(useNavigate).mockImplementation(() => navigate);
    
    render(
      <MemoryRouter>
        <NotificationList notifications={notifications} isNewNotificationsPage={false} />
      </MemoryRouter>
    );

    // Simulate user clicking the 'See All' button
    userEvent.click(screen.getByText('See All'));

    // Assert that navigate was called with the correct path
    expect(navigate).toHaveBeenCalledWith('/notifications');
  });

});
