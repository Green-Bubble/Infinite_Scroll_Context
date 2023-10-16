import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UserList from '../components/UserList';
import { UserProvider } from '../providers/UserProvider';


// Mock the UserProvider context with some sample data
jest.mock('../providers/UserProvider', () => ({
  useUsercontext: () => ({
    users: [
      {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        // Add other user data fields here
      },
      // Add more users if needed
    ],
    loadMore: jest.fn(),
    filters: '',
    setFilter: jest.fn(),
  }),
}));

describe('UserList', () => {
  it('renders a list of users', () => {
    render(
      <UserProvider>
        <UserList />
      </UserProvider>
    );

    // You can add assertions based on your actual UI structure
    const userCards = screen.getAllByRole('listitem'); // Adjust this selector accordingly
    expect(userCards).toHaveLength(1); // Adjust the expected number based on your mock data

    // You can also add more specific assertions based on your UI
    const johnDoeCard = screen.getByText('John Doe');
    expect(johnDoeCard).toBeInTheDocument();

    // Add more assertions as needed
  });

  // it('allows searching for users', () => {
  //   render(
  //     <UserProvider>
  //       <UserList />
  //     </UserProvider>
  //   );

  //   const searchInput = screen.getByPlaceholderText('Search User!'); // Adjust the selector
  //   console.log(searchInput)
  //   fireEvent.change(searchInput, { target: { value: 'daniel' } });

  //   expect(mockUseUsercontext.setFilter).toHaveBeenCalledWith('daniel');

  //   const resetButton = screen.getByText('Reset Users');
  //   fireEvent.click(resetButton);

  //   expect(mockUseUsercontext.setFilter).toHaveBeenCalledWith('');

  //   // Add assertions to check if the search functionality works as expected
  //   // For example, check if the list of displayed users is updated based on the search input
  // });
});
