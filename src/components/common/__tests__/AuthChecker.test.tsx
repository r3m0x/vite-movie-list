import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useNavigate } from "@tanstack/react-router";
import { AuthChecker } from "../AuthChecker";
import { useLoginStore } from "../../../store/useLoginStore";

// Mock the hooks and dependencies
vi.mock("@tanstack/react-router");
vi.mock("../../../store/useLoginStore");

const mockNavigate = vi.fn();
const mockCheckExpiration = vi.fn();

const mockUseLoginStore = {
  isLoggedIn: false,
  role: "user",
  checkExpiration: mockCheckExpiration,
};

describe("AuthChecker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useLoginStore).mockReturnValue(mockUseLoginStore);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children when no authentication required", () => {
    render(
      <AuthChecker>
        <div>Test Content</div>
      </AuthChecker>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("redirects to login when requiredLogin=true and session is invalid", () => {
    mockCheckExpiration.mockReturnValue(false);
    vi.mocked(useLoginStore).mockReturnValue({
      ...mockUseLoginStore,
      isLoggedIn: false,
    });

    render(
      <AuthChecker requiredLogin={true}>
        <div>Test Content</div>
      </AuthChecker>
    );

    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith({ to: "/login" });
    expect(mockCheckExpiration).toHaveBeenCalled();
  });

  it("renders children when requiredLogin=true and logged in with valid session", () => {
    mockCheckExpiration.mockReturnValue(true);
    vi.mocked(useLoginStore).mockReturnValue({
      ...mockUseLoginStore,
      isLoggedIn: true,
    });

    render(
      <AuthChecker requiredLogin>
        <div>Test Content</div>
      </AuthChecker>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockCheckExpiration).toHaveBeenCalled();
  });

  it("redirects to home when requireAdmin=true and role is not admin", () => {
    mockCheckExpiration.mockReturnValue(true);
    vi.mocked(useLoginStore).mockReturnValue({
      ...mockUseLoginStore,
      isLoggedIn: true,
      role: "user",
    });

    render(
      <AuthChecker requiredLogin={true} requireAdmin={true}>
        <div>Test Content</div>
      </AuthChecker>
    );

    expect(mockNavigate).toHaveBeenCalledWith({ to: "/" });
  });

  it("renders children when requireAdmin=true and role is admin", () => {
    mockCheckExpiration.mockReturnValue(true);
    vi.mocked(useLoginStore).mockReturnValue({
      ...mockUseLoginStore,
      isLoggedIn: true,
      role: "admin",
    });

    render(
      <AuthChecker requiredLogin requireAdmin>
        <div>Test Content</div>
      </AuthChecker>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("redirects to admin when requireAdmin=false and role is admin", () => {
    mockCheckExpiration.mockReturnValue(true);
    vi.mocked(useLoginStore).mockReturnValue({
      ...mockUseLoginStore,
      isLoggedIn: true,
      role: "admin",
    });

    render(
      <AuthChecker requiredLogin={true}>
        <div>Test Content</div>
      </AuthChecker>
    );

    expect(mockNavigate).toHaveBeenCalledWith({ to: "/admin" });
  });

  it("returns null when requiredLogin=true and not logged in (before useEffect runs)", () => {
    mockCheckExpiration.mockReturnValue(false);
    vi.mocked(useLoginStore).mockReturnValue({
      ...mockUseLoginStore,
      isLoggedIn: false,
    });

    const { container } = render(
      <AuthChecker requiredLogin>
        <div>Test Content</div>
      </AuthChecker>
    );

    expect(container.firstChild).toBeNull();
  });
});
