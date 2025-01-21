import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Mock the Home and CartPage components
jest.mock("./pages/Home/Home", () => () => <div>Mock Home Component</div>);
jest.mock("./pages/CartPage/CartPage", () => () => <div>Mock CartPage Component</div>);

const mockStore = configureStore([]);

describe("App Component with Redux Store", () => {
  let store;

  beforeEach(() => {
    // Create a mock store with initial state
    store = mockStore({
      cart: {
        items: [],
      },
    });
  });

  test("renders Header component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    // Assuming Header contains "banner" role
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test("renders Home component by default", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    // Verify Home component renders
    expect(screen.getByText(/Mock Home Component/i)).toBeInTheDocument();
  });

  test("renders CartPage component on /cart path", () => {
    window.history.pushState({}, "Cart Page", "/cart");
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    // Verify CartPage component renders
    expect(screen.getByText(/Mock CartPage Component/i)).toBeInTheDocument();
  });
});
