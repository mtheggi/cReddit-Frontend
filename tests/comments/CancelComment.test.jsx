import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CancelComment from "@/Components/mainfeed/comment/CancelComment";

describe("CancelComment component", () => {
  it("renders CancelComment component without crashing", () => {
    const onHide = vi.fn();
    render(<CancelComment onHide={onHide} />);
  });

  it('renders "Cancel Comment" text', () => {
    const onHide = vi.fn();
    render(<CancelComment show={true} onHide={onHide} />);
    const textElement = document.getElementById("cancel-comment-text");
    expect(textElement).not.toBeNull();
  });

  it('calls onHide when "Cancel" button is clicked', async () => {
    const onHide = vi.fn();
    render(<CancelComment show={true} onHide={onHide} />);
    const buttonElement = document.getElementById("cancel-comment-button");
    fireEvent.click(buttonElement);
    waitFor(() => {
      expect(onHide).toHaveBeenCalledTimes(1);
    });
  });

  it('calls onHide when "Discard" button is clicked', async () => {
    const onHide = vi.fn();
    render(<CancelComment show={true} onHide={onHide} />);
    const buttonElement = document.getElementById("discard-comment-button");
    fireEvent.click(buttonElement);
    waitFor(() => {
      expect(onHide).toHaveBeenCalledTimes(1);
    });
  });
});
