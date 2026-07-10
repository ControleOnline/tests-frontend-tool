import { render } from '@testing-library/react-native';
import App from './App';

const mockSmokeTestsPage = jest.fn(() => null);

jest.mock('@controleonline/ui-tests', () => ({
  SmokeTestsPage: (...args) => mockSmokeTestsPage(...args),
}));

describe('App', () => {
  it('renders the ui-tests home', () => {
    const { toJSON } = render(<App />);

    expect(mockSmokeTestsPage).toHaveBeenCalledTimes(1);
    expect(toJSON()).toBeNull();
  });
});
